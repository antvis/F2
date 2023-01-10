import { jsx } from '@antv/f-engine';
import Horizontal from './horizontal';
import Vertical from './vertical';

export default (props) => {
  const { position, mode } = props;

  if (mode.length > 1) {
    return (
      <group>
        <Vertical {...props} />
        <Horizontal {...props} />
      </group>
    );
  }
  if (position === 'left' || position === 'right') {
    return <Vertical {...props} />;
  }
  return <Horizontal {...props} />;
};
