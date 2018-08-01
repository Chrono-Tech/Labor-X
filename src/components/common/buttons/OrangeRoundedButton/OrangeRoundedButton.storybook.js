import React from 'react';
import { storiesOf } from '@storybook/react';

import OrangeRoundedButton from './OrangeRoundedButton'

storiesOf('OrangeRoundedButton')
  .add('with text', () => <OrangeRoundedButton>Lorem Ipsum</OrangeRoundedButton>)
  .add('with loader', () => <OrangeRoundedButton loader>Lorem Ipsum</OrangeRoundedButton>)