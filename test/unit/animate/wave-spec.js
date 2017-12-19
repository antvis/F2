const Wavah = require('../../../src/animate/wave-h.js');
const Wavac = require('../../../src/animate/wave-c.js');

const $ = require('jquery');

$('<canvas id="ca1" width="800" height="800" style="width: 400px; height: 400px;"></canvas>').appendTo('body');
$('<canvas id="ca2" width="800" height="800" style="width: 400px; height: 400px;"></canvas>').appendTo('body');

describe('wave', function() {

  it('waveh', function() {
    const canvas = document.getElementById('ca1');
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.rect(20, 20, 300, 300);
    ctx.stroke();
    const bgImageData = ctx.getImageData(0, 0, 800, 800);
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillRect(30, 30, 140, 280);
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(170, 30, 140, 280);

    const imageData = ctx.getImageData(0, 0, 800, 800);

    const animate = new Wavah({
      imageData,
      bgImageData,
      cycle: 2
    });

    animate.paint(canvas);
  });

  it('wavec', function() {
    const canvas = document.getElementById('ca2');
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.rect(20, 20, 300, 300);
    ctx.stroke();
    const bgImageData = ctx.getImageData(0, 0, 800, 800);
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.arc(170, 170, 145, 1.5 * Math.PI, 3.5 * Math.PI);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, 800, 800);

    const animate = new Wavac({
      imageData,
      bgImageData,
      center: {
        x: 170,
        y: 170
      },
      radius: 145,
      cycle: 2
    });
    animate.paint(canvas);
  });

  it('clear', function(done) {
    setTimeout(function() {
      $('#ca1').remove();
      $('#ca2').remove();
      done();
    }, 1800);
  });

});
