import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  steps: null,
  firstDay: null,
  lastDay: null,
  totalDays: null,
  classNames: ['focus-timeline'],
  start: computed('firstDay', 'lastDay', function(){
    return [
      this.get('firstDay'),
      this.get('lastDay'),
    ];
  }),
  range: computed('steps', function(){
    return {
      'min': 0,
      'max': this.get('steps')
    };
  })
});
