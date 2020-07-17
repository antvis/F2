/**
 * filter the data out of scale' range
 */
import { each, isNumber, toTimeStamp } from '../util/common';

function beforeGeomInit(chart) {
  chart.set('limitInPlot', true);

  const data = chart.get('filteredData');
  const colDefs = chart.get('colDefs');
  if (!colDefs) return data;

  const geoms = chart.get('geoms');
  let isSpecialGeom = false;
  // TODO
  each(geoms, geom => {
    if ([ 'area', 'line', 'path' ].indexOf(geom.get('type')) !== -1) {
      isSpecialGeom = true;
      return false;
    }
  });

  const fields = [];
  each(colDefs, (def, key) => {
    if (!isSpecialGeom && def && (def.values || def.min || def.max)) {
      fields.push(key);
    }
  });

  if (fields.length === 0) {
    return data;
  }

  const geomData = [];
  each(data, obj => {
    let flag = true;
    each(fields, field => {
      let value = obj[field];
      if (value) {
        const colDef = colDefs[field];
        if (colDef.type === 'timeCat') {
          const values = colDef.values;
          if (isNumber(values[0])) {
            value = toTimeStamp(value);
          }
        }

        if ((colDef.values && colDef.values.indexOf(value) === -1)
          || (colDef.min && (value < colDef.min))
          || (colDef.max && (value > colDef.max))) {
          flag = false;
        }
      }
    });
    if (flag) {
      geomData.push(obj);
    }
  });

  chart.set('filteredData', geomData);
}

export {
  beforeGeomInit
};
