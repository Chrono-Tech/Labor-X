import React from 'react'

import RoundedButton from 'src/components/common/buttons/RoundedButton/RoundedButton'

import css from './WhiteRoundedButton.pcss'

const WhiteRoundedButton = (props) => (
  <RoundedButton {...props} className={css.WhiteRoundedButton}>{props.children}</RoundedButton>
)

export default WhiteRoundedButton