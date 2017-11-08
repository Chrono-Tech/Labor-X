/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs')
const path = require('path')

function pathExists(componentPath) {
  return fs.existsSync(path.resolve(process.cwd(), componentPath))
}

function componentExists(comp) {
  return pathExists(`./atoms/${comp}`) || pathExists(`./molecules/${comp}`)
}

module.exports = componentExists
