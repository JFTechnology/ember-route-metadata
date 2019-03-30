import Route from '@ember/routing/route';

export default class DocsComponentsBreadcrumbsFunctionRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: {
        label: this.label,
      },
    }
  }

  label(routeInfo) {
    return `The '${routeInfo.localName}' route`
  }
}
