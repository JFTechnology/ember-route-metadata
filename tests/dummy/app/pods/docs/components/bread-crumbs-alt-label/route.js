import Route from '@ember/routing/route';

export default class DocsComponentsBreadcrumbsAltLabelRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: {
        label: 'alt-label',
      },
    }
  }
}
