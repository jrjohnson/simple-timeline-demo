import Ember from 'ember';

const { Component, Handlebars, computed } = Ember;
const { SafeString, Utils } = Handlebars;
const { escapeExpression: escape } = Utils;
const { floor } = Math;

export default Component.extend({
  dayWidth: 100,
  task: null,
  classNames: ['timeline-task'],
  attributeBindings: ['style'],
  leftBy: 0,
  style: computed('leftBy', 'dayWidth', function(){
    const leftBy = this.get('leftBy');
    const dayWidth = floor(this.get('dayWidth'));
    const left = leftBy * dayWidth;
    return new SafeString(
       `left: ${escape(left)}px;
        width: ${escape(dayWidth)}px;`
    );
  }),
  bandStyle: computed('task.{durationInDays,bandHexValue}', 'dayWidth', function(){
    let duration = this.get('task.durationInDays');
    if (duration === 0) {
      return false;
    }
    const backgroundColor = this.get('task.bandHexValue');
    const dayWidth = this.get('dayWidth');
    const width = duration * dayWidth;

    return new SafeString(
      `background-color: ${escape(backgroundColor)};
      width: ${escape(width)}px;
      display: block;`
    );
  }),
});
