import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import initStore from 'src/store'
import { ModalStack } from 'src/partials'
import 'styles/globals/globals.scss'

export class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    // console.log('MyApp Component.getInitialProps', Component.getInitialProps, Component)
    return {
      pageProps: (!Component.getInitialProps ? {} : await Component.getInitialProps(ctx)),
    }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <div>
            <Component {...pageProps} />
            <ModalStack />
          </div>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(MyApp)
