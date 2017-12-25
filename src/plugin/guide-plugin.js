const GuideController = require('./guide-controller');

module.exports = {
  afterInit(chart) {
    const guideController = new GuideController({
      frontPlot: chart.get('frontPlot'),
      backPlot: chart.get('backPlot')
    });
    chart.set('guideController', guideController);
    // chart.__proto__.guide = function() {
    //   return guideController;
    // };
  }
};
