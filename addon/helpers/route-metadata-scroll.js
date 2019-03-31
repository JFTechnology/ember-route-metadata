import Helper from '@ember/component/helper';

import { getWithDefault } from '@ember/object';

import { inject as service } from '@ember-decorators/service';

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

  init() {
    super.init(...arguments);
    this.routeMetadata.on('metadata.scroll', this, 'recompute');
  }

  destroy() {
    this.routeMetadata.off('metadata.scroll', this, 'recompute');
    return super.destroy(...arguments);
  }

  compute() {

    // console.debug(`RouteMetadataScroll : compute`);

    try {

      const scrollMetadata = this.routeMetadata.findTransitionMetadata('scroll');

      if (scrollMetadata.length) {

        const metadata = scrollMetadata.pop();

        const x = getWithDefault(metadata, 'metadata.scroll.x', 0);
        const y = getWithDefault(metadata, 'metadata.scroll.y', 0);

        window.scrollTo(x, y);
      }

    } catch (error) {
      console.error(error);
    }
  }
}
