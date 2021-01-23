import { jsx } from '@ali/f2-jsx';
import Bottom from './bottom';
import Right from './right';
import Left from './left';

export default (props: any) => {
  const { position } = props;

  switch (position) {
    case 'bottom':
      return <Bottom { ...props } />
      case 'right':
        return <Right { ...props } />
    default:
      return <Left { ...props } />
  }
}
