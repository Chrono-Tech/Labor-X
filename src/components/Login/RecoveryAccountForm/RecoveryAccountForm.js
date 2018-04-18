import { Button, Input, Link, UserRow } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import css from './RecoveryAccountForm.scss'
import validate from './validate'

const FORM_LOGIN = 'form/login'

const onSubmit = ({ words }) => {
  
  return {}
}

class RecoveryAccountForm extends React.Component {
  static propTypes = {
  
  }
  
  static defaultProps = {
  
  }
  
  render () {
    const { handleSubmit, error, pristine, invalid,  } = this.props
    
    return (
      <form className={css.root} name={FORM_LOGIN} onSubmit={handleSubmit}>
        <div className={css.formHeader}>Recovery account</div>
        <UserRow name='Emile' address='1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9' />
        
      </form>
    )
  }
}

export default reduxForm({ form: FORM_LOGIN, validate, onSubmit })(RecoveryAccountForm)
