import React from 'react';
import { storiesOf } from '@storybook/react';

import RoundedButton from './RoundedButton'

storiesOf('RoundedButton')
  .add('with text', () => <RoundedButton>Lorem Ipsum</RoundedButton>)
  .add('with loader', () => <RoundedButton loader>Lorem Ipsum</RoundedButton>)