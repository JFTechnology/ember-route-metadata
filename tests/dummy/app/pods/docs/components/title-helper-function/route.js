import Route from '@ember/routing/route';

export default class DocsComponentsTitleHelperFunctionRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
      title: {
        label: this.label,
      },
    }
  }

  label(routeInfo) {
    return `The '${routeInfo.localName}' route`
  }
}
