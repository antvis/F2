import withGauge from './withGauge';
import GaugeView, { GaugeProps } from './gaugeView';

export { GaugeProps, withGauge, GaugeView };
export default withGauge<GaugeProps>(GaugeView);
