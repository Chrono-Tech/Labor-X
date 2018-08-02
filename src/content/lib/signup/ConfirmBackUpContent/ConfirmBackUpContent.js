import React  from 'react'
import shuffle from 'lodash/shuffle'

import classnames from 'classnames'


import SignupLayout from 'src/components/layouts/SignupLayout/SignupLayout'


import { reduxForm, Field, change } from 'redux-form'
import { connect } from 'react-redux'

import { Link, Button } from 'components/common'
import validate from './validate'

import 'styles/globals/globals.scss'
import css from './ConfirmBackUpContent.scss'
import {mnemonicConfirmationSelector, mnemonicSelector} from "src/store/signup/selectors";

import { CONFIRM_BACK_UP_FORM as FORM } from 'src/store/signup/constants'
import {generateMnemonic} from "src/store/signup/actions";
import {push} from "connected-react-router";

import {submitConfirmBackUp as submit} from "src/store/signup/actions";

export class ConfirmBackUpContent extends React.Component {

  constructor (props){
    super(props)
    this.state = { words: shuffle(props.mnemonic.split(' ')) }
  }

  onWordClick (word){
    const { dispatch } = this.props
    const words = this.props.mnemonicConfirmation.split(' ')
    const newMnemonic = [ ...words, word ].join(' ').trim()
    dispatch(change(FORM, 'mnemonicConfirmation', newMnemonic))
  }

  clearMnemonic (){
    const { dispatch } = this.props
    dispatch(change(FORM, 'mnemonicConfirmation', ''))
  }

  clearLastWord (){
    const { dispatch } = this.props
    const words = this.props.mnemonicConfirmation.split(' ')
    const newMnemonic = words.slice(0, -1).join(' ')
    dispatch(change(FORM, 'mnemonicConfirmation', newMnemonic))
  }

  renderWords () {
    return this.state.words.map((word) => {
      const selected = this.props.mnemonicConfirmation.split(' ').includes(word)
      const className = classnames(css.word, selected ? css.wordInactive : null)
      return (
        <button key={word} onClick={this.onWordClick.bind(this, word)} className={className} disabled={selected}>{ word }</button>
      )}
    )
  }

  render () {
    const { handleSubmit, error, pristine, invalid, mnemonic } = this.props
    return (
      <div>
        <SignupLayout>
          <form className={css.root} name={FORM} onSubmit={handleSubmit}>
            <div className={css.contentBlock}>
              <h2>Confirm back-up phrase (mnemonic key)</h2>

              <p className={css.description}>Click on phrase words in the correct order.</p>

              <div className={css.passPhraseWrapper}>
                {/*<div className={css.passPhrase}>{ this.getCurrentMnemonic() }</div>*/}
                {/*<div className={css.passPhrase}>{ this.props.mnemonicConfirmation }</div>*/}
                <Field
                  className={css.passPhrase}
                  component='input'
                  // component='input'
                  // type='hidden'
                  name='mnemonicConfirmation'
                  readOnly
                />

              </div>

              <div className={css.wordsBlock}>
                {/*{ this.getWordsButtons() }*/}
                {this.renderWords()}
              </div>

              <div className={css.controlsBlock}>
                <div className={css.clearAllButton} onClick={this.clearMnemonic.bind(this)}>Start Over</div>
                <div className={css.clearLastButton} onClick={this.clearLastWord.bind(this)}>Undo</div>
              </div>

              <Button
                label='Proceed'
                buttonClassName={css.submitButton}
                type={Button.TYPES.SUBMIT}
                // disabled={pristine || invalid}
                disabled={this.props.mnemonic !== this.props.mnemonicConfirmation}
                mods={Button.MODS.INVERT}
                error={error}
                primary
              />

              <div className={css.progressBlock}>
                <div className={css.progressPoint} />
                <div className={css.progressPoint} />
                <div className={[css.progressPoint, css.progressPointInactive].join(' ')} />
              </div>
            </div>
          </form>
        </SignupLayout>
      </div>
    )
  }

}




ConfirmBackUpContent = reduxForm({
  form: FORM,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(ConfirmBackUpContent)

const mapStateToProps = (state) => ({
  mnemonic: mnemonicSelector(state),
  mnemonicConfirmation: mnemonicConfirmationSelector(state) || '',
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit())
  // onSubmit: () => dispatch(push('/your-wallet-file')),
})

ConfirmBackUpContent = connect(mapStateToProps, mapDispatchToProps)(ConfirmBackUpContent)

export default ConfirmBackUpContent