const Util = require('../../util/common');

function _mod(n, m) {
  return ((n % m) + m) % m;
}

function _addStop(steps, gradient) {
  Util.each(steps, item => {
    item = item.split(':');
    gradient.addColorStop(Number(item[0]), item[1]);
  });
}

// the string format: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
function _parseLineGradient(color, shape, context) {
  const arr = color.split(' ');
  let angle = arr[0].slice(2, arr[0].length - 1);
  angle = _mod((parseFloat(angle) * Math.PI) / 180, Math.PI * 2);
  const steps = arr.slice(1);

  const { minX, minY, maxX, maxY } = shape.getBBox();
  let start;
  let end;

  if (angle >= 0 && angle < 0.5 * Math.PI) {
    start = {
      x: minX,
      y: minY
    };
    end = {
      x: maxX,
      y: maxY
    };
  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
    start = {
      x: maxX,
      y: minY
    };
    end = {
      x: minX,
      y: maxY
    };
  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
    start = {
      x: maxX,
      y: maxY
    };
    end = {
      x: minX,
      y: minY
    };
  } else {
    start = {
      x: minX,
      y: maxY
    };
    end = {
      x: maxX,
      y: minY
    };
  }

  const tanTheta = Math.tan(angle);
  const tanTheta2 = tanTheta * tanTheta;

  const x = ((end.x - start.x) + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
  const y = tanTheta * ((end.x - start.x) + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
  const gradient = context.createLinearGradient(start.x, start.y, x, y);
  _addStop(steps, gradient);
  return gradient;
}

// the string format: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'
function _parseRadialGradient(color, shape, context) {
  const arr = color.split(' ');
  let circleCfg = arr[0].slice(2, arr[0].length - 1);
  circleCfg = circleCfg.split(',');
  const fx = parseFloat(circleCfg[0]);
  const fy = parseFloat(circleCfg[1]);
  const fr = parseFloat(circleCfg[2]);
  const steps = arr.slice(1);
  // if radius is 0, no gradient, stroke with the last color
  if (fr === 0) {
    const color = steps[steps.length - 1];
    return color.split(':')[1];
  }
  const { width, height, minX, minY } = shape.getBBox();
  const r = Math.sqrt(width * width + height * height) / 2;
  const gradient = context.createRadialGradient(minX + width * fx, minY + height * fy, fr * r, minX + width / 2, minY + height / 2, r);
  _addStop(steps, gradient);
  return gradient;
}

module.exports = {
  parseStyle(color, shape, context) {
    if (color[1] === '(') {
      try {
        const firstCode = color[0];
        if (firstCode === 'l') {
          return _parseLineGradient(color, shape, context);
        } else if (firstCode === 'r') {
          return _parseRadialGradient(color, shape, context);
        }
      } catch (ev) {
        console.error('error in parsing gradient string, please check if there are any extra whitespaces.');
        console.error(ev);
      }
    }
    return color;
  }
};
