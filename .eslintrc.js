module.exports = {
  'extends': [
    'plugin:chronobank-react/recommended'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: [
          '.'
        ],
        moduleDirectory: [
          'node_modules',
          'src',
        ]
      }
    }
  },
  rules: {
    'import/no-extraneous-dependencies': 'off' // TODO Use webpack resolver possible to solve issues with aliased modules
  }
}
