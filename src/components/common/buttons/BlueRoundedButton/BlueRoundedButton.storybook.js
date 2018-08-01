import React from 'react';
import { storiesOf } from '@storybook/react';

import BlueRoundedButton from './BlueRoundedButton'

storiesOf('BlueRoundedButton')
  .add('with text', () => <BlueRoundedButton>Lorem Ipsum</BlueRoundedButton>)
  .add('with loader', () => <BlueRoundedButton loader>Lorem Ipsum</BlueRoundedButton>)