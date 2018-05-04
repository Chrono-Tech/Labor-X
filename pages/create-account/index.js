import React, { input } from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import bip39 from 'bip39'

import { Link } from 'components/common'
import { AccountLayout } from 'components/layouts'
import { AccountPasswordForm, ShowMnemonic, ConfirmMnemonic, BackupWallet } from 'components/Account'
import initialStore, { setMnemonic } from 'store'

import 'styles/globals/globals.scss'
import css from './index.scss'

class PageCarousel extends React.Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      activePage: 0,
    }
  }
  
  navigateBack() {
    if (this.state.activePage - 1  >= 0) {
      this.setState({activePage: this.state.activePage - 1})
    }
  }
  
  navigateNext() {
    if (this.state.activePage + 1 <= this.props.children.length) {
      this.setState({activePage: this.state.activePage + 1})
    }
  }
  
  render(){
    const { children } = this.props
    const pageProps = {
      navigateBack: this.navigateBack.bind(this),
      navigateNext: this.navigateNext.bind(this),
      onSubmitSuccess: this.navigateNext.bind(this)
    }
    
    return React.Children.map(children, (item, index) => (
      <div className={[css.page, this.state.activePage === index ? css.activeSlide : ''].join(' ')}>
        { React.cloneElement(item, pageProps) }
      </div>
    ))
  }
}

class CreateAccount extends React.Component {
  
  constructor(){
    super()
    
    this.state = {
      activePage: null,
    }
  }
  
  static async getInitialProps({ store }) {
    const mnemonic = bip39.generateMnemonic()
    
    store.dispatch(setMnemonic(mnemonic))
    return { mnemonic }
  }
  
  componentWillMount(){
    const { setMnemonic, mnemonic } = this.props
    
    setMnemonic(mnemonic)
  }
  
  render () {
  
    return (
      <div className={css.root}>
        <Head>
          <title>LaborX</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width' />
        </Head>
        <AccountLayout title='Create New Acccount'>
          <AccountPasswordForm  />
          <ShowMnemonic />
          <ConfirmMnemonic />
          <BackupWallet />
        </AccountLayout>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMnemonic: (mnemonic) => dispatch(setMnemonic(mnemonic)),
  }
}

export default withRedux(initialStore, null, mapDispatchToProps)(CreateAccount)
