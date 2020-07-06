
const requestAnimationFrame = typeof window === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame : function(fn) {
  return setTimeout(fn, 16);
};

export {
  requestAnimationFrame
};
