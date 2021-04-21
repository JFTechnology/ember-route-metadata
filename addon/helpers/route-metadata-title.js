import Helper from '@ember/component/helper';

import {typeOf} from '@ember/utils';

import {inject as service} from '@ember/service';

const METADATA_KEY = 'title';

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

  constructor() {
    super(...arguments);
    this.routeMetadata.on('metadata.title', this, 'recompute');
  }

  willDestroy() {
    this.routeMetadata.off('metadata.title', this, 'recompute');
    super.willDestroy();
  }

  compute() {
    let routeInfos = this.routeMetadata.findCurrentRouteInfos(METADATA_KEY);
    document.title = routeInfos.map(this._toLabel).join(' | ');
  }

  _toLabel = (routeInfo) => {

    let label = routeInfo.metadata?.[METADATA_KEY].label || `route-metadata.${routeInfo.name}.page-title`;

    return typeOf(label) === 'function' ? label(routeInfo) : this.intl.t(label);
  }
}
