import Route from '@ember/routing/route';

export default class DocsComponentsBreadcrumbsRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
    };
  }
}
