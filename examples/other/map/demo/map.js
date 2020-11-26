import F2 from '@antv/f2';
import '@antv/data-set';
const DataSet = window.DataSet;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/china-provinces.geo.json')
  .then(res => res.json())
  .then(GeoJSON => {
    const geoDv = new DataSet.View().source(GeoJSON, {
      type: 'GeoJSON'
    });

    const chart = new F2.Chart({
      id: 'container',
      padding: 0,
      pixelRatio: window.devicePixelRatio
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip(false);

    chart.source(geoDv.rows);
    chart.polygon()
      .position('longitude*latitude')
      .color('grey')
      .style({
        // opacity: 0.3
      });

    chart.render();
  });
