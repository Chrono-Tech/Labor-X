const fs = require('fs')
const resolve = require('resolve')
const browserResolve = require('browser-resolve')

function defaultResolver(path, options) {
  const resv = options.browser ? browserResolve : resolve

  return fs.realpathSync(resv.sync(path, {
    basedir: options.basedir,
    extensions: options.extensions,
    moduleDirectory: options.moduleDirectory,
    paths: options.paths,
  }))
}

module.exports = defaultResolver
