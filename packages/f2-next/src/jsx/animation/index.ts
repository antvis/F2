import { ELEMENT_DELETE } from '../elementStatus';
import { Shape } from '@ali/f2-graphic';

function createClipElement(type: string, config) {
  return new Shape[type](config);
}

export default (element: any, animation, nextAttrs, lastAttrs) => {
  if (!animation) return null;
  // 获取shape的默认属性
  const status = element.get('status');
  // const { appear, update, leave } = animationCfg;
  // const animation = status === ELEMENT_DELETE ? leave : ( lastAttrs ? update : appear );
  // if (!animation) return;
  const { clip, start, end, easing, delay, duration } = animation;

  if (clip) {
    const { type, start } = clip;
    const clipElement = createClipElement(type, {
      attrs: start,
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
