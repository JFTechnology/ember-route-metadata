import Route from '@ember/routing/route';

export default class DocsComponentsRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      scroll: true,
      title: true,
    };
  }
}
