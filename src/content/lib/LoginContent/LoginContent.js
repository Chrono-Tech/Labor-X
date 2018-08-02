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
import { FORM } from "src/store/login/constants";
import { addressSelector, getInitialPropsLoadingSelector, personSelector } from "src/store/login/selectors";
import { getInitialProps, resetState, signin } from "src/store/login/actions";
import {getSigninLoadingSelector} from "src/store/login/selectors";
import validator from "src/utils/validator";

import css from './LoginContent.pcss'
export class LoginContent extends React.Component {

  componentDidMount () {
    this.props.getInitialProps()
  }

  componentWillUnmount () {
    this.props.resetState()
  }

  renderContent () {
    return (
      <div>
        <List className={css.list}>
          <Divider className={css.divider}/>
          <ListItem className={css.listItem}>
            <Avatar src={ this.props.person.avatar || 'http://test.laborx.io/images/profile-photo.jpg' } />
            <ListItemText
              primary={ this.props.person.userName || 'My Account' }
              secondary={ this.props.address }
              classes={{ primary: css.listItemTextPrimary, secondary: css.listItemTextSecondary }} />
            <ListItemSecondaryAction>
              <IconButton component={Link} to='/my-accounts' className={css.accountListIconButton}>
                <ViewListIcon className={css.accountListIcon} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider className={css.divider}/>
        </List>
        <Field
          name='password'
          type='password'
          placeholder='Enter password'
          component={TextField}
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
        <WhiteRoundedButton type='submit' loader={this.props.signinLoading}>Login</WhiteRoundedButton>
        <br/>
        <br/>
        <br/>
        <Link to='/home-mnemonic-login'className={css.forgotLink}>Forgot your password?</Link>
      </div>
    )
  }

  render () {
    return (
      <Form onSubmit={this.props.handleSubmit} className={css.LoginContent}>
        <SigninLayout title='Log In'>
          { this.props.getInitialPropsLoading ? <CircularProgress /> : this.renderContent() }
        </SigninLayout>
      </Form>
    )
  }
}

LoginContent = reduxForm({ form: FORM })(LoginContent)

const mapStateToProps = (state) => ({
  getInitialPropsLoading: getInitialPropsLoadingSelector(state),
  address: addressSelector(state),
  person: personSelector(state),
  signinLoading: getSigninLoadingSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  getInitialProps: () => dispatch(getInitialProps()),
  resetState: () => dispatch(resetState()),
  onSubmit: (values) => dispatch(signin(values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContent)

