/** @jsxRuntime classic */

// @ts-nocheck
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Chart from '../src';

import result from './managerData';

// 引入组件
// import { Line } from '../../components/src/index';
import { Axis, Line, Guide, WeaverLine } from '@ali/fund-components';

const style = document.createElement('style');
style.setAttribute('rel', 'text/css');
style.innerHTML = `
.f2-chart {
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

class App extends Component {
  state = {
    activeIndex: 0,
  }
  guideClick = (index) => {
    const { activeIndex } = this.state;
    if (activeIndex === index) {
      return;
    }
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    const { activeIndex } = this.state;
    return (
      <Chart
        pixelRatio={ window.devicePixelRatio }
        data={ data }
        padding={ [ '15px', '15px', '15px', '15px' ] }
      >
        <Axis
          field="reportDateTimestamp"
          type="timeCat"
          tickCount={ 3 }
          range={ [ 0, 1 ] }
          position="bottom"
          labelOffset="16px"
          // visible={ false }
        />
        <Axis
          position="left"
          field="rate"
          tickCount={ 5 }
          range={ [ 0, 1 ] }
          labelOffset="16px"
          formatter={ (value) => { return `${(value * 100).toFixed(2)}%` } }
          tickLine={ false }
          label={{
            fontSize: '20px'
          }}
        />
        <Line
          position="reportDateTimestamp*rate"
          color={[ 'codeType', ['#CCCCCC', '#EAB76B']]}
          size="3px"
        />
        {
          eventData.map((records, index) => {
            return <Guide
              key={ index }
              records={ records }
              active={ activeIndex === index }
              onClick={ () => this.guideClick(index) }
            />
          })
        }
      </Chart>
    );
  }
}

describe('test', () => {
  it('test', () => {
    expect(true).toBe(true);
  });
});

ReactDOM.render(<App />, root);
