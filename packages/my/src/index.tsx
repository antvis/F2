import { Canvas } from '@antv/f2';
import { my as F2Context } from '@antv/f2-context';

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function() {};
  }
  return e;
}

Component({
  props: {
    onRender: () => {},
    // width height 会作为元素兜底的宽高使用
    width: null,
    height: null,
  },
  didMount() {
    const pageId = (this.$page && this.$page.$id) || 0;
    const id = `f2-canvas-${pageId}-${this.$id}`;
    // @ts-ignore
    const myCtx = my.createCanvasContext(id, { page: this.$page });
    const context = F2Context(myCtx);

    this.setData({
      $pageId: pageId,
    });
    const query = my.createSelectorQuery({ page: this.$page });
    query
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res) => {
        // 获取画布实际宽高, 用props的宽高做失败兜底
        const { width, height } = res && res[0] ? res[0] : this.props;
        if (!width || !height) {
          return;
        }
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 高清解决方案
        this.setData(
          {
            id,
            width: width * pixelRatio,
            height: height * pixelRatio,
          },
          () => {
            const children = this.props.onRender();
            const canvas = new Canvas({
              pixelRatio,
              width,
              height,
              context,
              children,
            });
            canvas.render();
            this.canvas = canvas;
            this.canvasEl = canvas.canvas.get('el');
          }
        );
      });
  },
  didUpdate() {
    const { canvas, props } = this;
    if (!canvas) return;
    const children = props.onRender();
    canvas.update({
      children,
    });
  },
  didUnmount() {
    const { canvas } = this;
    if (!canvas) return;
    canvas.destroy();
  },
  methods: {
    touchStart(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
    },
    touchMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchend', wrapEvent(e));
    },
  },
});
