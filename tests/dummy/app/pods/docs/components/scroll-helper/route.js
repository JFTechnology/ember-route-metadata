import Route from '@ember/routing/route';

export default class DocsComponentsScrollHelperRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
      scroll: true,
      title: true,
    };
  }
}
