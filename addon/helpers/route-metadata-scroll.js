import Helper from '@ember/component/helper';

import { getWithDefault } from '@ember/object';

import { inject as service } from '@ember-decorators/service';
import { observes } from '@ember-decorators/object';

export default class RouteMetadataScroll extends Helper {

  @service
  routeMetadata;

  @observes('routeMetadata.currentRoute')
  onChange() {
    this.recompute();
  }

  compute() {

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
