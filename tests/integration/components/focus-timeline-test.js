import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('focus-timeline', 'Integration | Component | focus timeline', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  this.set('steps', 5);
  this.on('changeFocus', parseInt);
  this.render(hbs`{{focus-timeline steps=5 firstDay=1 lastDay=3 changeFocus=(action 'changeFocus')}}`);

  return wait().then(() => {
    assert.equal(this.$('.noUi-handle').length, 2);
  });
});
