
import { Line, Area } from 'f2-components';

export default (props: any) => {
  const { position } = props;
  return (
    <>
      <Area position={ position } color="l(90) 0:#F93A4A 0.5:#F9BCC1 1:#ffffff" style={{ fillOpacity: 0.35 }}/>
      <Line position={ position } size={ 4 } color="#F93A4A" />
    </>
  );
};
