/** @jsxImportSource react */

import { useRef } from 'react';
import useModel from './model';

export default props => {
  const { pixelRatio, data, children } = props;
  const canvasRef = useRef(null);
  useModel({ canvasRef, data, pixelRatio, children });

  return (<canvas className="chart-canvas" ref={ canvasRef } />);
}
