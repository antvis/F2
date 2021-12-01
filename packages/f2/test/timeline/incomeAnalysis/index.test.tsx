import { jsx, Timeline, Canvas } from '../../../src';
import { createContext } from '../../util';
import result from './data';
import TotalAmount from './totalAmount';
import ProfitRate from './profitRate';

const context = createContext('', {
  width: '350px',
  height: '160px',
});

describe('Timeline', () => {
  it('收益分析', () => {
    const { monthReportSummary } = result || {};
    const data = {
      ...result,
      ...monthReportSummary,
    };
    const { props } = (
      <Canvas context={context}>
        <Timeline>
          <TotalAmount data={data} />
          <ProfitRate data={data} />
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
