import Route from '@ember/routing/route';

export default class DocsIndexRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
      scroll: {
        x: 400,
        y: 400,
      },
    }
  }
}
