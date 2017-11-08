const loaderUtils = require('loader-utils')

module.exports = function loader(source, map) {
  this.callback(null, source, map)
}

module.exports.pitch = function pitch(remainingRequest) {
  this.cacheable()

  const cnames = loaderUtils.stringifyRequest(this, `!${require.resolve('classnames/bind')}`)
  const styles = loaderUtils.stringifyRequest(this, `!!${remainingRequest}`)

  return `
    if (module.hot) {
      var styles = require(${styles})
      var classnames = require(${cnames}).bind(styles)

      var fn = function() {
        return classnames.apply(null, arguments)
      }

      // Allow using this as an ES6 module
      fn.default = fn

      // Allow access to the raw style map
      fn.styles = styles

      module.exports = fn

      module.hot.accept(${styles}, function() {
        fn.styles = styles = require(${styles})
        classnames = require(${cnames}).bind(styles)
      })
    } else {
      module.exports = require(${cnames}).bind(require(${styles}))
    }
  `
}
