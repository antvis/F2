import { jsx } from '@ali/f2-jsx';

export default (props) => {
  const { records, plot } = props;
  if (!records || !records.length) return null;
  const { x, y } = records[0];
  const { tl, tr, br, bl } = plot;
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
      <group style={{
        // top
        left: x,
        top: tl.y,
        padding: '6px',
        marginLeft: '-50%',
      }} attrs={{
        fill: 'gray',
        radius: '4px'
      }}>
        <text attrs={{
          text: '中文',
          fill: '#000',
        }} />
      </group>
      <group style={{
        // bottom
        left: x,
        top: bl.y,
        padding: '6px',
        marginTop: '-100%',
        marginLeft: '-50%',
      }} attrs={{
        fill: 'gray',
        radius: '4px'
      }}>
        <text attrs={{
          text: '中文ss',
          fill: '#000',
        }} />
      </group>
      <group style={{
        // left
        left: tl.x,
        top: y,
        padding: '6px',
        marginTop: '-50%',
      }} attrs={{
        fill: 'gray',
        radius: '4px'
      }}>
        <text attrs={{
          text: '中文ss',
          fill: '#000',
        }} />
      </group>
      <group style={{
        // right
        left: tr.x,
        top: y,
        padding: '6px',
        marginTop: '-50%',
        marginLeft: '-100%',
      }} attrs={{
        fill: 'gray',
        radius: '4px'
      }}>
        <text attrs={{
          text: '中文ss',
          fill: '#000',
        }} />
      </group>
    </group>
  );
}
