import React from 'react';
import { storiesOf } from '@storybook/react';

import WhiteRoundedButton from './WhiteRoundedButton'

storiesOf('WhiteRoundedButton')
  .add('with text', () => <WhiteRoundedButton>Lorem Ipsum</WhiteRoundedButton>)
  .add('with loader', () => <WhiteRoundedButton loader>Lorem Ipsum</WhiteRoundedButton>)