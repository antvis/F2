import { Canvas } from '@antv/f2';
import { my as F2Context } from '@antv/f2-context';

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function() {};
  }
  return e;
}
const getPixelRatio = () => my.getSystemInfoSync().pixelRatio;

// 判断是否是新版 canvas 所支持的调用方法（AppX 2.7.0 及以上）
const isAppX2CanvasEnv = () =>
  my.canIUse('canvas.onReady') && my.canIUse('createSelectorQuery.return.node');

Component({
  props: {
    onRender: (_props) => {},
    // width height 会作为元素兜底的宽高使用
    width: null,
    height: null,
    type: '2d', // canvas 2d, 基础库 2.7 以上支持
  },
  /**
   * 组件创建时触发
   * 注意：
   *    使用该生命周期，项目配置需启用："component2": true
   */
  onInit() {
    this.setCanvasId();
  },
  didMount() {
    if (isAppX2CanvasEnv()) {
      return;
    }
    const { id } = this.data;
    const query = my.createSelectorQuery({ page: this.$page });
    query
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res) => {
        // 获取画布实际宽高, 用props的宽高做失败兜底
        const { width, height } = res && res[0] ? res[0] : this.props;
        const pixelRatio = getPixelRatio();
        // 高清解决方案
        this.setData(
          {
            width: width * pixelRatio,
            height: height * pixelRatio,
          },
          () => {
            const myCtx = my.createCanvasContext(id);
            const context = F2Context(myCtx);
            this.canvasRender({ width, height, context, pixelRatio });
          }
        );
      });
  },
  didUpdate() {
    const { canvas, props } = this;
    if (!canvas) return;
    const children = props.onRender(props);
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
    setCanvasId() {
      const pageId = (this.$page && this.$page.$id) || 0;
      const id = `f2-canvas-${pageId}-${this.$id}`;
      this.setData({ id });
    },
    onCanvasReady() {
      const { id } = this.data;
      const query = my.createSelectorQuery();
      query
        .select(`#${id}`)
        // @ts-ignore
        .node()
        .exec((res) => {
          if (!res[0]) {
            return;
          }
          const canvas = res[0].node;
          const { width, height } = canvas;
          const pixelRatio = getPixelRatio();
          canvas.width = width * pixelRatio;
          canvas.height = height * pixelRatio;
          const context = canvas.getContext('2d');
          this.canvasRender({ width, height, pixelRatio, context });
        });
    },
    canvasRender({ width, height, pixelRatio, context }) {
      if (!width || !height) {
        return;
      }
      const children = this.props.onRender(this.props);
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
    },
    click(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      const event = wrapEvent(e);
      // 包装成 touch 对象
      event.touches = [e.detail];
      canvasEl.dispatchEvent('click', event);
    },
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
