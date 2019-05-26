import Service, { inject as service } from '@ember/service';
import Evented from '@ember/object/evented';

import { computed, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';

import { assign } from '@ember/polyfills';
import { observes } from '@ember-decorators/object';

/**
 * Service that presents Ember route info based on metadata content. The service fires events for each metadata
 * key provided by any route segment traversed in a settled transition.
 *
 * @class RouteMetadataService
 * @public
 */
export default class RouteMetadataService extends Service.extend(Evented) {

  /**
   * The injected Ember router service.
   *
   * @property router
   * @type {RouterService}
   */
  @service
  router;

  transition;

  /**
   * The 'from' route of the last settled route transition.
   *
   * @property previousRoute
   * @type {RouteInfo}
   */
  @alias('transition.from')
  previousRoute;

  /**
   * The 'to' route of the last settled route transition.
   *
   * @property currentRoute
   * @type {RouteInfo}
   */
  @alias('transition.to')
  currentRoute;

  init() {
    super.init(...arguments);
    this.router.on('routeDidChange', (transition) => set(this, 'transition', transition));
  }

  /**
   * Observer method that calculates all route segments traversed by a transition, aggregates any metadata keys in the
   * traversal path, and fires an event ('metadata.[key]') for each key.
   *
   * @method onTransition
   * @private
   */
  @observes('transition')
  _onTransition() {

    const previousMetadata = this.previousMetadata;
    const currentMetadata = this.currentMetadata;

    const commonMetadata = currentMetadata.filter((m, index) => {

      if (previousMetadata.length <= index) {
        return false;
      }

      return m.name === previousMetadata[index].name;
    });

    const fromMetadata = previousMetadata.slice(commonMetadata.length);
    const toMetadata = currentMetadata.slice(commonMetadata.length);

    const metadataTraversal = {};

    fromMetadata.map(r => r.metadata).forEach(m => assign(metadataTraversal, m));
    toMetadata.map(r => r.metadata).forEach(m => assign(metadataTraversal, m));

    Object.keys(metadataTraversal).forEach(key => this.trigger(`metadata.${key}`, key, this.transition));
  }

  /**
   * The array of all RouteInfo objects with metadata interpolated from the 'to' property of the last settled route
   * transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [A,B,C].
   *
   * @property previousMetadata
   * @type {RouteInfo[]}
   */
  @computed('previousRoute')
  get previousMetadata() {

    return _filterForMetadata(this.previousRoute);
  }

  /**
   * The array of all RouteInfo objects with metadata interpolated from the 'from' property of the last settled route
   * transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [A,D,E].
   *
   * @property currentMetadata
   * @type {RouteInfo[]}
   */
  @computed('currentRoute')
  get currentMetadata() {

    return _filterForMetadata(this.currentRoute);
  }

  /**
   * The 'diff' array of all RouteInfo objects with metadata interpolated from the from/to properties of the last
   * settled route transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [D,E]. This is useful for adding routing behaviours
   * such as scrolling that require knowledge of the change in path rather than the absolute settled path.
   *
   * @property transitionMetadata
   * @type {RouteInfo[]}
   */
  @computed('previousMetadata', 'currentMetadata')
  get transitionMetadata() {

    const previousMetadata = this.previousMetadata;
    const currentMetadata = this.currentMetadata;

    const transitionMetadata = currentMetadata.filter((m, index) => {

      if (previousMetadata.length <= index) {
        return true;
      }

      return m.name !== previousMetadata[index].name;
    });

    return transitionMetadata;
  }

  /**
   * @method findPreviousMetadata
   * @param {String} key  The metadata to search for.
   * @return {RouteInfo[]} The matching metadata ordered from root to leaf.
   */
  findPreviousMetadata(key) {

    return this.previousMetadata.filter(info => get(info, `metadata.${key}`));
  }

  /**
   * @method findCurrentMetadata
   * @param {String} key  The metadata to search for.
   * @return {RouteInfo[]} The matching metadata ordered from root to leaf.
   */
  findCurrentMetadata(key) {

    return this.currentMetadata.filter(info => get(info, `metadata.${key}`));
  }

  /**
   * @method findTransitionMetadata
   * @param {String} key  The metadata to search for.
   * @return {RouteInfo[]} The matching metadata ordered from root to leaf.
   */
  findTransitionMetadata(key) {

    return this.transitionMetadata.filter(info => get(info, `metadata.${key}`));
  }
}


function _filterForMetadata(route) {

  let routeInfos = [];

  if (route) {

    route.find(info => {

      routeInfos.push(info);
    });
  }

  return routeInfos.filter(info => get(info, 'metadata'));
}
