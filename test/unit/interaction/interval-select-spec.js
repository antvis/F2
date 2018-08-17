const expect = require('chai').expect;
require('../../../src/interaction/interval-select');
const F2 = require('../../../src/core');
require('../../../src/geom/interval');
const { gestureSimulator } = require('../test-util');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'intervalSelect';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('Interval-Select', function() {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 }
  ];

  it('Register successfully', function() {
    const Chart = F2.Chart;
    expect(Chart._Interactions['interval-select']).not.to.be.undefined;
  });

  it('defaultSelected', function() {
    const chart = new F2.Chart({
      id: 'intervalSelect',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.interval().position('year*sales');
    chart.render();

    chart.interaction('interval-select', {
      startEvent: 'touchstart',
      defaultSelected: { year: '1956 年', sales: 61 }
    });

    const interaction = chart._interactions['interval-select'];
    const { selectedAxisShape, selectedShape } = interaction;

    expect(selectedAxisShape.attr('text')).to.equal('1956 年');
    expect(selectedShape.get('origin')._origin.year).to.equal('1956 年');

    chart.destroy();
  });

  it('touch', function() {
    let selectData;
    let selected;
    let onStartCalled;
    let onEndCalled;
    const chart = new F2.Chart({
      id: 'intervalSelect',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.interval().position('year*sales');
    chart.interaction('interval-select', {
      startEvent: 'touchstart',
      onStart(e) {
        onStartCalled = true;
        selected = e.selected;
      },
      onEnd(e) {
        onEndCalled = true;
        selectData = e.data;
      }
    });
    chart.render();

    gestureSimulator(canvas, 'touchstart', {
      clientX: 175.09300231933594,
      clientY: 410.2929992675781
    });
    gestureSimulator(canvas, 'touchend', {
      clientX: 175.09300231933594,
      clientY: 410.2929992675781
    });

    expect(onStartCalled).to.be.true;
    expect(onEndCalled).to.be.true;
    expect(selected).to.be.true;
    expect(selectData).to.eql({ year: '1956 年', sales: 61 });
    onStartCalled = false;
    onEndCalled = false;
    // 可被取消选中
    gestureSimulator(canvas, 'touchstart', {
      clientX: 175.09300231933594,
      clientY: 410.2929992675781
    });
    gestureSimulator(canvas, 'touchend', {
      clientX: 175.09300231933594,
      clientY: 410.2929992675781
    });
    expect(onStartCalled).to.be.true;
    expect(onEndCalled).to.be.true;
    expect(selected).to.be.undefined;
    expect(selectData).to.be.undefined;

    // 点击非 shape 区域
    gestureSimulator(canvas, 'touchstart', {
      clientX: 175.09300231933594,
      clientY: 100.2929992675781
    });
    expect(onStartCalled).to.be.true;
    expect(onEndCalled).to.be.true;
    expect(selected).to.be.undefined;
    expect(selectData).to.be.undefined;

    chart.destroy();
  });

  it('tap', function() {
    const chart = new F2.Chart({
      id: 'intervalSelect',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.interval().position('year*sales');
    chart.interaction('interval-select', {
      mode: 'range',
      cancelable: false
    });
    chart.render();

    const interaction = chart._interactions['interval-select'];
    const eventObj = {
      type: 'tap',
      center: {
        x: 456,
        y: 480
      }
    };
    interaction.start(eventObj);
    expect(eventObj.selected).to.be.true;
    expect(eventObj.data).to.eql({ year: '1962 年', sales: 38 });

    // cancelable: false, 同一个点重新击中，仍处于选中状态
    const eventObj1 = {
      type: 'tap',
      center: {
        x: 456,
        y: 480
      }
    };
    interaction.start(eventObj1);
    expect(eventObj1.selected).to.be.true;
    expect(eventObj1.data).to.eql({ year: '1962 年', sales: 38 });
    expect(interaction.selectedShape).to.eql(eventObj1.shape);

    interaction.reset();
    expect(interaction.selectedShape).to.be.null;
    expect(interaction.selectedAxisShape).to.be.null;

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
