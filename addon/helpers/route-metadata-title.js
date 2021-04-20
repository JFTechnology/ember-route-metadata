import Helper from '@ember/component/helper';

import {typeOf} from '@ember/utils';

import {inject as service} from '@ember/service';

/**
 * Helper class that listens the RouteMetadata service for 'metadata.title' events, calculates the current internationalized title, and sets the
 * document.title property accordingly.
 *
 * Can be added as {{route-metadata-title}} to the application template.
 *
 * @class RouteMetadataTitle
 * @public
 */
export default class RouteMetadataTitle extends Helper {

  @service
  routeMetadata;

  @service
  intl;

  /**
   * The metadata key to listen for.
   * @property {string}
   */
  metadataKey = 'title';

  constructor() {
    super(...arguments);
    this.routeMetadata.on('metadata.title', this, 'recompute');
  }

  willDestroy() {
    this.routeMetadata.off('metadata.title', this, 'recompute');
    super.willDestroy();
  }

  compute() {

    let routeInfos = this.routeMetadata.findCurrentMetadata(this.metadataKey);
    document.title = routeInfos.map(routeInfo => this._toLabel(routeInfo)).join(' | ');
  }

  _toLabel(routeInfo) {

    const label = routeInfo.metadata?.[this.metadataKey].label || `route-metadata.${routeInfo.name}.page-title`;

    return typeOf(label) === 'function' ? label(routeInfo) : this.intl.t(label);
  }
}
