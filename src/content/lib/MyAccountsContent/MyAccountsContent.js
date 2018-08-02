import React from 'react'
import Link from 'react-router-dom/Link'
import classNames from 'classnames'
import { connect } from 'react-redux'
import SigninLayout from "src/components/SigninLayout/SigninLayout";
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import WhiteRoundedButton from "src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton";

import css from './MyAccountsContent.pcss'

import { getInitialPropsLoadingSelector } from "src/store/myAccounts/selectors";
import { getInitialProps, selectAccount } from "src/store/myAccounts/actions";
import { accountsSelector } from "src/store/myAccounts";

export class MyAccountsPage extends React.Component {

  componentDidMount () {
    this.props.getInitialProps()
  }

  renderAccounts () {
    return this.props.accounts.map((x) => (
      <div>
        <ListItem button onClick={() => this.props.selectAccount(x.address)} className={css.listItem}>
          <Avatar src={ x.avatar || 'http://test.laborx.io/images/profile-photo.jpg' } />
          <ListItemText primary={ x.userName || 'My Account' } secondary={ x.address } classes={{ primary: css.listItemTextPrimary, secondary: css.listItemTextSecondary }} />
        </ListItem>
        <Divider className={css.divider}/>
      </div>
    ))
  }

  renderNoAccounts () {
    return (
      <div>
        <ListItem className={classNames(css.listItem, css.listItemTextPrimary, css.listItemNoAccounts)}>Sorry, there are no accounts to display</ListItem>
        <Divider className={css.divider}/>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        <List className={css.list}>
          <Divider className={css.divider}/>
          { this.props.accounts.length ? this.renderAccounts() : this.renderNoAccounts() }
        </List>
        <br/>
        <WhiteRoundedButton component={Link} to='/home-login-methods'>Add an existing LaborX account</WhiteRoundedButton>
      </div>
    )
  }

  render () {
    return (
      <div className={css.MyAccountsContent}>
        <SigninLayout title='My Accounts'>
          { this.props.getInitialPropsLoading ? <CircularProgress /> : this.renderContent() }
        </SigninLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  getInitialPropsLoading: getInitialPropsLoadingSelector(state),
  // accounts: accountsSelector(state),
  accounts: [],
})

const mapDispatchToProps = (dispatch) => ({
  getInitialProps: () => dispatch(getInitialProps()),
  selectAccount: (address) => dispatch(selectAccount(address)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountsPage)

