import Component from '@glimmer/component';

import {action} from '@ember/object';
import {inject as service} from '@ember/service';
import {tracked} from "@glimmer/tracking";

/**
 * Component {{bread-crumbs}}.
 *
 * @class BreadCrumbs
 * @public
 */
export default class BreadCrumbs extends Component {

  @service
  routeMetadata;

  @tracked
  routeInfos = [];

  constructor() {
    super(...arguments);
    this.routeMetadata.on('didTransition', this.didTransition);
  }

  willDestroy() {
    this.routeMetadata.off('didTransition', this.didTransition);
    super.willDestroy();
  }

  didTransition = () => {
    this.routeInfos = this.routeMetadata.findCurrentMetadata('breadcrumb');
    console.log('didTransition', this.routeInfos);
  }

  /**
   * The default component used to render each individual bread crumb.
   * Defaults to built-in {{bread-crumbs/bread-crumb}} component.
   *
   * @property defaultComponent
   * @type {string}
   */
  get defaultComponent() {
    return this.args.defaultComponent || 'bread-crumbs/bread-crumb';
  }

  /**
   * The default icon class used to prefix each individual bread crumb.
   * Defaults to Font Awesome class 'fa-angle-double-right'.
   *
   * @property defaultIconClass
   * @type {string}
   */
  get defaultIconClass() {
    return this.args.defaultIconClass || '#chevron-right';
  }

  @action
  transition(routeInfo) {
    this.routeMetadata.router.transitionTo(routeInfo.name);
  }
}
