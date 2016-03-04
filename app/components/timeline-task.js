import Ember from 'ember';

const { Component, Handlebars, computed } = Ember;
const { SafeString, Utils } = Handlebars;
const { escapeExpression: escape } = Utils;
const { floor } = Math;
const { reads } = computed;

export default Component.extend({
  dayWidth: 100,
  task: null,
  showLabel: false,
  classNames: ['timeline-task'],
  attributeBindings: ['style', 'title'],
  leftBy: 0,
  title: reads('task.name'),
  style: computed('leftBy', 'dayWidth', function(){
    const leftBy = this.get('leftBy');
    const dayWidth = floor(this.get('dayWidth'));
    const left = leftBy * dayWidth;
    const showLabel = this.get('showLabel');
    const zindex = showLabel?100:10;
    return new SafeString(
       `left: ${escape(left)}px;
        width: ${escape(dayWidth)}px;
        z-index: ${escape(zindex)};`
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
