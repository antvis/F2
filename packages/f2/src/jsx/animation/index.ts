import { ELEMENT_DELETE } from '../elementStatus';
import createClipElement from '../createClipElement';
import { isFunction } from '@antv/util';

export default (element, animation, nextAttrs, lastAttrs) => {
  if (!animation) return null;
  // 获取shape的默认属性
  const status = element.get('status');
  const { clip, start, end, easing, delay, duration } = animation;

  const clipConfig = isFunction(clip) ? clip(element._attrs.attrs) : clip;

  // 裁剪动画
  if (clipConfig) {
    const { type, attrs, start: clipStart } = clipConfig;
    const clipElement = createClipElement(type, {
      attrs: {
        ...attrs,
        ...clipStart,
      },
    });
    // 默认用 animation 配置里的 easing 和 duration
    clipConfig.easing = clipConfig.easing || easing;
    clipConfig.delay = typeof clipConfig.delay === 'number' ? clipConfig.delay : delay;
    clipConfig.duration = clipConfig.duration || duration;
    clipConfig.element = clipElement;
  }

  const defaultAttrs = element.getDefaultAttrs();
  return {
    ...animation,
    clip: clipConfig,
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
