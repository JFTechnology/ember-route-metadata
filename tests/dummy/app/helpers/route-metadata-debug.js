import Helper from '@ember/component/helper';

import { inject as service } from '@ember-decorators/service';

export default class RouteMetadataDebug extends Helper {

  @service
  routeMetadata;

  init() {
    super.init(...arguments);

    this.routeMetadata.on('metadata.breadcrumb', this, 'onEvent');
    this.routeMetadata.on('metadata.scroll', this, 'onEvent');
    this.routeMetadata.on('metadata.title', this, 'onEvent');
  }

  destroy() {

    this.routeMetadata.off('metadata.breadcrumb', this, 'onEvent');
    this.routeMetadata.off('metadata.scroll', this, 'onEvent');
    this.routeMetadata.off('metadata.title', this, 'onEvent');

    return super.destroy(...arguments);
  }

  onEvent(key, transition) {
    console.debug(`RouteMetadataDebug onEvent : ${key} : ${transition}`);
    this.recompute();
  }

  compute() {

    console.debug(`RouteMetadataDebug : compute`);
  }
}
