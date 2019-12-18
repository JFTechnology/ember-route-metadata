'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-bare-strings': true,
    'no-curly-component-invocation': {
      allow: [
        'route-metadata-title',
        'route-metadata-scroll',
        'route-metadata-debug',
      ]
    },
    'no-implicit-this': {
      allow: [
        'route-metadata-title',
        'route-metadata-scroll',
        'route-metadata-debug',
      ]
    },
  }
};
