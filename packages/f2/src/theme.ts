const axis = {
  labelOffset: '15px',
  line: {
    stroke: '#E8E8E8',
    lineWidth: '1px',
  },
  symbol: {
    fill: '#E8E8E8',
    radius: '10px',
  },
  tickLine: {
    stroke: '#E8E8E8',
  },
  label: {
    fill: '#808080',
    fontSize: '20px',
  },
  grid: {
    stroke: '#E8E8E8',
    lineWidth: '1px',
    lineDash: ['4px'],
  },
};

const guide = {
  line: {
    style: {
      stroke: '#a3a3a3',
      lineWidth: 1,
    },
    offsetX: 0,
    offsetY: 0,
  },
  text: {
    style: {
      fill: '#787878',
      // textAlign: 'center',
      textBaseline: 'middle',
    },
    offsetX: 0,
    offsetY: 0,
  },
  rect: {
    style: {
      fill: '#fafafa',
    },
  },
  arc: {
    style: {
      stroke: '#a3a3a3',
    },
  },
  html: {
    offsetX: 0,
    offsetY: 0,
    alignX: 'center',
    alignY: 'middle',
  },
  tag: {
    offsetX: 0,
    offsetY: 0,
    side: 4,
    background: {
      padding: 5,
      radius: 2,
      fill: '#1890FF',
    },
    textStyle: {
      fontSize: 12,
      fill: '#fff',
      textAlign: 'center',
      textBaseline: 'middle',
    },
  },
  point: {
    offsetX: 0,
    offsetY: 0,
    style: {
      fill: '#fff',
      r: 3,
      lineWidth: 2,
      stroke: '#1890ff',
    },
  },
  polyline: {
    style: {
      lineWidth: '4px',
      lineJoin: 'round',
      lineCap: 'round',
    },
    offsetX: 0,
    offsetY: 0,
  },
};

const chart = {
  padding: ['30px', '30px', '30px', '30px'],
};

export default {
  chart,
  colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
  shapes: {
    line: ['line', 'dash', 'smooth'],
    point: ['circle', 'hollowCircle', 'rect'],
    area: ['area', 'smooth'],
    interval: ['rect', 'pyramid', 'funnel'],
  },
  sizes: ['4px', '6px', '8px', '10px', '12px'],
  shape: {
    line: {
      default: {
        lineWidth: '4px',
        lineJoin: 'round',
        lineCap: 'round',
      },
      smooth: {
        smooth: true,
      },
      'step-start': {
        step: 'start',
      },
      'step-middle': {
        step: 'middle',
      },
      'step-end': {
        step: 'end',
      },
      dash: {
        lineDash: ['8px', '8px'],
      },
    },
    point: {
      default: {
        size: '6px',
      },
      hollowCircle: {
        lineWidth: '2px',
      },
    },
    area: {
      default: {
        fillOpacity: 0.1,
      },
    },
    interval: {
      default: {},
    },
  },
  axis,
  guide,
};
