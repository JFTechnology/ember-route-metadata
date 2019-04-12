import BreadCrumb from '@jftechnology/ember-route-metadata/components/bread-crumbs/bread-crumb';

import { classNames } from '@ember-decorators/component';

/**
 * @class CustomerBreadCrumb
 * @public
 */
@classNames('bread-crumb-custom')
export default class CustomerBreadCrumb extends BreadCrumb {

  altText = 'Alternative component';

}
