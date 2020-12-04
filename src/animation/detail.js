/**
 * Handle the detail animations
 * @author sima.zhang1990@gmail.com
 */
import {
  mix, isArray, isNumber, each, isNil, isFunction, isString,
  isObject, deepMix
} from '../util/common';

import Element from '../graphic/engine/element';
import Timeline from '../graphic/animate/timeline';
import Animator from '../graphic/animate/animator';
import Animate from './animate';
import * as ShapeAction from './shape-action';
import * as GroupAction from './group-action';
import Chart from '../chart/chart';

let timeline;
Element.prototype.animate = function() {
  const attrs = mix({}, this.get('attrs'));
  return new Animator(this, attrs, timeline);
};

Chart.prototype.animate = function(cfg) {
  this.set('animate', cfg);
  return this;
};

Animate.Action = ShapeAction;
Animate.defaultCfg = {
  interval: {
    enter(coord) {
      if (coord.isPolar && coord.transposed) { // for pie chart
        return function(shape) {
          shape.set('zIndex', -1);
          const container = shape.get('parent');
          container.sort();
        };
      }
      return ShapeAction.fadeIn;
    }
  },
  area: {
    enter(coord) {
      if (coord.isPolar) return null;
      return ShapeAction.fadeIn;
    }
  },
  line: {
    enter(coord) {
      if (coord.isPolar) return null;

      return ShapeAction.fadeIn;
    }
  },
  path: {
    enter(coord) {
      if (coord.isPolar) return null;

      return ShapeAction.fadeIn;
    }
  }
};

const GROUP_ANIMATION = {
  line(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }
    return GroupAction.groupWaveIn;
  },
  area(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }
    return GroupAction.groupWaveIn;
  },
  path(coord) {
    if (coord.isPolar) {
      return GroupAction.groupScaleInXY;
    }
    return GroupAction.groupWaveIn;
  },
  point() {
    return GroupAction.shapesScaleInXY;
  },
  interval(coord) {
    let result;
    if (coord.isPolar) { // polar coodinate
      result = GroupAction.groupScaleInXY;
      if (coord.transposed) { // pie chart
        result = GroupAction.groupWaveIn;
      }
    } else {
      result = coord.transposed ? GroupAction.groupScaleInX : GroupAction.groupScaleInY;
    }
    return result;
  },
  schema() {
    return GroupAction.groupWaveIn;
  }
};

function diff(fromAttrs, toAttrs) {
  const endState = {};
  for (const k in toAttrs) {
    if (isNumber(fromAttrs[k]) && fromAttrs[k] !== toAttrs[k]) {
      endState[k] = toAttrs[k];
    } else if (isArray(fromAttrs[k]) && JSON.stringify(fromAttrs[k]) !== JSON.stringify(toAttrs[k])) {
      endState[k] = toAttrs[k];
    }
  }
  return endState;
}

// Add a unique id identifier to each shape
function _getShapeId(geom, dataObj, geomIdx) {
  const type = geom.get('type');
  let id = 'geom' + geomIdx + '-' + type;
  const xScale = geom.getXScale();
  const yScale = geom.getYScale();
  const xField = xScale.field || 'x';
  const yField = yScale.field || 'y';
  const yVal = dataObj[yField];
  let xVal;
  if (xScale.isIdentity) {
    xVal = xScale.value;
  } else {
    xVal = dataObj[xField];
  }

  if (type === 'interval' || type === 'schema') {
    id += '-' + xVal;
  } else if (type === 'line' || type === 'area' || type === 'path') {
    id += '-' + type;
  } else {
    id += xScale.isCategory ? '-' + xVal : '-' + xVal + '-' + yVal;
  }

  const groupScales = geom._getGroupScales();
  each(groupScales, groupScale => {
    const field = groupScale.field;
    if (groupScale.type !== 'identity') {
      id += '-' + dataObj[field];
    }
  });

  return id;
}

