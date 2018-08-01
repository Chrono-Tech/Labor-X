import React from 'react'

import RoundedButton from 'src/components/common/buttons/RoundedButton/RoundedButton'

import css from './BlueRoundedButton.pcss'

const BlueRoundedButton = (props) => (
  <RoundedButton {...props} className={css.BlueRoundedButton}>{props.children}</RoundedButton>
)

export default BlueRoundedButton