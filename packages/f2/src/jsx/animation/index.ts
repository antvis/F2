import { ELEMENT_DELETE } from '../elementStatus';
import createClipElement from '../createClipElement';

export default (element, animation, nextAttrs, lastAttrs) => {
  if (!animation) return null;
  // 获取shape的默认属性
  const status = element.get('status');
  const { clip, start, end, easing, delay, duration } = animation;

  // 裁剪动画
  if (clip) {
    const { type, attrs, start: clipStart } = clip;
    const clipElement = createClipElement(type, {
      attrs: {
        ...attrs,
        ...clipStart,
      },
    });
    // 默认用 animation 配置里的 easing 和 duration
    clip.easing = clip.easing || easing;
    clip.delay = typeof clip.delay === 'number' ? clip.delay : delay;
    clip.duration = clip.duration || duration;
    clip.element = clipElement;
  }

  const defaultAttrs = element.getDefaultAttrs();
  return {
    ...animation,
    start: {
      ...defaultAttrs,
      ...lastAttrs,
      ...start,
    },
    end: {
      ...(status === ELEMENT_DELETE ? null : nextAttrs),
      ...end,
    },
  };
};
