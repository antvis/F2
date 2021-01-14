/** @jsxImportSource react */

// @ts-nocheck
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import Chart from '../src';

import result from './managerData';

// 引入组件
// import { Line } from '../../components/src/index';
import { Axis, Line, Guide } from '../../fund-components/src/index';

const style = document.createElement('style');
style.setAttribute('rel', 'text/css');
style.innerHTML = `
.chart-canvas {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
`;
document.head.appendChild(style);

const root = document.createElement('div');
document.body.appendChild(root);

const { data, event } = result;

const eventData = event.map(eventRecord => {
  const { startTime, endTime } = eventRecord;
  const records = data.filter(record => {
    const { codeType, reportDateTimestamp } = record;
    return codeType === 'MANAGER' && reportDateTimestamp >= startTime && reportDateTimestamp <= endTime;
  });
  return records;
});


const App = () => {
  return (
    <Chart
      pixelRatio={ window.devicePixelRatio }
      data={ data }
    >
      <Axis visible={false} field="reportDateTimestamp" type="timeCat" tickCount={ 3 } range={ [ 0, 1 ] }/>
      <Axis field="rate" dimType="y" tickCount={ 5 } range={ [ 0, 1 ] }/>
      <Line position="reportDateTimestamp*rate" color="codeType"/>
      {
        eventData.map((records, index) => {
          return <Guide
          key={ index }
          records={ records }
          />
        })
      }
    </Chart>
  );
}

describe('test', () => {
  it('test', () => {
    expect(true).toBe(true);
  });
});

ReactDOM.render(<App />, root);
