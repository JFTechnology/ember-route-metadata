import AddonDocsRouter, {docsRoute} from 'ember-cli-addon-docs/router';
import config from './config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {

  docsRoute(this, function() {
    this.route('index');
    this.route('components', function() {
      this.route('bread-crumbs');
      this.route('bread-crumbs-alt-component');
      this.route('bread-crumbs-alt-icon');
      this.route('bread-crumbs-alt-label');
      this.route('bread-crumbs-function');
      this.route('scroll-helper');
      this.route('title-helper');
      this.route('title-helper-alt-label');
      this.route('title-helper-function');
    });
  });

  this.route('not-found', {path: '/*path'});

});
