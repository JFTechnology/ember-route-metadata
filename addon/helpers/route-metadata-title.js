import Helper from '@ember/component/helper';

import { inject as service } from '@ember-decorators/service';
import { observes } from '@ember-decorators/object';
import { getWithDefault } from '@ember/object';

export default class RouteMetadataTitle extends Helper {

  @service
  routeMetadata;

  @service
  intl;

  @observes('routeMetadata.currentRoute')
  onChange() {
    this.recompute();
  }

  compute() {

    try {
      const titleMetadata = this.routeMetadata.findCurrentMetadata('title');
      document.title = titleMetadata
        .map(r => getWithDefault(r, 'metadata.title.label', `route-metadata.${r.name}.page-title`))
        .map(label => this.intl.t(label))
        .join(' | ');
    } catch (error) {
      console.error(error);
    }
  }
}
