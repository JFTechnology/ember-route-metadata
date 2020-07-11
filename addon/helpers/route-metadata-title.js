import Helper from '@ember/component/helper';

import {typeOf} from '@ember/utils';

import {getWithDefault} from '@ember/object';

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

  @service
  fastboot;

  /**
   * The metadata key to listen for.
   * @property {string}
   */
  metadataKey = 'title';

  init() {
    super.init(...arguments);
    this.routeMetadata.on(`metadata.${this.metadataKey}`, this, 'recompute');
  }

  destroy() {
    this.routeMetadata.off(`metadata.${this.metadataKey}`, this, 'recompute');
    return super.destroy(...arguments);
  }

  compute() {

    if (!this.routeMetadata.isFastBoot) {
      const routeInfos = this.routeMetadata.findCurrentMetadata(this.metadataKey);
      document.title = routeInfos.map(routeInfo => this._toLabel(routeInfo)).join(' | ');
    }
  }

  _toLabel(routeInfo) {

    const label = getWithDefault(routeInfo, `metadata.${this.metadataKey}.label`, `route-metadata.${routeInfo.name}.page-title`)

    return typeOf(label) === 'function' ? label(routeInfo) : this.intl.t(label);
  }
}
