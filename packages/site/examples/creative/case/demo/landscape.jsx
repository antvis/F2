/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis, Tooltip } from '@antv/f2';
import insertCss from 'insert-css';
insertCss(`
  .mobile-content {
    height: 470px;
  }
  .container-wrap {
    height: 375px;
    width: 470px;
    transform-origin: left top;
    transform: translate(375px, 0) rotate(90deg);
  }
  #container {
    height: 320px;
    width: 470px;
  }
  .title-bar {
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px;
    border-bottom: 1px solid #E8E8E8;
    display: flex;
    justify-content: space-between;
  }
  .left-part {
    display: flex;
    align-items: center
  }

  .name {
    color: #108EE9;
    font-size: 16px;
  }

  .desc {
    color: #999999;
    font-size: 14px;
    margin-left: 7px;
  }

  .right-part {
    display: flex;
    align-items: center;
    padding-left: 40px;
  }
  .close {
    position: relative;
    width: 24px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }
  .close::after, .close::before {
    content: '';
    height: 10px;
    width: 2px;
    background-color: #ffffff;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: 11px;
   }
   .close::before {
    transform: rotate(-45deg);
   }
`);

document.querySelector('.mobile-content').innerHTML = `
  <div class="container-wrap">
    <div class="title-bar">
      <div class="left-part">
        <div class="name">这是一个横屏图</div>
        <div class="desc">辅助性说明</div>
      </div>
      <div class="right-part">
        <div class="close-wrap">
          <div class="close"></div>
        </div>
      </div>
    </div>
    <canvas id="container"></canvas>
  </div>
`;

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

const { props } = (
  <Canvas context={context} landscape={true}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip snap showTooltipMarker />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
