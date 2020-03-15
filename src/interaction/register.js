import { each } from '../util/common';
const Chart = require('../chart/chart');

Chart._Interactions = {};
Chart.registerInteraction = function(type, constructor) {
  Chart._Interactions[type] = constructor;
};
Chart.getInteraction = function(type) {
  return Chart._Interactions[type];
};

Chart.prototype.interaction = function(type, cfg) {
  const interactions = this._interactions || {};
  if (interactions[type]) { // if reprated, destroy last
    interactions[type].destroy();
  }
  const Ctor = Chart.getInteraction(type);
  const interact = new Ctor(cfg, this);
  interactions[type] = interact;
  this._interactions = interactions;
  return this;
};

Chart.prototype.clearInteraction = function(type) {
  const interactions = this._interactions;
  if (!interactions) return;
  if (type) {
    interactions[type] && interactions[type].destroy();
    delete interactions[type];
  } else {
    each(interactions, (interaction, key) => {
      interaction.destroy();
      delete interactions[key];
    });
  }

  return this;
};

export default Chart;
