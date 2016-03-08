import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/start-mirage';
import Ember from 'ember';

moduleForComponent('task-set', 'Integration | Component | task set', {
  integration: true,
  setup(){
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  let task1 = server.create('task', {
    name: 'task1',
    startDate: new Date(2016, 2, 7),
    endDate: new Date(2016, 2, 7)
  });
  let task2 = server.create('task', {
    name: 'task2',
    startDate: new Date(2016, 2, 7),
    endDate: new Date(2016, 2, 8)
  });

  const tasks = [task1, task2].map(obj => Ember.Object.create(obj));
  this.set('tasks', tasks);

  this.render(hbs`{{task-set tasks=tasks}}`);

  assert.equal(this.$('tr:eq(1) input:eq(0)').val(), 'task1');
  assert.equal(this.$('tr:eq(2) input:eq(0)').val(), 'task2');
});
