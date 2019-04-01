import Component from '@ember/component';

import { action, computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { argument } from '@ember-decorators/argument';

import { classNames, layout } from '@ember-decorators/component';

import template from '../templates/components/bread-crumbs';

/**
 * Component {{bread-crumbs}}.
 *
 * @class BreadCrumbs
 * @public
 */
@layout(template)
@classNames('bread-crumbs')
export default class BreadCrumbs extends Component {

  @service
  routeMetadata;

  /**
   * The default component used to render each individual bread crumb.
   * Defaults to built-in {{bread-crumbs/bread-crumb}} component.
   *
   * @property defaultComponent
   * @type {string}
   */
  @argument('string')
  defaultComponent = 'bread-crumbs/bread-crumb';

  /**
   * The default icon class used to prefix each individual bread crumb.
   * Defaults to Font Awesome class 'fa-angle-double-right'.
   *
   * @property defaultIconClass
   * @type {string}
   */
  @argument('string')
  defaultIconClass = 'fa fa-angle-double-right fa-fw';

  @computed('routeMetadata.currentRoute')
  get routeInfos() {

    return this.routeMetadata.findCurrentMetadata('breadcrumb');
  }

  @action
  transition(routeInfo) {
    this.routeMetadata.router.transitionTo(routeInfo.name);
  }
}
