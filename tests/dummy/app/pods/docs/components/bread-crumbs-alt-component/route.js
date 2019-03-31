import Route from '@ember/routing/route';

export default class DocsComponentsBreadcrumbsAltComponentRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: {
        component: 'custom-bread-crumb',
      },
    }
  }
}
