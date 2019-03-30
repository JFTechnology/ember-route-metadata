import Service from '@ember/service';

import { get, set } from '@ember/object';

import { inject as service } from '@ember-decorators/service';
import { computed } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';


/**
 * Service that presents Ember route info based on metadata content.
 *
 * @class RouteMetadataService
 * @public
 */
export default class RouteMetadataService extends Service {

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
