import { h, toRaw, isVNode } from 'vue';
import type { Slots, VNode, VNodeNormalizedChildren } from 'vue'
import { Canvas, Children } from '@antv/f2';
import type { ComponentContext, Updater } from '@antv/f2/es/base/component'

export const toRawChildren = (slots: VNodeNormalizedChildren) => {
  return Children.map(slots, (slot: VNode | Slots) => {
    if (!slot) return slot

    const element = toRaw(slot)

    // vnode
    if (isVNode(element)) {
      const { type, key, ref, props, children } = element

      if (typeof type === 'function') {
        const isF2Component = type.prototype && type.prototype.isF2Component
        if (!isF2Component) {
          return {
            key,
            ref,
            type: (
              props: Record<string, unknown>,
              context: ComponentContext,
              updater: Updater
            ) =>
              // return type(this.props, context, updater);
              // https://github.com/antvis/F2/blob/master/packages/f2/src/base/diff.ts#L117
              toRawChildren(
                Reflect.apply(type, undefined, [props, context, updater])
              ),
            props: props
          }
        }
      }

      return {
        type,
        key,
        ref,
        props: {
          ...props,
          children: toRawChildren(children)
        }
      }
    }

    // slot
    if (element.default) {
      const children = element.default()
      return toRawChildren(children)
    }

    return null
  })
}

export default {
  props: {
    className: {
      type: String,
      required: false,
    },
    pixelRatio: {
      type: Number,
      default: 1,
      required: false,
    },
    width: {
      type: [Number, String],
      required: false,
    },
    height: {
      type: [Number, String],
      required: false,
    },
    padding: {
      type: [Number, String, Array],
      required: false,
    },
    animate: {
      type: [Boolean],
      default: true,
      required: false,
    },
    px2hd: {
      type: [Function],
      required: false,
    },
  },
  methods: {
    getProps() {
      const { $props, $slots } = this;
      const props = toRaw($props);
      props.children = toRawChildren($slots);
      return props;
    },
  },
  mounted() {
    const canvasEl = this.$el;
    const context = canvasEl.getContext('2d');
    const props = this.getProps();
    const canvas = new Canvas({
      ...props,
      // context 内部创建，不能被覆盖
      context,
    });
    canvas.render();
    this.canvas = canvas;
  },
  updated() {
    const props = this.getProps();
    const { canvas } = this;
    canvas.update(props);
  },
  render() {
    return h('canvas', {
      className: `f2-chart ${this.className || ''}`,
      style: {
        width: '100%',
        height: '100%',
        display: 'block',
        padding: 0,
        margin: 0,
      },
    });
  },
  beforeUnmount() {
    const { canvas } = this;
    canvas.destroy();
  },
};
