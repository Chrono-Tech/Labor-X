import React from 'react'
import Link from 'react-router-dom/Link'
import classNames from 'classnames'
import { connect } from 'react-redux'
import SigninLayout from "../../src/components/SigninLayout";
import {Button} from "../../src/components/common";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Redirect from 'react-router-dom/Redirect'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'

import WhiteRoundButton from 'src/components/common/buttons/WhiteRoundButton/WhiteRoundButton'


import css from './index.scss'
import css2 from './LoginForm.scss'
import css3 from './index.pcss'

import {getInitialPropsLoadingSelector, getInitialProps} from "../../src/store/myAccounts";
import {walletsListSelector} from "../../src/store";

export class MyAccountsPage extends React.Component {

  componentDidMount () {
    this.props.getInitialProps()
  }

  renderAccounts () {
    return this.props.accounts.map((x) => (
      <div>
        <ListItem onClick={() => this.props.select(x.address)} className={css3.listItem}>
          <Avatar src='http://test.laborx.io/images/profile-photo.jpg' />
          <ListItemText primary='My Account' secondary={x.encrypted[0].address} classes={{ primary: css3.listItemTextPrimary, secondary: css3.listItemTextSecondary }} />
        </ListItem>
        <Divider className={css3.divider}/>
      </div>

    ))
  }

  renderNoAccounts () {
    return (
      <div>
        <ListItem className={classNames(css3.listItem, css3.listItemNoAccounts)}>Sorry, there are no accounts to display</ListItem>
        <Divider className={css3.divider}/>
      </div>
    )
  }

  renderContent () {
    return (
      <div>
        <List className={css3.list}>
          <Divider className={css3.divider}/>
          { this.props.accounts.length ? this.renderAccounts() : this.renderNoAccounts() }
        </List>
        <WhiteRoundButton component={Link} to='/home-login-methods'>Add an existing LaborX account</WhiteRoundButton>
        {/*<Button*/}
          {/*// onClick={this.navigateToLoginMethods.bind(this)}*/}
          {/*className={css2.row}*/}
          {/*buttonClassName={css2.submitButton}*/}
          {/*type={Button.TYPES.SUBMIT}*/}
          {/*label='Add an existing LaborX account'*/}
          {/*primary*/}
          {/*// disabled={pristine || invalid}*/}
          {/*// error={error}*/}
          {/*mods={Button.MODS.INVERT}*/}
        {/*/>*/}
      </div>
    )
  }

  render () {
    return (
      <div className={css3.MyAccountsPage}>
      <SigninLayout>
        <div className={css.root}>
          <div className={css2.root} onSubmit={this.props.handleSubmit}>
            <div className={css2.formHeader}>My Accounts</div>
            { this.props.getInitialPropsLoading ? <CircularProgress /> : this.renderContent() }
          </div>
        </div>
      </SigninLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  getInitialPropsLoading: getInitialPropsLoadingSelector(state),
  accounts: walletsListSelector(state),
  // accounts: [],
})

const mapDispatchToProps = (dispatch) => ({
  getInitialProps: () => dispatch(getInitialProps()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountsPage)

