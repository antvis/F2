// @ts-nocheck
import { Line, withLine } from '@ali/f2-components';
import { batch2hd } from '@ali/f2x-util';

export default View => {
  return class Line extends withLine(View) {
    mount() {
      const { props } = this;
      this.props = {
        ...props,
        size: batch2hd(props.size)
      }
      super.mount();
    }
  }
}
