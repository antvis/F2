import Chart from './chart';

export default (props: any) => {
  const { children, data, ...cfg } = props;

  const chart = new Chart({
    ...cfg,
    components: children
  });
  chart.source(data);
  return chart;
}