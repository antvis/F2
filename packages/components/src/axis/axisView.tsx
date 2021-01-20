import { jsx } from '@ali/f2-jsx';
import Bottom from './bottom';
import Left from './left';

export default (props: any) => {
  const { position } = props;

  if (position === 'bottom') {
    return (
      <Bottom { ...props } />
    );
  }
  return <Left { ...props } />
}
