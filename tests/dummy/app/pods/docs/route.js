import Route from '@ember/routing/route';

export default class DocsRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
      title: true,
    };
  }
}
