
const getAnimationConfig = (nextAttrs, lastAttrs, animation) => {
  if (!lastAttrs) {
    return animation.appear;
  }
  if (!nextAttrs) {
    return animation.leave;
  }
  return animation.update;
}

export default (type: string, animationCfg, nextAttrs, lastAttrs) => {
  if (!animationCfg) return null;
  const animation = getAnimationConfig(nextAttrs, lastAttrs, animationCfg);
  if (!animation) return;
  return {
    ...animation,
    start: {
      width: 0,
      height: 0,
      ...animation.start,
      ...lastAttrs,
    },
    end: nextAttrs,
  }
}
