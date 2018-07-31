// import { configure } from '@storybook/react';
//
// // automatically import all files ending in *.stories.js
// const req = require.context('../stories', true, /.stories.js$/);
// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }
//
// configure(loadStories, module);

import React from 'react'
import { configure, addDecorator } from '@storybook/react'

import JssProviderDecorator from './decorator/JssProvider'

addDecorator((story) => <JssProviderDecorator>{story()}</JssProviderDecorator>)

// function loadStories() {
//   require('../storybook/index.js');
//   // You can require as many stories as you need.
// }

configure(() => {
  require('src/components/common/buttons/WhiteRoundButton/WhiteRoundButton.storybook');
}, module);
