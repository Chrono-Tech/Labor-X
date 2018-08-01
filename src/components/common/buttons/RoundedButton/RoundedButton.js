import React from 'react'
import classnames from 'classnames'


import ButtonWithLoader from 'src/components/common/buttons/ButtonWithLoader/ButtonWithLoader'

import css from './RoundedButton.pcss'

const RoundedButton = (props) => (
  <ButtonWithLoader {...props} variant='contained' className={classnames(props.className, css.RoundedButton)}>{props.children}</ButtonWithLoader>
)

export default RoundedButton