import Service, {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

import Evented from '@ember/object/evented';

import {get} from '@ember/object';

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
  previousMetadata = [];

  /**
   * The array of all RouteInfo objects with metadata interpolated from the 'from' property of the last settled route
   * transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [A,D,E].
   */
  @tracked
  currentMetadata = [];

  /**
   * The 'diff' array of all RouteInfo objects with metadata interpolated from the from/to properties of the last
   * settled route transition ordered from root to leaf.
   * For example if the settled transition is from A.B.C to A.D.E then this method will return the array of route infos [D,E]. This is useful for adding routing behaviours
   * such as scrolling that require knowledge of the change in path rather than the absolute settled path.
   *
   */
  @tracked
  transitionMetadata = [];

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', (transition) => this.onTransition(transition?.from, transition?.to));
    this.onTransition(undefined, this.router.currentRoute);
  }


  /**
   * Observer method that calculates all route segments traversed by a transition, aggregates any metadata keys in the
   * traversal path, and fires an event ('metadata.[key]') for each key.
   *
   */
  onTransition(from, to) {

    this.previousMetadata = _filterForMetadata(from);
    this.currentMetadata = _filterForMetadata(to);

    this.transitionMetadata = this.currentMetadata.filter((m, index) => {

      if (this.previousMetadata.length <= index) {
        return true;
      }

      return m.name !== this.previousMetadata[index].name;
    });

    let commonMetadata = this.currentMetadata.filter((m, index) => {

      if (this.previousMetadata.length <= index) {
        return false;
      }

      return m.name === this.previousMetadata[index].name;
    });

    let fromMetadata = this.previousMetadata.slice(commonMetadata.length);
    let toMetadata = this.currentMetadata.slice(commonMetadata.length);

    let metadataTraversal = {};

    fromMetadata.map(r => r.metadata).forEach(m => assign(metadataTraversal, m));
    toMetadata.map(r => r.metadata).forEach(m => assign(metadataTraversal, m));

    this.trigger('didTransition');
    Object.keys(metadataTraversal).forEach(key => this.trigger(`metadata.${key}`, key));
  }

  /**
   * @method findPreviousMetadata
   * @param {String} key  The metadata to search for.
   */
  findPreviousMetadata(key) {
    return this.previousMetadata.filter(info => info?.metadata ? [key] : undefined);
  }

  /**
   * @method findCurrentMetadata
   * @param {String} key  The metadata to search for.
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

  return routeInfos.filter(info => info.metadata);
}
