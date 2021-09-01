

const axis = {
  labelOffset: '15px',
  line: {
    stroke: '#E8E8E8',
    lineWidth: '1px',
  },
  label: {
    fill: '#808080',
    fontSize: '20px',
  },
  grid: {
    stroke: '#E8E8E8',
    lineWidth: '1px',
    lineDash: [ '4px' ]
  }
};

const Theme = {
  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
  pixelRatio: 1,
  padding: ['30px', '30px', '30px', '30px'],
  colors: [
    '#1890FF',
    '#2FC25B',
    '#FACC14',
    '#223273',
    '#8543E0',
    '#13C2C2',
    '#3436C7',
    '#F04864'
  ],
  shapes: {
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  sizes: [ 2, 4, 6, 8 ],
  shape: {
    line: {
      lineWidth: 2,
      lineJoin: 'round',
      lineCap: 'round'
    },
    point: {
      lineWidth: 0,
      size: 3
    },
    area: {
      fillOpacity: 0.1
    }
  },
  axis
};

export default Theme;
 