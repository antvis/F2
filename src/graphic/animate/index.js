const Shape = require('../shape');
const Timeline = require('./timeline');
const Animator = require('./animator');

Shape.prototype.animate = function(timeline) {
  timeline = timeline || Timeline.getGlobalInstance();
  const attrs = this.get('attrs');
  return new Animator(this, attrs, timeline);
};

module.exports = {
  Timeline,
  Animator
};
