import Ember from 'ember';

const { Component, Handlebars, computed } = Ember;
const { SafeString, Utils } = Handlebars;
const { escapeExpression: escape } = Utils;

export default Component.extend({
  classNames: ['timeline-task'],
  attributeBindings: ['style'],
  leftBy: 0,
  style: computed(function(){
    const leftBy = this.get('leftBy');
    return new SafeString(
       `left: ${escape(leftBy)}%;`
    );
  })
});
