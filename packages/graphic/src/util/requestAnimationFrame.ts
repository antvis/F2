const requestAnimationFrame =
  typeof window === 'object' && (window as Window).requestAnimationFrame
    ? (window as Window).requestAnimationFrame
    : function (fn) {
        return setTimeout(fn, 16);
      };

export { requestAnimationFrame };
