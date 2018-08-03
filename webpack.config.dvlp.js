const merge = require('webpack-merge');
const common = require('./webpack.config.common');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],
});
