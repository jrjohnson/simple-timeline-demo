import Ember from 'ember';
import moment from 'moment';

const { Component, computed, isPresent, inject } = Ember;
const { service } = inject;

export default Component.extend({
  store: service(),
  tagName: 'tr',
  isSaving: false,
  name: null,
  startDate: null,
  endDate: null,
  bandHexValue: null,
  hexValueOptions: ['#000000', '#BB0000', '#00BB00', '#0000BB'],
  showSaveButton: computed('name', 'startDate', 'endDate', 'isSaving', function(){
    if (this.get('isSaving')) {
      return true;
    }
    let filledRequiredKeys = ['name', 'startDate', 'endDate'].filter(key => {
      return isPresent(this.get(key));
    });

    return filledRequiredKeys.length === 3;
  }),
  durationInDays: computed('startDate', 'endDate', function(){
    const startDate = moment(this.get('startDate')),
          endDate = moment(this.get('endDate'));

    let diff = endDate.diff(startDate, 'days');

    return isNaN(diff)?0:diff;
  }),
  actions: {
    changeDuration(days){
      if (isPresent(days)) {
        const startDate = moment(this.get('startDate'));
        const endDate = startDate.add(days, 'days').toDate();
        this.set('endDate', endDate);
      }
    },
    save(){
      this.set('isSaving', true);
      let task = this.get('store').createRecord('task');
      task.set('name', this.get('name'));
      task.set('startDate', this.get('startDate'));
      task.set('endDate', this.get('endDate'));
      task.set('bandHexValue', this.get('bandHexValue'));
      this.set('name', null);
      this.set('startDate', null);
      this.set('endDate', null);
      this.set('bandHexValue', null);
      task.save().then(() => {
        this.set('isSaving', false);
      });
    }
  }
});
