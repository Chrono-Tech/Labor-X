import React from 'react';
import { storiesOf } from '@storybook/react';

import WhiteRoundButton from './WhiteRoundButton'

storiesOf('WhiteRoundButton')
  .add('with short text', () => <WhiteRoundButton>Hello Button</WhiteRoundButton>)
  .add('with long text', () => <WhiteRoundButton>Some long text lorem ipsum</WhiteRoundButton>)
  .add('with loader on short text', () => <WhiteRoundButton loader>Hello Button</WhiteRoundButton>)
  .add('with loader on long text', () => <WhiteRoundButton loader>Some long text lorem ipsum</WhiteRoundButton>)