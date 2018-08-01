import React from 'react'
import Link from 'react-router-dom/Link'
import { connect } from 'react-redux'
import Form from 'redux-form/lib/Form'
import Field from 'redux-form/lib/Field'
import reduxForm from 'redux-form/lib/reduxForm'
import TextField from 'redux-form-material-ui-next/lib/TextField'
import ViewListIcon from '@material-ui/icons/ViewList'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'

import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton";
import SigninLayout from "src/components/SigninLayout/SigninLayout";
import { FORM } from "src/store/homePrivateKeyLogin/constants";
import { getSubmitLoadingSelector } from "src/store/homePrivateKeyLogin/selectors";
import { resetState, submit } from "src/store/homePrivateKeyLogin/actions";
import validator from "src/utils/validator";

import css from './HomePrivateKeyLoginContent.pcss'

export class HomePrivateKeyLoginContent extends React.Component {

  componentWillUnmount () {
    this.props.resetState()
  }

  render () {
    return (
      <Form onSubmit={this.props.handleSubmit} className={css.HomePrivateKeyLoginContent}>
        <SigninLayout title='Import Wallet' subtitle='Type or copy your "Private Key" into the box below'>
          <Field
            name='privateKey'
            placeholder='Enter Private Key'
            component={TextField}
            multiline
            rows={2}
            className={css.passwordTextField}
            inputProps={{ className: css.passwordTextFieldInput }}
            InputProps={{ className: css.passwordTextFieldInputComponent }}
            FormHelperTextProps={{ className: css.passwordTextFieldFormHelperText }}
            validate={[ validator.required ]}
          />
          <br/>
          <br/>
          <br/>
          <br/>
          <WhiteRoundedButton type='submit' loader={this.props.submitLoading}>Proceed to Login</WhiteRoundedButton>
          <br/>
          <br/>
          <br/>
          <Link to='/home-mnemonic-login' className={css.forgotLink}>Forgot your password?</Link>
        </SigninLayout>
      </Form>
    )
  }
}

HomePrivateKeyLoginContent = reduxForm({ form: FORM })(HomePrivateKeyLoginContent)

const mapStateToProps = (state) => ({
  submitLoading: getSubmitLoadingSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(resetState()),
  onSubmit: () => dispatch(submit()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePrivateKeyLoginContent)

