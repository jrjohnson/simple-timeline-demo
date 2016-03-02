import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  'name'() { return faker.lorem.sentence(); },
  'start-date'() { return faker.date.past(); },
  'end-date'() { return faker.date.future(); },
  'band-hex-value': '#BB0000',
});
