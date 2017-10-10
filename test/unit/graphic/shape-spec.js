const expect = require('chai').expect;
const G = require('../../../src/graphic/g');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

describe('g', function() {
  it('line', function() {
    G.drawLine({ x: 0, y: 0 }, { x: 100, y: 100 }, canvas, {
      stroke: 'red'
    });
    expect(context.fillStyle).not.equal('red');
  });

  it('text', () => {
    G.drawText('hellow', { x: 100, y: 100 }, canvas, {
      fill: 'red'
    });
    expect(context.fillStyle).not.equal('red');
  });

  it('arc', () => {
    G.drawArc({ x: 200, y: 350 }, 20, Math.PI, Math.PI * 3 / 2, canvas, {
      fill: 'blue'
    });
  });

  it('circle', () => {
    G.drawCircle({ x: 100, y: 150 }, 20, canvas, {
      fill: 'yellow'
    });
  });

  it('custom', () => {
    G.drawShape(canvas, { stroke: 'black' }, function(ctx) {
      ctx.moveTo(200, 200);
      ctx.lineTo(500, 500);
    });
    expect(context.strokeStyle).not.equal('black');
  });

  it('fan', function() {
    G.drawFan([
      {
        x: 150,
        y: 100
      },
      {
        x: 150,
        y: 50
      },
      {
        x: 50,
        y: 150
      },
      {
        x: 100,
        y: 150
      }
    ],
      {
        x: 150,
        y: 150
      }, canvas, {
        strokeStyle: '#000',
        fillStyle: '#00f0ff'
      });
  });

  it('empty points', function() {
    G.drawLines([], canvas, {});
    G.drawSmooth([], canvas, {});
  });

  it('drawRect', function() {
    const points1 = [
      {
        x: 300,
        y: 400
      },
      {
        x: 300,
        y: 300
      },
      {
        x: 400,
        y: 300
      },
      {
        x: 400,
        y: 400
      }
    ];
    const points2 = [
      {
        x: 300,
        y: 200
      },
      {
        x: 300,
        y: 100
      },
      {
        x: 400,
        y: 100
      },
      {
        x: 400,
        y: 200
      }
    ];

    G.drawRect(points1, canvas, {
      strokeStyle: '#000',
      fillStyle: '#00f0ff'
    });
    G.drawRect(points2, canvas, {
      strokeStyle: '#000',
      fillStyle: '#00f0ff',
      radius: 10
    });
  });

  it('smooth', () => {
    G.drawSmooth([], canvas);
    G.drawSmooth([{ x: 0, y: 100 }, { x: 100, y: 0 }, { x: 200, y: 100 }, { x: 300, y: 100 }], canvas, {
      stroke: 'pink'
    });
  });
});
