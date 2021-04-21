import Service, {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

import Evented from '@ember/object/evented';

import {assign} from '@ember/polyfills';

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
   */
  @service
  router;

  /**
   * The array of all RouteInfo objects with metadata interpolated from the 'to' property of the last settled route
   * transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [A,B,C].
   */
  @tracked
  previousRouteInfos = [];

  /**
   * The array of all RouteInfo objects with metadata interpolated from the 'from' property of the last settled route
   * transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [A,D,E].
   */
  @tracked
  currentRouteInfos = [];

  /**
   * The 'diff' array of all RouteInfo objects with metadata interpolated from the from/to properties of the last
   * settled route transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [D,E]. This is useful for adding routing behaviours
   * such as scrolling that require knowledge of the change in path rather than the absolute settled path.
   *
   */
  @tracked
  commonRouteInfos = [];

  /**
   * The 'diff' array of all RouteInfo objects with metadata interpolated from the from/to properties of the last
   * settled route transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [D,E]. This is useful for adding routing behaviours
   * such as scrolling that require knowledge of the change in path rather than the absolute settled path.
   *
   */
  @tracked
  transitionRouteInfos = [];

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', (transition) => this.onTransition(transition?.from, transition?.to));
    this.onTransition(undefined, this.router.currentRoute);
  }


  /**
   * Observer method that calculates all route segments traversed by a transition, aggregates any metadata keys in the
   * traversal path, and fires an event ('metadata.[key]') for each key.
   */
  onTransition(from, to) {

    this.currentRouteInfos = _filterForMetadata(to);
    this.previousRouteInfos = _filterForMetadata(from);

    this.transitionRouteInfos = this.currentRouteInfos.filter((m, index) => {

      if (this.previousRouteInfos.length <= index) {
        return true;
      }

      return m.name !== this.previousRouteInfos[index].name;
    });

    this.commonRouteInfos = this.currentRouteInfos.filter((m, index) => {

      if (this.previousRouteInfos.length <= index) {
        return false;
      }

      return m.name === this.previousRouteInfos[index].name;
    });

    let fromMetadata = this.previousRouteInfos.slice(this.commonRouteInfos.length).map(r => r.metadata);
    let toMetadata = this.currentRouteInfos.slice(this.commonRouteInfos.length).map(r => r.metadata);

    let metadataTraversal = {};

    fromMetadata.forEach(m => assign(metadataTraversal, m));
    toMetadata.forEach(m => assign(metadataTraversal, m));

    this.trigger('didTransition');

    for (const key in metadataTraversal) {
      this.trigger(`metadata.${key}`, key, this.transitionRouteInfos.map(ri => ri.metadata));
    }
  }

  /**
   * @method findPreviousMetadata
   * @param {String} key  The metadata to search for.
   */
  findPreviousRouteInfos(key) {
    return this.previousRouteInfos.filter(keyFilter(key));
  }

  /**
   * @method findCurrentMetadata
   * @param {String} key  The metadata to search for.
   */
  findCurrentRouteInfos(key) {
    return this.currentRouteInfos.filter(keyFilter(key));
  }

  /**
   * @method findTransitionMetadata
   * @param {String} key  The metadata to search for.
   */
  findTransitionRouteInfos(key) {
    return this.transitionRouteInfos.filter(keyFilter(key));
  }
}

function keyFilter(key) {
  return (routeInfo) => routeInfo.metadata ? routeInfo.metadata[key] : false;
}

function _filterForMetadata(route) {

  let routeInfos = [];

  if (route) {

    route.find(info => {

      routeInfos.push(info);
    });
  }

  return routeInfos.filter(info => info.metadata);
}
