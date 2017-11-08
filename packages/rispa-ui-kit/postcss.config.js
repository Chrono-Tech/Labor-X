const path = require('path')

/* eslint-disable global-require */
module.exports = {
  parser: 'sugarss',
  plugins: [
    require('postcss-import')({
      path: path.resolve(__dirname, './styles'),
    }),
    require('postcss-custom-properties')({
      warnings: false,
    }),
    require('postcss-color-function'),
    require('postcss-for'),
    require('postcss-nested'),
    require('autoprefixer')({
      remove: false,
    }),
    require('postcss-autoreset')({
      rulesMatcher: ({ selector, parent: { name, type } }) => (
        !/(^\..*\.| |_|:|\[|>|\+)/.test(selector) && type !== 'atrule' && name !== 'keyframes'
      ),
      reset: {
        all: 'initial',
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
      },
    }),
    require('postcss-initial'),
  ],
}
