/** @jsx jsx */
import { jsx, Canvas, Sunburst } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

fetch('https://gw.alipayobjects.com/os/antfincdn/9ZSLra9rgm/basic.json')
  .then((res) => res.json())
  .then((data) => {
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Sunburst
          data={data.children}
          color={{
            field: 'name',
          }}
          value="value"
          space={4}
        />
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
