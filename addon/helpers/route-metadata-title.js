import Helper from '@ember/component/helper';

import { getWithDefault } from '@ember/object';

import { inject as service } from '@ember-decorators/service';

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

  init() {
    super.init(...arguments);
    this.routeMetadata.on('metadata.title', this, 'recompute');
  }

  destroy() {
    this.routeMetadata.off('metadata.title', this, 'recompute');
    return super.destroy(...arguments);
  }

  compute() {

    // console.debug(`RouteMetadataTitle : compute`);

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
