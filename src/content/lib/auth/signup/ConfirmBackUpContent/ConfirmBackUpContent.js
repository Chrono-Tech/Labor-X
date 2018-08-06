import React  from 'react'
import PropTypes from 'prop-types'
import shuffle from 'lodash/shuffle'
import classnames from 'classnames'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { mnemonicSelector } from "src/store/auth/signup/selectors"
import { CONFIRM_BACK_UP_FORM as FORM } from 'src/store/auth/signup/constants'
import { submitConfirmBackUp as submit, setMnemonicConfirmation } from "src/store/auth/signup/actions"
import SignupLayout from 'src/components/layouts/SignupLayout/SignupLayout'
import { Button } from 'components/common'
import validate from './validate'

import css from './ConfirmBackUpContent.scss'

export class ConfirmBackUpContent extends React.Component {

  static propTypes = {
    mnemonic: PropTypes.string.isRequired,
    mnemonicConfirmation: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setMnemonicConfirmation: PropTypes.func.isRequired,
  }

  constructor (props){
    super(props)
    this.state = { words: shuffle(props.mnemonic.split(' ')) }
  }

  onWordClick (word){
    const words = this.props.mnemonicConfirmation.split(' ')
    const newMnemonic = [ ...words, word ].join(' ').trim()
    this.props.setMnemonicConfirmation(newMnemonic)
  }

  clearMnemonic (){
    this.props.setMnemonicConfirmation('')
  }

  clearLastWord (){
    const words = this.props.mnemonicConfirmation.split(' ')
    const newMnemonic = words.slice(0, -1).join(' ')
    this.props.setMnemonicConfirmation(newMnemonic)
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
    return (
      <div>
        <SignupLayout>
          <form className={css.root} name={FORM} onSubmit={this.props.handleSubmit}>
            <div className={css.contentBlock}>
              <h2>Confirm back-up phrase (mnemonic key)</h2>
              <p className={css.description}>Click on phrase words in the correct order.</p>
              <div className={css.passPhraseWrapper}>
                <Field
                  className={css.passPhrase}
                  component='input'
                  name='mnemonicConfirmation'
                  readOnly
                />
              </div>
              <div className={css.wordsBlock}>
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
                disabled={this.props.mnemonic !== this.props.mnemonicConfirmation}
                mods={Button.MODS.INVERT}
                error={this.props.error}
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
  initialValues: { mnemonicConfirmation: mnemonicSelector(state) },
  mnemonicConfirmation: mnemonicSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: () => dispatch(submit()),
  setMnemonicConfirmation: (value) => dispatch(setMnemonicConfirmation(value)),
})

ConfirmBackUpContent = connect(mapStateToProps, mapDispatchToProps)(ConfirmBackUpContent)

export default ConfirmBackUpContent
