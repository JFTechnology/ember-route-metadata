import Route from '@ember/routing/route';

export default class DocsComponentsTitleHelperAltLabelRoute extends Route {

  buildRouteInfoMetadata() {
    return {
      breadcrumb: true,
      title: {
        label: 'alt-label',
      },
    }
  }
}
