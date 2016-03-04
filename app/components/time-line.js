import Ember from 'ember';
import moment from 'moment';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['time-line'],
  tasks: [],
  startDate: null,
  endDate: null,
  proxiedTasks: computed('startDate', 'endDate', 'tasks.@each.startDate', function(){
    const startDate = moment(this.get('startDate'), 'MMDDYYYY'),
          endDate = moment(this.get('endDate'), 'MMDDYYYY');
    const daysOfCoverage = endDate.diff(startDate, 'days');

    return this.get('tasks').filter(task => {
      let taskStartDate = moment(task.get('startDate'));

      return taskStartDate.isSameOrAfter(startDate, 'day') && taskStartDate.isSameOrBefore(endDate, 'day');
    }).map(task => {
      let taskStartDate = moment(task.get('startDate'));
      let diff = taskStartDate.diff(startDate, 'days');
      let leftBy = diff/daysOfCoverage * 100;

      return {task, leftBy};
    });
  })
});
