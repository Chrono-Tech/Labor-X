import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html lang='en'>
        <Head>
          <link rel='stylesheet' href='/_next/static/style.css' />
          <link rel='shortcut icon' href='/static/favicon.ico' type='image/x-icon' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
