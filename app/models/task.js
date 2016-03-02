import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr('string'),
  startDate: attr('date'),
  endDate: attr('date'),
  bandHexValue: attr('string'),
});
