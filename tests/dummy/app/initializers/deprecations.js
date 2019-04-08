import { registerDeprecationHandler } from '@ember/debug';

const IGNORED = ['action-deprecation', 'computed-deprecations'];

export function initialize() {
  registerDeprecationHandler((message, options, next) => {

    if (options && IGNORED.includes(options.id)) {
      return;
    } else {
      next(message, options);
    }
  });
}

export default { initialize };
