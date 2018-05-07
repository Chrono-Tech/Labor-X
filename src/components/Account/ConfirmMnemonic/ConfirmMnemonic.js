import React  from 'react'
import { reduxForm, Field, change } from 'redux-form'
import {connect} from 'react-redux'

import { Link, Button } from 'components/common'
import validate from './validate'

import 'styles/globals/globals.scss'

import css from './ConfirmMnemonic.scss'

const FORM_CONFIRM_MNEMONIC = 'form/confirmMnemonic'

const onSubmit = () => {

}

class ConfirmMnemonic extends React.Component {
  constructor(props){
    super(props)
  
    const wordsArray = props.mnemonic.split(' ').map((word, index) => {
      return { index, word }
    })
    
    const cloneWordsArray = [...wordsArray]
    
    this.state = {
      confirmPhrase: [],
      wordsArray: wordsArray,
      currentWordsArray: cloneWordsArray.sort((a,b) => a.word < b.word),
    }
  }
  
  onClickWord(word){
    const { dispatch } = this.props
    
    if (!this.state.confirmPhrase.includes(word)) {
      this.setState(
        {confirmPhrase: this.state.confirmPhrase.concat(word) },
        () => dispatch(change(FORM_CONFIRM_MNEMONIC, 'mnemonic', this.getCurrentMnemonic()))
      )
    }
  }
  
  getCurrentMnemonic(){
    return this.state.confirmPhrase.map((item) => item.word).join(' ')
  }
  
  getWordsButtons(){
    return this.state.currentWordsArray.map((item, index) => {
      const wordSelected = this.state.confirmPhrase.includes(item)
      
      return (
        <div
          key={index}
          onClick={this.onClickWord.bind(this, item)}
          className={[css.word, wordSelected ? css.wordInactive : '' ].join(' ')}>
          { item.word }
        </div>
      )}
    )
  }
  
  clearMnemonic(){
    const { dispatch } = this.props
  
    this.setState(
      { confirmPhrase: [] },
      () => dispatch(change(FORM_CONFIRM_MNEMONIC, 'mnemonic', this.getCurrentMnemonic()))
    )
  }
  
  render () {
    const { handleSubmit, error, pristine, invalid, mnemonic } = this.props
    console.log('error', error, pristine, invalid)
  
    return (
      <form className={css.root} name={FORM_CONFIRM_MNEMONIC} onSubmit={handleSubmit}>
        <div className={css.contentBlock}>
          <h2>Confirm back-up phrase (mnemonic key)</h2>
          
          <p className={css.description}>Click on phrase words in the correct order.</p>
  
          <div className={css.passPhraseWrapper}>
            <div className={css.passPhrase}>{ this.getCurrentMnemonic() }</div>
            <Field
              className={css.passPhrase}
              component='input'
              type='hidden'
              name='mnemonic'
              readOnly={true}
            />
            { this.getCurrentMnemonic() ? (
              <span
                className={css.clearMnemonic}
                onClick={this.clearMnemonic.bind(this)}>
                <img src='/static/images/svg/close-white.svg' alt='' />
              </span>
            ) : null }
            
          </div>
          
          <div className={css.wordsBlock}>
            { this.getWordsButtons() }
          </div>
  
          <Button
            label='Proceed'
            buttonClassName={css.submitButton}
            type={Button.TYPES.SUBMIT}
            disabled={pristine || invalid}
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mnemonic: state.createAccount.mnemonic,
  }
}

const form  = reduxForm({ form: FORM_CONFIRM_MNEMONIC, validate, onSubmit })(ConfirmMnemonic)
export default connect(mapStateToProps)(form)
