import Route from '@ember/routing/route';

import { inject as service } from '@ember-decorators/service';

export default class ApplicationRoute extends Route {

  @service
  intl;

  beforeModel(transition) {
    super.beforeModel(transition);

    // Define the runtime locale.
    // See ember-intl addon for full details.
    this.intl.setLocale('en-gb');
  }

  /**
   * Metadata for the application route segment.
   */
  buildRouteInfoMetadata() {
    return {
      title: true,
      breadcrumb: {
        icon: 'fa fa-home fa-fw'
      },
    }
  }
}
