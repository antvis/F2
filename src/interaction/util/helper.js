module.exports = {
  directionEnabled: (mode, dir) => {
    if (mode === undefined) {
      return true;
    } else if (typeof mode === 'string') {
      return mode.indexOf(dir) !== -1;
    }

    return false;
  },
  getColDef(chart, field) {
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }
    return colDef;
  },
  _getFieldRange(scale, limitRange) {
    const { type } = scale;
    let minRatio = 0;
    let maxRatio = 0;
    if (type === 'linear') {
      const { min, max } = limitRange;
      minRatio = (scale.min - min) / (max - min);
      maxRatio = (scale.max - min) / (max - min);
    } else {
      const originValues = limitRange;
      const values = scale.values;
      const firstIndex = originValues.indexOf(values[0]);
      const lastIndex = originValues.indexOf(values[values.length - 1]);
      minRatio = firstIndex / (originValues.length - 1);
      maxRatio = lastIndex / (originValues.length - 1);
    }
    return [ minRatio, maxRatio ];
  }
};
