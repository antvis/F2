const F2 = require('../../index');

describe('polar', () => {
  describe('normal pie', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'pie';

    document.body.appendChild(canvas);
    const data = [
      { a: '1', b: 0.3, c: '1' },
      { a: '1', b: 0.3, c: '2' },
      { a: '1', b: 0.4, c: '3' }
    ];
    const chart = new F2.Chart({
      id: 'pie'
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true
    });
    chart.axis(false);
    chart.interval().position('a*b')
      .color('c')
      .adjust('stack');
    chart.render();
  });

  describe('ring', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'ring';

    document.body.appendChild(canvas);
    const data = [
      { a: '1', b: 0.3, c: '1' },
      { a: '1', b: 0.3, c: '2' },
      { a: '1', b: 0.4, c: '3' }
    ];
    const chart = new F2.Chart({
      id: 'ring'
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      inner: 0.6
    });
    chart.axis(false);
    chart.interval().position('a*b')
      .color('c')
      .adjust('stack');
    chart.render();
  });

  describe('nest', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'nest';

    document.body.appendChild(canvas);
    const data = [
      { a: '1', b: 0.2, c: '1' },
      { a: '2', b: 0.5, c: '1' },
      { a: '3', b: 0.4, c: '1' },
      { a: '1', b: 0.8, c: '2' },
      { a: '2', b: 0.5, c: '2' },
      { a: '3', b: 0.6, c: '2' }
    ];
    const chart = new F2.Chart({
      id: 'nest'
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      inner: 0.6
    });
    chart.axis(false);
    chart.interval().position('a*b')
      .color('c')
      .adjust('stack');
    chart.render();
  });

  describe('rose', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'rose';

    document.body.appendChild(canvas);
    const data = [
      { a: '1', b: 0.3, c: '1' },
      { a: '1', b: 0.3, c: '2' },
      { a: '1', b: 0.4, c: '3' }
    ];
    const chart = new F2.Chart({
      id: 'rose'
    });
    chart.source(data);
    chart.coord('polar');
    chart.axis(false);
    chart.interval().position('c*b').color('c');
    chart.render();
  });

});
