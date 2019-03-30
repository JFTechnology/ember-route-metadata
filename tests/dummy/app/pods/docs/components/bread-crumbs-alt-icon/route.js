import Route from '@ember/routing/route';

export default class DocsComponentsBreadcrumbsAltIconRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: {
        icon: 'fa fa-pencil fa-fw',
      },
    }
  }
}
