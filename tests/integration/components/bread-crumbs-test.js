import {module, test} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {render} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bread-crumbs', function (hooks) {
  setupRenderingTest(hooks);

  test('Render #1', async function (assert) {

    await render(hbs`{{bread-crumbs}}`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('Render #2', async function (assert) {

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bread-crumbs}}
        template block text
      {{/bread-crumbs}}
    `);

    assert.equal(this.element.textContent.trim(), '');
  });
});
