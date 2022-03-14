import { jsx } from '../../jsx';
import Horizontal from './horizontal';
import Vertical from './vertical';

export default (props) => {
  const { position } = props;
  if (position === 'left' || position === 'right') {
    return <Vertical {...props} />;
  }
  return <Horizontal {...props} />;
};
