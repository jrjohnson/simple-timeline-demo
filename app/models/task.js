import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import moment from 'moment';

const { computed } = Ember;

export default Model.extend({
  name: attr('string'),
  startDate: attr('date'),
  endDate: attr('date'),
  bandHexValue: attr('string'),
  durationInDays: computed('startDate', 'endDate', function(){
    const startDate = moment(this.get('startDate')),
          endDate = moment(this.get('endDate'));

    return endDate.diff(startDate, 'days');
  }),
});
