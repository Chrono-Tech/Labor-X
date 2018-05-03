import React  from 'react'
import { reduxForm, Field } from 'redux-form'

import { Link } from 'components/common'
import validate from './validate'

import 'styles/globals/globals.scss'

import css from './ConfirmMnemonic.scss'

const FORM_ACCOUNT_PASSWORD = 'form/accountPassword'

const onSubmit = () => {

}

class ConfirmMnemonic extends React.Component {
  
  render () {
    const { handleSubmit, error, pristine, invalid } = this.props
    
    return (
      <form className={css.root} name={FORM_ACCOUNT_PASSWORD} onSubmit={handleSubmit}>
        <div className={css.contentBlock}>
          <h2>Confirm back-up phrase (mnemonic key)</h2>
          
          <p className={css.description}>Click on phrase words in the correct order.</p>
          
          <div className={css.passPhrase}>Word 1</div>
          
          <div className={css.wordsBlock}>
            <div className={css.word}>Word 1</div>
            <div className={css.word}>Word 2</div>
            <div className={css.word}>Word 3</div>
            <div className={css.word}>Word 4</div>
            <div className={css.word}>Word 5</div>
            <div className={css.word}>Word 6</div>
            <div className={css.word}>Word 7</div>
            <div className={css.word}>Word 8</div>
            <div className={css.word}>Word 9</div>
            <div className={css.word}>Word 10</div>
            <div className={css.word}>Word 11</div>
            <div className={css.word}>Word 11</div>
          </div>
          
          <button className={css.submitButton}>Proceed</button>
          
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

export default reduxForm({ form: FORM_ACCOUNT_PASSWORD, validate, onSubmit })(ConfirmMnemonic)
