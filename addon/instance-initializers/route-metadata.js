export function initialize(appInstance) {

  // simply to force service initialization
  appInstance.lookup('service:route-metadata');
}

export default {
  initialize
};
