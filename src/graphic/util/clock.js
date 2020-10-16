const clock = typeof performance === 'object' && performance.now ? performance : Date;

export {
  clock
};
