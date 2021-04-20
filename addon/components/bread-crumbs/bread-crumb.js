import Component from '@glimmer/component';

import {typeOf} from '@ember/utils';

import {action} from '@ember/object';
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
   */
  get parent() {
    return this.args.parent;
  }

  /**
   * The route associated with this bread crumb. Will be set by the parent component.
   *
   * @property routeInfo
   */
  get routeInfo() {
    return this.args.routeInfo;
  }

  /**
   * The index of the breadcrumb in the route array. Will be set by the parent component.
   *
   * @property index
   */
  get index() {
    return this.args.index;
  }

  /**
   * The metadata for this RouteInfo segment. Read-only property.
   *
   * @property metadata
   * @type {object}
   * @public
   * @readonly
   */
  get metadata() {
    return this.routeInfo.metadata;
  }

  /**
   * The breadcrumb metadata for this RouteInfo segment. Read-only property.
   *
   * @property breadcrumb
   */
  get breadcrumb() {
    return this.metadata.breadcrumb;
  }

  get routeName() {
    return this.routeInfo.name;
  }

  get breadcrumbLabel() {
    return this.breadcrumb.label;
  }

  get breadcrumbIcon() {
    return this.breadcrumb.icon;
  }

  get text() {

    if (typeOf(this.breadcrumbLabel) === 'function') {

      return this.breadcrumbLabel(this.routeInfo);
    }

    let label = this.breadcrumbLabel || `route-metadata.${this.routeName}.bread-crumb`;

    return this.intl.t(label);
  }

  get icon() {
    return this.breadcrumbIcon || this.parent.defaultIconClass;
  }

  @action
  transition() {
    this.parent.transition(this.routeInfo);
  }
}
