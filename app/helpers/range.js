import Ember from 'ember';
//modified from original at https://github.com/emberjs/ember.js/issues/10178#issuecomment-69364267

export function range(params/*, hash*/) {
  var start = params[0];
  var count = params[1];

  var ret = [];
  for(var i = 0; i < count; i++) {
    ret.push(i+start);
  }
  return ret;
}

export default Ember.Helper.helper(range);
