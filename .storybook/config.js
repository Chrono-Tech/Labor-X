import React from 'react'
import { configure, addDecorator } from '@storybook/react'

import jssProviderDecorator from './decorator/jssProvider'
import backgroundsDecorator from './decorator/backgrounds'


addDecorator(jssProviderDecorator)
addDecorator(backgroundsDecorator)

configure(() => {
  require('src/components/common/buttons/ButtonWithLoader/ButtonWithLoader.storybook');
  require('src/components/common/buttons/RoundedButton/RoundedButton.storybook');
  require('src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton.storybook');
  require('src/components/common/buttons/OrangeRoundedButton/OrangeRoundedButton.storybook');
  require('src/components/common/buttons/BlueRoundedButton/BlueRoundedButton.storybook');
}, module);

