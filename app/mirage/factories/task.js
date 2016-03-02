import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  'name'() { return faker.lorem.sentence(); },
  'startDate'() { return faker.date.past(); },
  'endDate'() { return faker.date.future(); },
  'bandHexValue': '#BB0000',
});
