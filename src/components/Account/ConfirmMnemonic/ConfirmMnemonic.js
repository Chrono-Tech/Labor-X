import React  from 'react'
import { reduxForm, Field } from 'redux-form'
import {connect} from 'react-redux'

import { Link } from 'components/common'
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
    if (!this.state.confirmPhrase.includes(word)) {
      this.setState({confirmPhrase: this.state.confirmPhrase.concat(word)})
    }
  }
  
  getCurrentMnemonic(){
    return this.state.confirmPhrase.map((item) => item.word).join(' ')
  }
  
  getMnemonicWords(){
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
  
  get validateMnemonic() {
    const {confirmPhrase, wordsArray} = this.state
    
    return wordsArray.every((item, index) => item === confirmPhrase[item.index])
  }
  
  render () {
    const { handleSubmit, error, pristine, invalid, mnemonic } = this.props
    console.log('validate', this.validateMnemonic, this.state.confirmPhrase, this.state.wordsArray)
  
    return (
      <form className={css.root} name={FORM_CONFIRM_MNEMONIC} onSubmit={handleSubmit}>
        <div className={css.contentBlock}>
          <h2>Confirm back-up phrase (mnemonic key)</h2>
          
          <p className={css.description}>Click on phrase words in the correct order.</p>
          
          <div className={css.passPhrase}>{ this.getCurrentMnemonic() }</div>
          
          <div className={css.wordsBlock}>
            { this.getMnemonicWords() }
          </div>
          
          <button className={css.submitButton} disabled={!this.validateMnemonic}>Proceed</button>
          
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

export default reduxForm({ form: FORM_CONFIRM_MNEMONIC, validate, onSubmit })( connect(mapStateToProps)(ConfirmMnemonic) )
