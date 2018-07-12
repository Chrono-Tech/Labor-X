import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from 'material-ui/styles'
import initStore from 'src/store'
import { ModalStack } from 'src/partials'
import 'styles/globals/globals.scss'

export class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    return {
      pageProps: (!Component.getInitialProps ? {} : await Component.getInitialProps(ctx)),
    }
  }

  render () {

    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <MuiThemeProvider>
            <div>
              <Component {...pageProps} />
              <ModalStack />
            </div>
          </MuiThemeProvider>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(initStore)(MyApp)
