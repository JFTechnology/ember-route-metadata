module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'object-curly-spacing': ['error', 'never'],
    'semi': 'error',
    'prefer-const': 'off',
    'quotes': ['error', 'single'],
    'eol-last': ['error', 'always'],
    'ember/no-jquery': 'error',
    'ember/no-get': 'warn',
    'ember/no-computed-properties-in-native-classes': 'warn',
    'ember/no-observers': 'warn',
    'ember/no-controller-access-in-routes': 'warn',
    'ember/require-computed-property-dependencies': 'warn'
  },
  overrides: [
    // node files
    {
      files: [
        '.ember-cli.js',
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      })
    }
  ]
};
