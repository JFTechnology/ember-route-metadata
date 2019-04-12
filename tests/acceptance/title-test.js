import { module, test } from 'qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | route-metadata-title helper', function(hooks) {

  setupApplicationTest(hooks);

  test('visiting /docs/components/title-helper', async function(assert) {
    await visit('/docs/components/title-helper');
    assert.equal(currentURL(), '/docs/components/title-helper');
    assert.equal(document.title, 'Route Metadata | Docs | Components | Title');
  });

  test('visiting /docs/components/title-helper-alt-label', async function(assert) {
    await visit('/docs/components/title-helper-alt-label');
    assert.equal(currentURL(), '/docs/components/title-helper-alt-label');
    assert.equal(document.title, 'Route Metadata | Docs | Components | Alternative label');
  });

  test('visiting /docs/components/title-helper-function', async function(assert) {
    await visit('/docs/components/title-helper-function');
    assert.equal(currentURL(), '/docs/components/title-helper-function');
    assert.equal(document.title, 'Route Metadata | Docs | Components | The \'title-helper-function\' route');
  });

});
