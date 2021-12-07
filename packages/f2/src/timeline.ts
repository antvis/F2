import Component from './base/component';
import Children from './children';

class Timeline extends Component {
  index: number;
  delay: number;

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

  didMount() {
    const { context } = this;
    const { root } = context;
    root.on('animationEnd', this.next);
  }

  didUnmount() {
    const { context } = this;
    const { root } = context;
    root.off('animationEnd', this.next);
  }

  next = () => {
    const { state, props } = this;
    const { index, count, delay } = state;
    const { loop } = props;

    const next = loop ? (index + 1) % count : index + 1;
    if (next < count) {
      setTimeout(() => {
        this.setState({
          index: next,
        });
      }, delay || 0);
    }
  };

  render() {
    const { state, props } = this;
    const { children } = props;
    const { index } = state;
    const childrenArray = Children.toArray(children);
    return childrenArray[index];
  }
}

export default Timeline;
