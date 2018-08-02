import React from 'react'

import RoundedButton from 'src/components/common/buttons/RoundedButton/RoundedButton'

import css from './OrangeRoundedButton.pcss'

const OrangeRoundedButton = (props) => (
  <RoundedButton {...props} className={css.OrangeRoundedButton}>{props.children}</RoundedButton>
)

export default OrangeRoundedButton