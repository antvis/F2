// @ts-nocheck
import Top from './top';
import Left from './left';

export default (props) => {
    const { position } = props;
    if (position === 'left') {
      return <Left { ...props } />
    }
    return <Top { ...props } />
}
