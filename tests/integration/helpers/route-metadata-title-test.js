import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | route-metadata-title', function(hooks) {
  setupRenderingTest(hooks);

  test('Test no output', async function(assert) {

    await render(hbs`{{route-metadata-title}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
