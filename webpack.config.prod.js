const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
});
