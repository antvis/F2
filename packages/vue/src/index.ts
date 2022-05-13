import { h, toRaw, isVNode } from 'vue';
import { Canvas, Children } from '@antv/f2';

const toRawChildren = (slots) => {
  return Children.map(slots, (slot) => {
    if (!slot) return slot;
    const element = toRaw(slot);

    // vnode
    if (isVNode(element)) {
      const { key, ref, type, props, children } = element;
      if (children) {
        props.children = toRawChildren(children);
      }
      return {
        key,
        ref,
        type,
        props,
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
};
