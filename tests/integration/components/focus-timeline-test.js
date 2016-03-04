import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('focus-timeline', 'Integration | Component | focus timeline', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{focus-timeline}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#focus-timeline}}
      template block text
    {{/focus-timeline}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
