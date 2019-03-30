import Route from '@ember/routing/route';

export default class DocsComponentsRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
      scroll: true,
      title: true,
    }
  }
}
