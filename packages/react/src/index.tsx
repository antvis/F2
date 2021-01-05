/** @jsxImportSource react */

import { useRef } from 'react';
import useModel from './model';

export default (props: any) => {
  const { pixelRatio, data, children } = props;
  const canvasRef = useRef(null);
  useModel({ canvasRef, data, pixelRatio, children });

  // @ts-ignore
  return (<canvas className="chart-canvas" ref={ canvasRef } />);
}
