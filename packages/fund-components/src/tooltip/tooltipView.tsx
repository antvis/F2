import { jsx } from '@ali/f2-jsx';

export default (props) => {
  const { records, plot } = props;
  if (!records || !records.length) return null;
  const { x, y } = records[0];
  const { tl, tr, bl } = plot;
  return (
    <group>
      <line attrs={{
        x1: tl.x,
        y1: y,
        x2: tr.x,
        y2: y,
        stroke: '#108ee9',
        lineWidth: 1,
        lineDash: ['4px', '4px'],
      }} />
      <line attrs={{
        x1: x,
        y1: tl.y,
        x2: x,
        y2: bl.y,
        stroke: '#108ee9',
        lineWidth: 1,
        lineDash: ['4px', '4px']
      }} />
      <circle attrs={{
        x,
        y,
        r: '6px',
        fill: '#000000',
        stroke: '#fff',
        lineWidth: '2px',
      }} />
      <rect attrs={{
        x,
        y: tl.y,
        width: 10,
        height: 10,
        fill: '#1677FF',
        radius: '4px',
        shadowColor: '#A1C8FF',
        shadowBlur: '8px',
        shadowOffsetX: 0,
        shadowOffsetY: '4px',
      }}
      />
      <text attrs={{
        x,
        y: tl.y,
        fill: '#000',
        fontSize: '22px',
        text: 'aaa'
      }} />
    </group>
  );
}
