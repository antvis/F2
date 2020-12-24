// @ts-nocheck
import Base from './base';

class Legend extends Base {
  state = {}

  init() {
    const { chart } = this;
    const canvas = chart.get('canvas');
    this.container = chart.get('frontPlot').addGroup();

    canvas.on('press', (ev) => {
      const { points } = ev || {};
      const geometry = chart.get('geoms')[0];

      const records = geometry.getSnapRecords(points[0]);

      this.setState({
        record: records[0],
      });
    });
  }
  render() {
    const { state } = this;
    const { genre, sold } = state.record || {};
    return (
      <group style={{
        flexDirection: 'row',
        padding: 20
      }}>
        <text style={{
          x: 10,
          y: 10,
          text: `${genre}: `,
          fill: '#000'
        }} />
        <text style={{
          x: 60,
          y: 10,
          text: sold,
          fill: '#000'
        }} />
      </group>
    );
  }
}

export default Legend;
