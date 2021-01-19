// @ts-nocheck
import { Line, Area } from '@ali/f2-components';

export default (props: any) => {
  const { position, growth } = props;

  const lineRiseColor = '#F93A4A';
  const lineFallColor = '#00B578';
  const areaRiseColor = '#FDC3C8';
  const areaFallColor = '#D4FFF1';
  const areaBaseColor = '#ffffff';

  let areaMiddleColor = '#ffffff';
  let lineColor = '#F93A4A';
  let areaColor = areaRiseColor;

  if (growth === 'equal') {
    lineColor = '#808080';
  } else if (growth === 'rise') {
    lineColor = lineRiseColor;
    areaMiddleColor = '#FFEEEF';
  } else {
    lineColor = lineFallColor;
    areaColor = areaFallColor;
    areaMiddleColor = '#B0E5D3';
  }

  return (
    <>
      <Area position={ position } color={'l(90) 0:' + areaColor + ' 0.5:' + areaMiddleColor + ' 1:' + areaBaseColor} style={{ fillOpacity: 0.3 }}/>
      <Line position={ position } size={ 6 } color={ lineColor } />
    </>
  );
};
