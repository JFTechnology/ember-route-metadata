import Component from '@glimmer/component';

import {typeOf} from '@ember/utils';

import {action, computed} from '@ember/object';
import {readOnly} from '@ember/object/computed';
import {inject as service} from '@ember/service';

/**
 * Component {{bread-crumbs/bread-crumb}}.
 *
 * Default component to render a single route segment. Key properties are set by parent {{bread-crumbs}} component.
 * Extending this class should be the easiest way to create a custom renderer.
 *
 * @class BreadCrumb
 * @public
 */
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
  @readOnly('args.parent')
  parent;

  /**
   * The route associated with this bread crumb. Will be set by the parent component.
   *
   * @property routeInfo
   * @type {RouteInfo}
   * @public
   */
  @readOnly('args.routeInfo')
  routeInfo;

  /**
   * The index of the breadcrumb in the route array. Will be set by the parent component.
   *
   * @property index
   * @type {number}
   * @public
   */
  @readOnly('args.index')
  index = 0;

  /**
   * The metadata for this RouteInfo segment. Read-only property.
   *
   * @property metadata
   * @type {object}
   * @public
   * @readonly
   */
  @readOnly('routeInfo.metadata')
  metadata;

  /**
   * The breadcrumb metadata for this RouteInfo segment. Read-only property.
   *
   * @property breadcrumb
   * @type {object}
   * @public
   * @readonly
   */
  @readOnly('metadata.breadcrumb')
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

  @action
  transition() {
    this.parent.transition(this.routeInfo);
  }
}
