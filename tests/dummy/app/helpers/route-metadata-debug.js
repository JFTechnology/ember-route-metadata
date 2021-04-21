import Helper from '@ember/component/helper';

import {inject as service} from '@ember/service';

export default class RouteMetadataDebug extends Helper {

  @service
  routeMetadata;

  constructor() {
    super(...arguments);
    this.routeMetadata.on('metadata.breadcrumb', this, 'onEvent');
    this.routeMetadata.on('metadata.scroll', this, 'onEvent');
    this.routeMetadata.on('metadata.title', this, 'onEvent');
  }

  willDestroy() {
    this.routeMetadata.off('metadata.breadcrumb', this, 'onEvent');
    this.routeMetadata.off('metadata.scroll', this, 'onEvent');
    this.routeMetadata.off('metadata.title', this, 'onEvent');
    super.willDestroy();
  }

  onEvent(key, transition) {
    console.log('RouteMetadataDebug onEvent', key, transition);
    console.log('RouteMetadataDebug findPreviousRouteInfos', this.routeMetadata.findPreviousRouteInfos(key));
    console.log('RouteMetadataDebug findCurrentRouteInfos', this.routeMetadata.findCurrentRouteInfos(key));
    console.log('RouteMetadataDebug findTransitionRouteInfos', this.routeMetadata.findTransitionRouteInfos(key));
    this.recompute();
  }

  compute() {
    console.debug('RouteMetadataDebug : compute');
  }
}