// get geometry's shapes
function getShapes(geoms, chart, coord) {
  const shapes = [];

  each(geoms, (geom, geomIdx) => {
    const geomContainer = geom.get('container');
    const geomShapes = geomContainer.get('children');
    const type = geom.get('type');
    const animateCfg = isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');
    if (animateCfg !== false) {
      each(geomShapes, (shape, index) => {
        if (shape.get('className') === type) {
          shape._id = _getShapeId(geom, shape.get('origin')._origin, geomIdx);
          shape.set('coord', coord);
          shape.set('animateCfg', animateCfg);
          shape.set('index', index);
          shapes.push(shape);
        }
      });
    }
    geom.set('shapes', geomShapes);
  });
  return shapes;
}

function cache(shapes) {
  const rst = {};
  for (let i = 0, len = shapes.length; i < len; i++) {
    const shape = shapes[i];
    if (!shape._id || shape.isClip) continue;
    const id = shape._id;
    rst[id] = {
      _id: id,
      type: shape.get('type'), // the type of shape
      attrs: mix({}, shape._attrs.attrs), // the graphics attributes of shape
      className: shape.get('className'),
      geomType: shape.get('className'),
      index: shape.get('index'),
      coord: shape.get('coord'),
      animateCfg: shape.get('animateCfg')
    };
  }
  return rst;
}

function getAnimate(geomType, coord, animationType, animationName) {
  let result;

  if (isFunction(animationName)) {
    result = animationName;
  } else if (isString(animationName)) {
    result = Animate.Action[animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, animationType);
  }
  return result;
}

function getAnimateCfg(geomType, animationType, animateCfg) {
  if (animateCfg === false || (isObject(animateCfg) && (animateCfg[animationType] === false))) {
    return false;
  }

  const defaultCfg = Animate.getAnimateCfg(geomType, animationType);
  if (animateCfg && animateCfg[animationType]) {
    return deepMix({}, defaultCfg, animateCfg[animationType]);
  }
  return defaultCfg;
}

function addAnimate(cache, shapes, canvas) {
  let animate;
  let animateCfg;

  // the order of animation: leave -> update -> enter
  const updateShapes = [];
  const newShapes = [];
  each(shapes, shape => {
    const result = cache[shape._id];
    if (!result) {
      newShapes.push(shape);
    } else {
      shape.set('cacheShape', result);
      updateShapes.push(shape);
      delete cache[shape._id];
    }
  });

  // first do the leave animation
  each(cache, deletedShape => {
    const { className, coord, _id, attrs, index, type } = deletedShape;

    animateCfg = getAnimateCfg(className, 'leave', deletedShape.animateCfg);
    if (animateCfg === false) return true;

    animate = getAnimate(className, coord, 'leave', animateCfg.animation);
    if (isFunction(animate)) {
      const tempShape = canvas.addShape(type, {
        attrs,
        index,
        canvas,
        className
      });
      tempShape._id = _id;
      animate(tempShape, animateCfg, coord);
    }
  });

  // then do the update animation
  each(updateShapes, updateShape => {
    const className = updateShape.get('className');

    animateCfg = getAnimateCfg(className, 'update', updateShape.get('animateCfg'));
    if (animateCfg === false) return true;
    const coord = updateShape.get('coord');
    const cacheAttrs = updateShape.get('cacheShape').attrs;
    const endState = diff(cacheAttrs, updateShape._attrs.attrs); // 判断如果属性相同的话就不进行变换
    if (Object.keys(endState).length) {
      animate = getAnimate(className, coord, 'update', animateCfg.animation);
      if (isFunction(animate)) {
        animate(updateShape, animateCfg, coord);
      } else {
        const startState = {};
        each(endState, function(value, key) {
          startState[key] = cacheAttrs[key];
        });
        updateShape.attr(startState);
        updateShape.animate().to({
          attrs: endState,
          duration: animateCfg.duration,
          easing: animateCfg.easing,
          delay: animateCfg.delay
        }).onEnd(function() {
          updateShape.set('cacheShape', null);
        });
      }
    }
  });

  // last, enter animation
  each(newShapes, newShape => {
    // 新图形元素的进场元素
    const className = newShape.get('className');
    const coord = newShape.get('coord');

    animateCfg = getAnimateCfg(className, 'enter', newShape.get('animateCfg'));
    if (animateCfg === false) return true;

    animate = getAnimate(className, coord, 'enter', animateCfg.animation);
    if (isFunction(animate)) {
      if (className === 'interval' && coord.isPolar && coord.transposed) {
        const index = (newShape.get('index'));
        const lastShape = updateShapes[index - 1];
        animate(newShape, animateCfg, lastShape);
      } else {
        animate(newShape, animateCfg, coord);
      }
    }
  });
}

