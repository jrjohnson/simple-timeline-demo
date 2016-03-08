import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForComponent('new-task-editor', 'Integration | Component | new task editor', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{new-task-editor}}`);
  assert.equal(this.$('tr').length, 1);
  assert.equal(this.$('td').length, 6);

});

test('dont save until all required fields are completed', function(assert) {
  this.render(hbs`{{new-task-editor}}`);
  assert.equal(this.$('button.save').length, 0);
  this.$('input:eq(0)').val('title');
  this.$('input:eq(0)').keyup();
  let interactor1 = openDatepicker(this.$('input:eq(1)'));
  interactor1.selectDate(new Date(2016, 2, 7));
  let interactor2 = openDatepicker(this.$('input:eq(2)'));
  interactor2.selectDate(new Date(2016, 2, 8));
  assert.equal(this.$('button.save').length, 1);

});

test('only show band picker when start and end dates are different', function(assert) {
  this.render(hbs`{{new-task-editor}}`);
  let interactor1 = openDatepicker(this.$('input:eq(1)'));
  interactor1.selectDate(new Date(2016, 2, 7));
  let interactor2 = openDatepicker(this.$('input:eq(2)'));
  interactor2.selectDate(new Date(2016, 2, 7));
  assert.equal(this.$('select').length, 0);
  interactor2.selectDate(new Date(2016, 2, 8));
  assert.equal(this.$('select').length, 1);
});
