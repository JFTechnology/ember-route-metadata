import Route from '@ember/routing/route';

export default class DocsComponentsTitleHelperRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
      title: true,
    }
  }
}
