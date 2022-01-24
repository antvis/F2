import { px2hd } from '../util';

export interface ComponentContext {
  px2hd: typeof px2hd;
  [key: string]: any;
}

export interface Updater<S = any> {
  enqueueSetState: (component: Component, partialState: S, callback?: () => void) => void;
  enqueueForceUpdate: (component: Component, partialState: S, callback?: () => void) => void;
}

class Component<P = any, S = any> {
  props: P;
  state: S;
  context: ComponentContext;
  refs: {
    [key: string]: Component;
  };
  updater: Updater<S>;

  // render 返回的节点
  children: JSX.Element;
  // 对应 G 的group, 每个组件渲染的父接节点
  container: any;
  animate: boolean;
  constructor(props, context?: ComponentContext, updater?: Updater<S>) {
    this.props = props;
    this.state = {} as S;
    this.context = context;
    this.updater = updater;
  }
  willMount() {}
  didMount() {}
  willReceiveProps(_props: P) {}
  willUpdate() {}
  didUpdate() {}
  render(): JSX.Element | null {
    return null;
  }
  didUnmount() {}
  setState(partialState: S, callback?: () => void) {
    this.updater.enqueueSetState(this, partialState, callback);
  }
  forceUpdate() {
    this.updater.enqueueForceUpdate(this, {} as S);
  }
  setAnimate(animate: boolean) {
    this.animate = animate;
  }
}

// 标识是否是组件
// @ts-ignore
Component.prototype.isF2Component = true;

export default Component;
