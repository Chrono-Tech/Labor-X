import React from 'react'
import classnames from "classnames";
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import css from './ButtonWithLoader.pcss'

const ButtonWithLoader = (props) => {
  const className = classnames(
    props.className,
    css.ButtonWithLoader,
    props.loader ? css.withLoader : null
  )
  return (
    <Button {...props} className={className} disabled={props.disabled || props.loader}>
      <span className={css.text}>{props.children}</span>
      {props.loader ? <CircularProgress size={20} className={css.progress} /> : null}
    </Button>
  )
}

export default ButtonWithLoader