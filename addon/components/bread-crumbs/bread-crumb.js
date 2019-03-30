import Component from '@ember/component';
import BreadCrumbs from '../bread-crumbs';

import { typeOf } from '@ember/utils';

import { computed } from '@ember-decorators/object';
import { readOnly } from '@ember-decorators/object/computed';
import { inject as service } from '@ember-decorators/service';
import { argument } from '@ember-decorators/argument';

import { classNames, layout, tagName } from '@ember-decorators/component';

import template from '../../templates/components/bread-crumbs/bread-crumb';

/**
 * Default component to render a single route segment. Key properties are set by parent {{bread-crumbs}} component.
 * Extending this class should be the easiest way to create a custom renderer.
 *
 * @class BreadCrumb
 * @public
 */
@layout(template)
@tagName('span')
@classNames('bread-crumb')
export default class BreadCrumb extends Component {

  @service
  intl;

  /**
   * The route associated with this bread crumb. Will be set by the parent component.
   *
   * @property parent
   * @type {BreadCrumbs}
   * @public
   */
  @argument(BreadCrumbs)
  parent;

  /**
   * The route associated with this bread crumb. Will be set by the parent component.
   *
   * @property routeInfo
   * @type {RouteInfo}
   * @public
   */
  @argument('object')
  routeInfo;

  /**
   * The index of the breadcrumb in the route array. Will be set by the parent component.
   *
   * @property index
   * @type {number}
   * @public
   */
  @argument('number')
  index = 0;

  @readOnly('routeInfo.metadata.breadcrumb')
  breadcrumb;

  @readOnly('routeInfo.name')
  routeName;

  @readOnly('breadcrumb.label')
  breadcrumbLabel;

  @readOnly('breadcrumb.icon')
  breadcrumbIcon;

  @computed('breadcrumbLabel')
  get text() {

    if (typeOf(this.breadcrumbLabel) === 'function') {

      return this.breadcrumbLabel(this.routeInfo);
    }

    const label = this.breadcrumbLabel || `route-metadata.${this.routeName}.bread-crumb`;

    return this.intl.t(label);
  }

  @computed('breadcrumbIcon')
  get icon() {
    return this.breadcrumbIcon || this.parent.defaultIconClass;
  }

  mouseUp() {
    this.parent.transition(this.routeInfo);
  }
}
