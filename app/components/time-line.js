import Ember from 'ember';
import moment from 'moment';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['time-line'],
  tasks: [],
  startDate: null,
  endDate: null,
  proxiedTasks: computed('tasks.@each.startDate', function(){
    const startDate = moment(this.get('startDate')),
          endDate = moment(this.get('endDate'));
    const daysOfCoverage = endDate.diff(startDate, 'days');

    return this.get('tasks').map(task => {
      let taskStartDate = moment(task.get('startDate'));
      let diff = taskStartDate.diff(startDate, 'days');
      let leftBy = diff/daysOfCoverage * 100;

      return {task, leftBy};
    });
  })
});
