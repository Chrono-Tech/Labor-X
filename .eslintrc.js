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
    'import/no-extraneous-dependencies': 'off', // TODO Use webpack resolver possible to solve issues with aliased modules
    'import/prefer-default-export': 'off',
    'arrow-parens': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-for': 'off',
    'no-class-assign': 'off',
    "import/no-unresolved": "off",
    "import/extensions": "off",
  }
}
