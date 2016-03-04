import Ember from 'ember';
import moment from 'moment';

const { Controller, computed } = Ember;

export default Controller.extend({
  queryParams: ['start', 'end', 'focusStart', 'focusEnd'],
  start: moment().format('MMDDYYYY'),
  end: moment().add(14, 'days').format('MMDDYYYY'),
  focusStart: 0,
  focusEnd: 3,
  focusStartDate: computed('start', 'focusStart', function(){
    const startDate = moment(this.get('start'), 'MMDDYYYY'),
          focusStart = this.get('focusStart');

    return startDate.add(focusStart, 'days').format('MMDDYYYY');
  }),
  focusEndDate: computed('start', 'focusEnd', function(){
    const startDate = moment(this.get('start'), 'MMDDYYYY'),
          focusEnd = this.get('focusEnd');

    return startDate.add(focusEnd, 'days').format('MMDDYYYY');
  }),
  totalDays: computed('start', 'end', function(){
    const startDate = moment(this.get('start'), 'MMDDYYYY'),
          endDate = moment(this.get('end'), 'MMDDYYYY');

    return endDate.diff(startDate, 'days');
  }),
  actions: {
    changeFocus(arr){
      this.set('focusStart', arr[0]);
      this.set('focusEnd', arr[1]);
    }
  }
});
