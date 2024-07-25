const unused = [
  'direction',
  'filter',
  'fontKerning',
  'fontStretch',
  'fontVariantCaps',
  'globalCompositeOperation',
  'imageSmoothingEnabled',
  'imageSmoothingQuality',
  'letterSpacing',
  'textRendering',
  'getContextAttributes',
  'getLineDash',
  'getTransform',
  'isContextLost',
  'isPointInStroke',
  'reset',
  'roundRect',
];

// 不常用
// const rarelyUsed = [
//   'lineDashOffset',
//   'shadowColor',
//   'shadowOffsetX',
//   'shadowOffsetY',
//   'wordSpacing',
//   'createImageData',
//   'getImageData',
//   'putImageData',
//   'createRadialGradient',
//   'isPointInPath',
//   'quadraticCurveTo',
//   'strokeText',
//   'transform',
// ];
const createCollectContext = (ctx: CanvasRenderingContext2D) => {
  const canvas = ctx.canvas;

  const commands = [];
  const context = new Proxy(ctx, {
    get: (target, prop) => {
      if (prop === 'commands') {
        return commands;
      }
      // @ts-ignore
      if (unused.includes(prop)) {
        return;
      }
      commands.push([prop]);
      if (typeof target[prop] === 'function') {
        return target[prop].bind(target);
      } else {
        return target[prop];
      }
    },
    set: function(obj, prop, value) {
      commands.push([prop, value]);
      obj[prop] = value;
      return true;
    },
  });

  // @ts-ignore
  canvas.getContext = () => {
    return context;
  };

  return context;
};

export default createCollectContext;
