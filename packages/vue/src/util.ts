import { toRaw, isVNode } from 'vue';
import type { Slots, VNode, VNodeNormalizedChildren } from 'vue';
import { Children } from '@antv/f2';
import type { ComponentContext, Updater } from '@antv/f2/es/base/component';

export const toRawChildren = (slots: VNodeNormalizedChildren) => {
  return Children.map(slots, (slot: VNode | Slots) => {
    if (!slot) return slot;

    const element = toRaw(slot);

    // vnode
    if (isVNode(element)) {
      const { type, key, ref, props, children } = element;

      if (typeof type === 'function') {
        const isF2Component = type.prototype && type.prototype.isF2Component;
        if (!isF2Component) {
          return {
            type: (props: Record<string, unknown>, context: ComponentContext, updater: Updater) =>
              // return type(this.props, context, updater);
              // https://github.com/antvis/F2/blob/master/packages/f2/src/base/diff.ts#L117
              toRawChildren(Reflect.apply(type, undefined, [props, context, updater])),
            key,
            ref,
            props: props,
          };
        }
      }

      return {
        type,
        key,
        ref,
        props: {
          ...props,
          children: toRawChildren(children),
        },
      };
    }

    // slot
    if (element.default) {
      const children = element.default();
      return toRawChildren(children);
    }

    return null;
  });
};

export const toRawView = (View: Function) => {
  return (props: Record<string, unknown>, context: ComponentContext, updater: Updater) =>
    toRawChildren(Reflect.apply(View, undefined, [props, context, updater]));
};
