import {module, test} from 'qunit';
import {currentURL, visit} from '@ember/test-helpers';
import {setupApplicationTest} from 'ember-qunit';

module('Acceptance | bread-crumbs', function(hooks) {

  setupApplicationTest(hooks);

  test('visiting /docs/components/bread-crumbs', async function(assert) {
    await visit('/docs/components/bread-crumbs');
    assert.equal(currentURL(), '/docs/components/bread-crumbs');

    assert.equal(document.title, 'Route Metadata | Docs | Components');

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').textContent.trim(), 'Route Metadata demo app');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1) svg use').getAttribute('xlink:href'), '#home', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').textContent.trim(), 'Docs');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').textContent.trim(), 'Components');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').textContent.trim(), 'Bread crumbs');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(5)'), null);
  });

  test('visiting /docs/components/bread-crumbs-alt-component', async function(assert) {
    await visit('/docs/components/bread-crumbs-alt-component');
    assert.equal(currentURL(), '/docs/components/bread-crumbs-alt-component');

    assert.equal(document.title, 'Route Metadata | Docs | Components');

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').textContent.trim(), 'Route Metadata demo app');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1) svg use').getAttribute('xlink:href'), '#home', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').textContent.trim(), 'Docs');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').textContent.trim(), 'Components');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').textContent.trim(), 'Alternative component');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').getAttribute('class'), 'bread-crumb bread-crumb-custom text-warning');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4) svg use').getAttribute('xlink:href'), '#angle-double-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(5)'), null);
  });

  test('visiting /docs/components/bread-crumbs-alt-icon', async function(assert) {
    await visit('/docs/components/bread-crumbs-alt-icon');
    assert.equal(currentURL(), '/docs/components/bread-crumbs-alt-icon');

    assert.equal(document.title, 'Route Metadata | Docs | Components');


    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').textContent.trim(), 'Route Metadata demo app');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1) svg use').getAttribute('xlink:href'), '#home', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').textContent.trim(), 'Docs');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').textContent.trim(), 'Components');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').textContent.trim(), 'Alternative icon');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4) svg use').getAttribute('xlink:href'), '#edit');

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(5)'), null);
  });

  test('visiting /docs/components/bread-crumbs-function', async function(assert) {
    await visit('/docs/components/bread-crumbs-function');
    assert.equal(currentURL(), '/docs/components/bread-crumbs-function');

    assert.equal(document.title, 'Route Metadata | Docs | Components');

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').textContent.trim(), 'Route Metadata demo app');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(1) svg use').getAttribute('xlink:href'), '#home', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').textContent.trim(), 'Docs');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(2) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').textContent.trim(), 'Components');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(3) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').textContent.trim(), 'The \'bread-crumbs-function\' route');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4)').getAttribute('class'), 'bread-crumb');
    assert.equal(this.element.querySelector('.bread-crumb:nth-child(4) svg use').getAttribute('xlink:href'), '#chevron-right', "Icon value");

    assert.equal(this.element.querySelector('.bread-crumb:nth-child(5)'), null);
  });

});
