

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

const guide = {
  line: {
    style: {
      stroke: '#a3a3a3',
      lineWidth: 1
    },
  },
  text: {
    style: {
      fill: '#787878',
      textAlign: 'center',
      textBaseline: 'middle',
    },
    offsetX: 0,
    offsetY: 0,
  },
  rect: {
    style: {
      fill: '#fafafa'
    },
  },
  arc: {
    style: {
      stroke: '#a3a3a3'
    },
  },
  html: {
    offsetX: 0,
    offsetY: 0,
    alignX: 'center',
    alignY: 'middle'
  },
  tag: {
    offsetX: 0,
    offsetY: 0,
    side: 4,
    background: {
      padding: 5,
      radius: 2,
      fill: '#1890FF'
    },
    textStyle: {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  point: {
    offsetX: 0,
    offsetY: 0,
    style: {
      fill: '#fff',
      r: 3,
      lineWidth: 2,
      stroke: '#1890ff'
    }
  }
}

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
  axis,
  guide
};

export default Theme;
 