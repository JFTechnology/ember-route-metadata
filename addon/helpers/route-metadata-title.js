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

  /**
   * The metadata key to listen for.
   * @type {string}
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

    const routeInfos = this.routeMetadata.findCurrentMetadata(this.metadataKey);

    document.title = routeInfos
      .map(r => getWithDefault(r, `metadata.${this.metadataKey}.label`, `route-metadata.${r.name}.page-title`))
      .map(label => this.intl.t(label))
      .join(' | ');
  }
}
