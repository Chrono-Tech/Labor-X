import React from 'react'
import classnames from 'classnames'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import css from './WhiteRoundButton.pcss'

const WhiteRoundButton = (props) => (
  <Button {...props} variant='contained' className={classnames(css.root, props.loader ? css.rootWithLoader : null)}>
    <span className={css.text}>{props.children}</span>
    {props.loader ? <CircularProgress size={20} className={css.progress} /> : null}
  </Button>
)

export default WhiteRoundButton