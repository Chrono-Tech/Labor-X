/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const componentGenerator = require('./component/index.js')

module.exports = plop => {
  plop.setGenerator('atom', componentGenerator('atom'))
  plop.setGenerator('molecule', componentGenerator('molecule'))
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
}
