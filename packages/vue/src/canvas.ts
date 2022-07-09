import {
  h,
  defineComponent,
  shallowRef,
  shallowReactive,
  watchEffect,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import type { PropType, ExtractPropTypes } from 'vue';
import { Canvas } from '@antv/f2';
import { toRawChildren } from './util';

export const canvasProps = {
  pixelRatio: {
    type: Number,
    default: window.devicePixelRatio,
  },
  width: [Number, String],
  height: [Number, String],
  padding: [Number, String, Array] as PropType<string | number | (string | number)[]>,
  animate: {
    type: Boolean,
    default: true,
  },
  px2hd: Function,
  theme: String,
  createImage: Function as PropType<() => HTMLImageElement>,
  landscape: Boolean,
};

export type CanvasProps = ExtractPropTypes<typeof canvasProps>;

export default defineComponent({
  props: canvasProps,
  setup(props, { slots }) {
    const containerRef = shallowRef<HTMLCanvasElement>();

    const state = shallowReactive<{
      canvas: Canvas | null;
      context: CanvasRenderingContext2D | null;
      children: Array<Record<string, unknown>>;
    }>({
      canvas: null,
      context: null,
      children: [],
    });

    watchEffect(() => {
      const nextProps = {
        ...props,
        context: state.context,
        children: state.children,
      };
      state.canvas?.update(nextProps);
    });

    onMounted(() => {
      const container = containerRef.value;
      if (container === undefined) throw new Error(`The Antv f2 chart's container wasn't mounted.`);
      if (container.tagName !== 'CANVAS')
        throw new Error(`The Antv f2 chart's container must be Canvas.`);

      state.context = container.getContext('2d');

      state.canvas = new Canvas({
        ...props,
        context: state.context,
        children: state.children,
      });

      state.canvas.render();
    });

    onBeforeUnmount(() => {
      state.canvas?.destroy();
    });

    return () => {
      state.children = toRawChildren(slots);
      return h('canvas', {
        class: `f2-chart`,
        ref: containerRef,
        style: {
          width: '100%',
          height: '100%',
          display: 'block',
          padding: 0,
          margin: 0,
        },
      });
    };
  },
});
