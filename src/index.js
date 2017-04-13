import React from 'react'
import ReactDOM from 'react-dom'
import log from 'loglevel'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { start as startStore } from './store'
import { router } from './router'
import './index.css'
import Config from './config';

const start = () => {
  log.setLevel(Config.LogLevel)
  log.info('Starting Labox X...')

  /** Needed for onTouchTap @link http://stackoverflow.com/a/34015469/988941 */
  injectTapEventPlugin()

  ReactDOM.render(
    <MuiThemeProvider>
      {router}
    </MuiThemeProvider>,
    document.getElementById('root')
  )

  log.info('Starting store')
  startStore()
}

window.LABORX = window.LABORX || {}
window.LABORX.start = start
