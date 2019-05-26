import Helper from '@ember/component/helper';

import { getWithDefault } from '@ember/object';

import { inject as service } from '@ember/service';

/**
 * Helper that listens to the RouteMetadata service for 'metadata.scroll' events and calls the window.scrollTo(x,y) method accordingly.
 *
 * Can be added as {{route-metadata-scroll}} to the application template.
 *
 * @class RouteMetadataScroll
 * @public
 */
export default class RouteMetadataScroll extends Helper {

  @service
  routeMetadata;

  /**
   * The metadata key to listen for.
   * @property {string}
   */
  metadataKey = 'scroll';

  init() {
    super.init(...arguments);
    this.routeMetadata.on(`metadata.${this.metadataKey}`, this, 'recompute');
  }

  destroy() {
    this.routeMetadata.off(`metadata.${this.metadataKey}`, this, 'recompute');
    return super.destroy(...arguments);
  }

  compute() {

    const routeInfos = this.routeMetadata.findCurrentMetadata(this.metadataKey);

    if (routeInfos.length) {

      const metadata = routeInfos.pop();

      const x = getWithDefault(metadata, `metadata.${this.metadataKey}.x`, 0);
      const y = getWithDefault(metadata, `metadata.${this.metadataKey}.y`, 0);

      window.scrollTo(x, y);
    }
  }
}
