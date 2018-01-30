const Scalex = require('../../../src/animate/scalex.js');
const Scaley = require('../../../src/animate/scaley.js');
const Scalexy = require('../../../src/animate/scalexy.js');

const $ = require('jquery');

const dom = $('<div id="c1"></div>').appendTo('body');

$('<canvas id="can1" width="400" height="400"  style="width: 400px; height: 400px;" ></canvas>').appendTo(dom);
$('<canvas id="can2" width="800" height="800" style="width: 400px; height: 400px;"></canvas>').appendTo(dom);
$('<canvas id="can3" width="800" height="800" style="width: 400px; height: 400px;"></canvas>').appendTo(dom);
$('<canvas id="can4" width="800" height="800" style="width: 400px; height: 400px;"></canvas>').appendTo(dom);

describe('Scale', function() {

  it('Scalex', function() {
    const canvas = document.getElementById('can1');
    const ctx = canvas.getContext('2d');
    // ctx.scale(2,2);
    ctx.rect(20, 20, 300, 300);
    ctx.stroke();
    const bgImageData = ctx.getImageData(0, 0, 400, 400);
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillRect(30, 30, 140, 280);
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(170, 30, 140, 280);

    const imageData = ctx.getImageData(0, 0, 400, 400);

    const animate = new Scalex({
      imageData,
      ratio: 1,
      bgImageData,
      startPoint: {
        x: 170,
        y: 30
      }
    });

    animate.paint(canvas);
  });

  it('Scaley', function() {
    const canvas = document.getElementById('can2');
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.rect(20, 20, 300, 300);
    ctx.stroke();
    const bgImageData = ctx.getImageData(0, 0, 800, 800);
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillRect(30, 30, 280, 140);
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(30, 170, 280, 140);

    const imageData = ctx.getImageData(0, 0, 800, 800);

    const animate = new Scaley({
      imageData,
      bgImageData,
      startPoint: {
        x: 30,
        y: 170
      }
    });

    animate.paint(canvas);
  });

  it('Scalexy', function() {
    const canvas = document.getElementById('can3');
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.rect(20, 20, 300, 300);
    ctx.stroke();
    const bgImageData = ctx.getImageData(0, 0, 800, 800);
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillRect(30, 30, 280, 140);
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(30, 170, 280, 140);

    const imageData = ctx.getImageData(0, 0, 800, 800);

    const animate = new Scalexy({
      imageData,
      bgImageData,
      center: {
        x: 170,
        y: 170
      }
    });

    animate.paint(canvas);
  });

  it('stop', function() {
    const canvas = document.getElementById('can4');
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.rect(20, 20, 300, 300);
    ctx.stroke();
    const bgImageData = ctx.getImageData(0, 0, 800, 800);
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillRect(30, 30, 280, 140);
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(30, 170, 280, 140);

    const imageData = ctx.getImageData(0, 0, 800, 800);

    const animate = new Scalexy({
      imageData,
      bgImageData,
      center: {
        x: 170,
        y: 170
      }
    });

    animate.paint(canvas);
    setTimeout(function() {
      animate.stop();
    }, 100);
  });

  it('clear', function(done) {
    setTimeout(function() {
      $('#c1').remove();
      done();
    }, 1800);
  });
});
