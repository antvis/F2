const expect = require('chai').expect;
require('../../../src/interaction/pie-select');
const F2 = require('../../../src/core');
require('../../../src/geom/interval');
require('../../../src/geom/adjust/stack');
require('../../../src/coord/polar');
const { gestureSimulator } = require('../test-util');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'pieSelect';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('Pie-Select', function() {
  const data = [
    { name: '芳华', percent: 0.4, a: '1' },
    { name: '妖猫传', percent: 0.2, a: '1' },
    { name: '机器之血', percent: 0.18, a: '1' },
    { name: '心理罪', percent: 0.15, a: '1' },
    { name: '寻梦环游记', percent: 0.05, a: '1' },
    { name: '其他', percent: 0.12, a: '1' }
  ];
  it('Register successfully', function() {
    const Chart = F2.Chart;
    expect(Chart._Interactions['pie-select']).not.to.be.undefined;
  });

  it('default selected', function() {
    const chart = new F2.Chart({
      id: 'pieSelect',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
      innerRadius: 0.618
    });
    chart.axis(false);
    chart
      .interval()
      .position('a*percent')
      .color('name')
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      });
    chart.render();

    chart.interaction('pie-select', {
      startEvent: 'touchstart',
      cancelable: true,
      defaultSelected: { name: '妖猫传', percent: 0.2, a: '1' }
    });

    const interaction = chart._interactions['pie-select'];
    const { halo, lastShape } = interaction;

    expect(halo).not.to.be.empty;
    expect(lastShape.get('origin')._origin.name).to.equal('妖猫传');

    chart.destroy();
  });

  it('touchstart', function() {
    let preStartCalled;
    let onStartCalled;
    let preEndCalled;
    let onEndCalled;
    let selectInfo;
    const chart = new F2.Chart({
      id: 'pieSelect',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
      innerRadius: 0.618
    });
    chart.axis(false);
    chart
      .interval()
      .position('a*percent')
      .color('name')
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      });
    chart.render();

    chart.interaction('pie-select', {
      startEvent: 'touchstart',
      cancelable: true,
      preStart() {
        preStartCalled = true;
      },
      onStart() {
        onStartCalled = true;
      },
      preEnd() {
        preEndCalled = true;
      },
      onEnd(ev) {
        onEndCalled = true;
        selectInfo = ev;
      }
    });

    gestureSimulator(canvas, 'touchstart', {
      clientX: 394.6130065917969,
      clientY: 256.10699462890625
    });
    gestureSimulator(canvas, 'touchend', {
      clientX: 394.6130065917969,
      clientY: 256.10699462890625
    });

    expect(preStartCalled).to.be.true;
    expect(preEndCalled).to.be.true;
    expect(onStartCalled).to.be.true;
    expect(onEndCalled).to.be.true;
    expect(selectInfo).not.to.be.undefined;
    expect(selectInfo.selected).to.be.true;
    expect(selectInfo.data).to.eql({ name: '芳华', percent: 0.4, a: '1' });

    const interaction = chart._interactions['pie-select'];
    expect(selectInfo.shape).to.eql(interaction.selectedShape);
    expect(interaction.halo).not.to.be.undefined;
    expect(interaction.halo.get('destroyed')).to.be.false;

    // cancelable: true 允许取消选中，在同一个点点击
    gestureSimulator(canvas, 'touchstart', {
      clientX: 394.6130065917969,
      clientY: 256.10699462890625
    });
    gestureSimulator(canvas, 'touchend', {
      clientX: 394.6130065917969,
      clientY: 256.10699462890625
    });
    expect(selectInfo).not.to.be.undefined;
    expect(selectInfo.selected).to.be.false;
    expect(selectInfo.data).to.eql({ name: '芳华', percent: 0.4, a: '1' });
    expect(interaction.lastShape).to.be.null;
    expect(interaction.halo).not.to.be.undefined;
    expect(interaction.halo.get('destroyed')).to.be.true;

    chart.destroy();
  });

  it('tap', function(done) {
    const chart = new F2.Chart({
      id: 'pieSelect',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
      innerRadius: 0.618
    });
    chart.axis(false);
    chart
      .interval()
      .position('a*percent')
      .color('name')
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      });
    chart.render();
    chart.interaction('pie-select', {
      startEvent: 'tap',
      cancelable: false
    });

    // 第一次点击未击中扇形
    const interaction = chart._interactions['pie-select'];
    interaction.start({
      type: 'center',
      center: {
        x: 299,
        y: 272
      }
    });

    expect(interaction.selected).to.be.false;
    expect(interaction.selectedShape).to.be.null;
    expect(interaction.halo).to.be.undefined;

    // 此次击中
    interaction.start({
      type: 'tap',
      center: {
        x: 174,
        y: 411
      }
    });
    expect(interaction.selected).to.be.true;
    expect(interaction.selectedShape).not.to.be.null;
    expect(interaction.selectedShape.get('origin')._origin).to.eql({ name: '机器之血', percent: 0.18, a: '1' });
    expect(interaction.halo).not.to.be.undefined;

    setTimeout(() => {
      // 再次击中，不取消选中
      interaction.start({
        type: 'tap',
        center: {
          x: 174,
          y: 411
        }
      });
      expect(interaction.selected).to.be.true;
      expect(interaction.selectedShape).not.to.be.null;
      expect(interaction.selectedShape.get('origin')._origin).to.eql({ name: '机器之血', percent: 0.18, a: '1' });
      expect(interaction.halo).not.to.be.undefined;
      expect(interaction.halo.get('destroyed')).to.be.false;
      chart.destroy();
      done();
    }, 300);
  });

  it('changeData', function(done) {
    const chart = new F2.Chart({
      id: 'pieSelect',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
      innerRadius: 0.618
    });
    chart.axis(false);
    chart
      .interval()
      .position('a*percent')
      .color('name')
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
      });

    chart.render();
    chart.interaction('pie-select', {
      startEvent: 'tap',
      cancelable: false
    });

    // 此次击中
    const interaction = chart._interactions['pie-select'];
    interaction.start({
      type: 'tap',
      center: {
        x: 174,
        y: 411
      }
    });
    expect(interaction.selected).to.be.true;
    expect(interaction.selectedShape).not.to.be.null;
    expect(interaction.selectedShape.get('origin')._origin).to.eql({
      name: '机器之血',
      percent: 0.18,
      a: '1'
    });
    expect(interaction.halo).not.to.be.undefined;

    setTimeout(() => {
      chart.changeData([
        { name: '心理罪', percent: 0.15, a: '1' },
        { name: '寻梦环游记', percent: 0.05, a: '1' }
      ]);

      expect(interaction.selected).to.be.false;
      expect(interaction.selectedShape).to.be.null;
      expect(interaction.lastShape).to.be.null;
      expect(interaction.halo).to.be.null;

      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 250);
  });
});
