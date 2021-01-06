
import { Line, Area } from 'f2-components';

export default (props: any) => {
  const { position } = props;
  return (
    <>
      <Line position={ position } size={ 8 } color="#F93A4A" />
      <Area position={ position } />
    </>
  );
};