function _getAnimateCfgByShapeType(type, chart) {
  if (!type) {
    return null;
  }
  const animateCfg = chart.get('animate');

  if (type.indexOf('guide-tag') > -1) {
    type = 'guide-tag';
  }

  if (isObject(animateCfg)) {
    return animateCfg[type];
  }

  if (animateCfg === false) {
    return false;
  }

  return null;
}

function afterCanvasInit(/* chart */) {
  timeline = new Timeline();
  timeline.play();
}

function beforeCanvasDraw(chart) {
  if (chart.get('animate') === false) {
    return;
  }

  let isUpdate = chart.get('isUpdate');
  const canvas = chart.get('canvas');
  const coord = chart.get('coord');
  const geoms = chart.get('geoms');

  const caches = canvas.get('caches') || [];
  if (caches.length === 0) {
    isUpdate = false;
  }

  const cacheShapes = getShapes(geoms, chart, coord);
  const { frontPlot, backPlot } = chart.get('axisController');
  const axisShapes = frontPlot.get('children').concat(backPlot.get('children'));
  let guideShapes = [];
  if (chart.get('guideController')) {
    guideShapes = chart.get('guideController').guideShapes;
  }
  const componentShapes = [];
  axisShapes.concat(guideShapes).forEach(s => {
    const className = s.get('className');
    const animateCfg = _getAnimateCfgByShapeType(className, chart);
    s.set('coord', coord);
    s.set('animateCfg', animateCfg);
    componentShapes.push(s);
    cacheShapes.push(s);
  });
  canvas.set('caches', cache(cacheShapes));

  if (isUpdate) {
    addAnimate(caches, cacheShapes, canvas);
  } else { // do the appear animation
    let animateCfg;
    let animate;
    each(geoms, geom => {
      const type = geom.get('type');
      const geomCfg = isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');
      if (geomCfg !== false) {
        animateCfg = getAnimateCfg(type, 'appear', geomCfg);
        animate = getAnimate(type, coord, 'appear', animateCfg.animation);
        if (isFunction(animate)) {
          const shapes = geom.get('shapes');
          each(shapes, shape => {
            animate(shape, animateCfg, coord);
          });
        } else if (GROUP_ANIMATION[type]) { // do the default animation
          animate = GroupAction[animateCfg.animation] || GROUP_ANIMATION[type](coord);

          const yScale = geom.getYScale();
          const zeroY = coord.convertPoint({
            x: 0,
            y: yScale.scale(geom.getYMinValue())
          });

          const container = geom.get('container');
          animate && animate(container, animateCfg, coord, zeroY);
        }
      }
    });

    // do the animation of components
    each(componentShapes, shape => {
      const animateCfg = shape.get('animateCfg');
      const className = shape.get('className');
      if (animateCfg && animateCfg.appear) { // if user configure
        const defaultCfg = Animate.getAnimateCfg(className, 'appear');
        const appearCfg = deepMix({}, defaultCfg, animateCfg.appear);
        const animate = getAnimate(className, coord, 'appear', appearCfg.animation);
        if (isFunction(animate)) {
          animate(shape, appearCfg, coord);
        }
      }
    });
  }
}

function afterCanvasDestroyed(/* chart */) {
  timeline.stop();
}

export {
  afterCanvasInit,
  beforeCanvasDraw,
  afterCanvasDestroyed
};

export default {
  afterCanvasInit,
  beforeCanvasDraw,
  afterCanvasDestroyed
};
