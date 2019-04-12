import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | route-metadata-scroll', function(hooks) {
  setupRenderingTest(hooks);

  test('Test no output', async function(assert) {

    await render(hbs`{{route-metadata-scroll}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
