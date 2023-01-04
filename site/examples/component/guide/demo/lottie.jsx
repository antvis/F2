/** @jsx jsx */
import { jsx, Canvas, Chart, LottieGuide, Legend, Interval } from '@antv/f2';
const context = document.getElementById('container').getContext('2d');

const data = [
    { genre: 'Sports', sold: 275, type: 'a' },
    { genre: 'Strategy', sold: 115, type: 'a' },
    { genre: 'Action', sold: 120, type: 'a' },
    { genre: 'Shooter', sold: 350, type: 'a' },
    { genre: 'Other', sold: 150, type: 'a' },
  ];

  fetch('https://gw.alipayobjects.com/os/OasisHub/3ccdf4d8-78e6-48c9-b06e-9e518057d144/data.json')
  .then((res) => res.json())
  .then((url) => {
    const { props } = (
        <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
            <Legend />
            <Interval
            x="genre"
            y="sold"
            color="genre"
            animation={{
                appear: {
                duration: 500,
                easing: 'linear',
                },
            }}
            />
            {data.map((item) => {
            return (
                <LottieGuide
                offsetX="0px"
                offsetY="0px"
                records={[item]}
                lottieJson={url}
                style={{
                    height: 35,
                    width: 35,
                }}
                animation={(points, chart) => {
                    return {
                    appear: {
                        easing: 'linear',
                        duration: 500,
                        property: ['y'],
                        start: {
                        y: chart.layout.bottom,
                        height: 0,
                        },
                    },
                    };
                }}
                />
            );
            })}
        </Chart>
        </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
    })