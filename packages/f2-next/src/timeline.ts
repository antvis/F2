import Component from './base/component';
import { Children } from '.';

class Timeline extends Component {
  index: number;
  delay: number;

  static find(children) {
    if (!children) return null;
    const elements = Children.toArray(children);
    for (let i = 0, len = elements.length; i < len; i++) {
      const element = elements[i];
      if (
        element &&
        element.component &&
        element.component.constructor === Timeline
      ) {
        return element.component;
      }
    }
  }

  constructor(props) {
    super(props);
    const { delay, start = 0, children } = props;
    const count = Children.toArray(children).length;
    this.state = {
      delay,
      count,
      index: start,
    };
  }

  next() {
    const { state } = this;
    const { index, count, delay } = state;
    const next = index + 1;
    if (next < count) {
      setTimeout(() => {
        this.setState({
          index: next,
        });
      }, delay || 0);
      return true;
    }
    return false;
  }

  render() {
    const { state, props } = this;
    const { children } = props;
    const { index } = state;
    const childrenArray = Children.toArray(children);
    return childrenArray[index];
  }
}

export default Timeline;
