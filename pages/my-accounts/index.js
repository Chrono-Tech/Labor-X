import React from 'react'
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


import css from './index.scss'
import css2 from './LgionForm.scss'
import {FORM_LOGIN} from "../../src/components/Login/LoginForm/LoginForm";
import {walletsListSelector} from "../../src/store";
import {getInitialPropsLoadingSelector, getInitialProps} from "../../src/store/myAccounts";

export class MyAccountsPage extends React.Component {

  componentDidMount () {
    this.props.getInitialProps()
  }

  renderAccounts () {
    return this.props.accounts.map((x) => (
      <ListItem button onClick={() => this.props.select(x.address)}>
        <Avatar src='http://test.laborx.io/images/profile-photo.jpg' />
        <ListItemText primary='My Account' secondary={x.address} />
      </ListItem>
    ))
  }

  renderContent () {
    return (
      <div>
        <List>{ this.props.accounts.length ? this.renderAccounts() : <ListItem>Sorry, there are no accounts to display</ListItem> }</List>
        <Button
          // onClick={this.navigateToLoginMethods.bind(this)}
          className={css2.row}
          buttonClassName={css2.submitButton}
          type={Button.TYPES.SUBMIT}
          label='Add an existing LaborX account'
          primary
          // disabled={pristine || invalid}
          // error={error}
          mods={Button.MODS.INVERT}
        />
      </div>
    )
  }

  render () {
    return (
      <SigninLayout>
        <div className={css.root}>
          {/*<ReactCSSTransitionGroup*/}
            {/*transitionName='slides'*/}
            {/*transitionEnterTimeout={1000}*/}
            {/*transitionLeaveTimeout={2000}*/}
            {/*transitionAppear={false}*/}
            {/*transitionEnter*/}
            {/*transitionLeave={false}*/}
          {/*>*/}
            <form className={css2.root} name={FORM_LOGIN} onSubmit={this.props.handleSubmit}>
              <div className={css2.formHeader}>My Accounts</div>
              { this.props.getInitialPropsLoading ? <CircularProgress /> : this.renderContent() }
              {/*<div className={css2.formHeader}>Log In</div>*/}

              {/*<div className={css.accountWrapper}>*/}
                {/*<UserRow*/}
                  {/*title={selectedWallet && selectedWallet.name}*/}
                  {/*onClick={this.handleNavigateToSelectWallet}*/}
                  {/*avatar={avatarUrl}*/}
                {/*/>*/}
              {/*</div>*/}


              {/*<Field*/}
                {/*className={css.row}*/}
                {/*component={Input}*/}
                {/*name='password'*/}
                {/*type='password'*/}
                {/*placeholder='Enter Password'*/}
                {/*autoComplete={false}*/}
                {/*mods={css.passwordField}*/}
                {/*errorMods={css.fieldError}*/}
                {/*inputMods={css.passwordFieldInput}*/}
                {/*lineEnabled={false}*/}
                {/*materialInput={false}*/}
              {/*/>*/}
              {/*{*/}
                {/*!fetchSignIn ? (*/}
                    {/*<Button*/}
                      {/*className={css.loginButton}*/}
                      {/*buttonClassName={css.submitButton}*/}
                      {/*type={Button.TYPES.SUBMIT}*/}
                      {/*label='LOGIN'*/}
                      {/*primary*/}
                      {/*disabled={pristine || invalid}*/}
                      {/*error={error}*/}
                      {/*errorMods={css.errorForm}*/}
                      {/*mods={Button.MODS.INVERT}*/}
                    {/*/>*/}
                  {/*)*/}
                  {/*:*/}
                  {/*<CircularProgress size={40} thickness={7} />*/}
              {/*}*/}
              <div>
                <button
                  // onClick={onClickForgotPassword}
                  className={css2.forgotPasswordLink}>
                  Forgot your password?
                </button>
              </div>
            </form>
          {/*</ReactCSSTransitionGroup>*/}
          {/*<Dialog*/}
            {/*open={this.props.openAccount404Dialog}*/}
            {/*onClose={this.handleAccount404DialogNoClick}*/}
          {/*>*/}
            {/*<DialogTitle><h2>LaborX account is not found</h2></DialogTitle>*/}
            {/*<DialogContent>*/}
              {/*LaborX account with the provided address is not found.*/}
              {/*Would you like to Create a New Account?*/}
            {/*</DialogContent>*/}
            {/*<DialogActions style={{ height: '40px' }}>*/}
              {/*<Button*/}
                {/*label='No'*/}
                {/*onClick={this.handleAccount404DialogNoClick}*/}
                {/*buttonClassName={[css.actionButton, css.actionButtonLeft].join(' ')}*/}
                {/*type={Button.TYPES.SUBMIT}*/}
              {/*/>*/}
              {/*<Button*/}
                {/*label='YES'*/}
                {/*onClick={this.handleAccount404DialogYesClick}*/}
                {/*buttonClassName={css.actionButton}*/}
                {/*type={Button.TYPES.SUBMIT}*/}
              {/*/>*/}
            {/*</DialogActions>*/}
          {/*</Dialog>*/}
        </div>
      </SigninLayout>
    )
  }
}

const mapStateToProps = (state) => ({
  getInitialPropsLoading: getInitialPropsLoadingSelector(state),
  accounts: walletsListSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  getInitialProps: () => dispatch(getInitialProps()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountsPage)

