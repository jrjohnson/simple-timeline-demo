import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  store: service(),
  model(){
    return this.get('store').findAll('task');
  }
});
