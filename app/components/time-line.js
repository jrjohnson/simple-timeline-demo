import Ember from 'ember';
import moment from 'moment';
import ResizeAware from 'ember-resize/mixins/resize-aware';

const { Component, computed, run } = Ember;

export default Component.extend(ResizeAware, {
  init(){
    this._super();
    run.later(() => {
      this.set('width', this.$().innerWidth());
    });
  },
  classNames: ['time-line'],
  tasks: [],
  startDate: null,
  endDate: null,
  width: null,
  daysOfCoverage: computed('startDate', 'endDate', function(){
    const startDate = moment(this.get('startDate'), 'MMDDYYYY'),
          endDate = moment(this.get('endDate'), 'MMDDYYYY');
      return endDate.diff(startDate, 'days');
  }),
  widthOfADay: computed('daysOfCoverage', 'width', function(){
    const daysOfCoverage = this.get('daysOfCoverage'),
          width = parseInt(this.get('width'));

    if (!width) {
      return 1;
    }

    return width / daysOfCoverage;
  }),
  proxiedTasks: computed('startDate', 'endDate', 'tasks.@each.startDate', function(){
    const startDate = moment(this.get('startDate'), 'MMDDYYYY'),
          endDate = moment(this.get('endDate'), 'MMDDYYYY');

    return this.get('tasks').filter(task => {
      let taskStartDate = moment(task.get('startDate'));

      return taskStartDate.isSameOrAfter(startDate, 'day') && taskStartDate.isSameOrBefore(endDate, 'day');
    }).map(task => {
      let taskStartDate = moment(task.get('startDate'));
      let leftBy = taskStartDate.diff(startDate, 'days');

      return {task, leftBy};
    });
  }),
  didResize(width, height, evt) {
    this.set('width', this.$().innerWidth());
  }
});
