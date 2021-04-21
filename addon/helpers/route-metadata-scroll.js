import Helper from '@ember/component/helper';

import {inject as service} from '@ember/service';

const METADATA_KEY = 'scroll';

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

  constructor() {
    super(...arguments);
    this.routeMetadata.on('metadata.scroll', this, 'recompute');
  }

  willDestroy() {
    this.routeMetadata.off('metadata.scroll', this, 'recompute');
    super.willDestroy();
  }

  compute() {

    const routeInfos = this.routeMetadata.findTransitionRouteInfos(METADATA_KEY);

    if (routeInfos.length) {

      const metadata = routeInfos.pop();

      let left = metadata?.metadata?.scroll?.left || metadata?.metadata?.scroll?.x || 0;
      let top = metadata?.metadata?.scroll?.top || metadata?.metadata?.scroll?.y || 0;
      let behavior = metadata?.metadata?.scroll?.behavior || 'instant';

      window.scrollTo({
        left,
        top,
        behavior,
      });
    }
  }
}
