import Ember from 'ember';
import moment from 'moment';

const { Component, computed, isPresent } = Ember;

export default Component.extend({
  tagName: 'tr',
  didReceiveAttrs(){
    this._super(...arguments);
    const task = this.get('task');
    this.set('name', task.get('name'));
    this.set('startDate', task.get('startDate'));
    this.set('endDate', task.get('endDate'));
    this.set('bandHexValue', task.get('bandHexValue'));
  },
  name: null,
  startDate: null,
  endDate: null,
  bandHexValue: null,
  durationInDays: computed('startDate', 'endDate', function(){
    const startDate = moment(this.get('startDate')),
          endDate = moment(this.get('endDate'));
    return endDate.diff(startDate, 'days');
  }),
  hexValueOptions: ['#000000', '#BB0000', '#00BB00', '#0000BB'],
  showSaveButton: computed('name', 'startDate', 'endDate', 'bandHexValue', function(){
    let task = this.get('task');
    let keysWithChangeValues = ['name', 'startDate', 'endDate', 'bandHexValue'].filter(key => {
      return this.get(key) !== task.get(key);
    });

    return keysWithChangeValues.length > 0;
  }),
  actions: {
    changeDuration(days){
      if (isPresent(days)) {
        const startDate = moment(this.get('startDate'));
        const endDate = startDate.add(days, 'days').toDate();
        this.set('endDate', endDate);
      }
    }
  }
});
