const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue-145';
document.body.appendChild(canvas);

describe('issue 145', function() {
  it('calculate padding after changeData', function(done) {
    const data = [
      { v: 4.23522199232294, t: '200712', d: [] },
      { v: 2.0151284870657586, t: '200812', d: [] },
      { v: 1.6620529861132147, t: '200912', d: [] },
      { v: 1.6307270090611798, t: '201012', d: [] },
      { v: 1.4605288862176948, t: '201112', d: [] },
      { v: 1.750786448716753, t: '201212', d: [] },
      { v: 1.868136022569796, t: '201312', d: [] },
      { v: 1.9483671461560066, t: '201412', d: [] },
      { v: 1.593410479963614, t: '201512', d: [] },
      { v: 1.8723399874677855, t: '201612', d: [] }
    ];
    const chart = new F2.Chart({
      id: 'issue-145',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.interval().position('t*v');
    chart.render();
    expect(chart.get('padding')).to.equal('auto');
    expect(parseInt(chart.get('_padding')[3])).to.eql(28);


    const newData = [
      { v: 54608526.76, t: '200712', d: [] },
      { v: 58855753.35, t: '200812', d: [] },
      { v: 54831754.93, t: '200912', d: [] },
      { v: 101555431.08, t: '201012', d: [] },
      { v: 110071007.52, t: '201112', d: [] },
      { v: 124981422.41, t: '201212', d: [] },
      { v: 20454541.66, t: '201312', d: [] },
      { v: 42791262.47, t: '201412', d: [] },
      { v: 890537.83, t: '201512', d: [] },
      { v: 32491724.85, t: '201612', d: [] }
    ];

    setTimeout(function() {
      chart.changeData(newData);
      expect(chart.get('padding')).to.equal('auto');
      expect(parseInt(chart.get('_padding')[3])).to.eql(72);
      chart.repaint();
      expect(chart.get('_padding')).not.to.be.null;
      expect(parseInt(chart.get('_padding')[3])).to.eql(72);

      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 500);

  });
});
