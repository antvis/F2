import F2 from '@antv/f2';
import _ from 'lodash';
import insertCss from 'insert-css';
// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
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
  <div>
`;

fetch('https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.landscape(true);
    chart.scale('date', {
      range: [ 0, 1 ],
      type: 'timeCat',
      tickCount: 3
    });
    chart.scale('value', {
      tickCount: 5
    });
    chart.axis('date', {
      label: function label(text, index, total) {
        // 只显示每一年的第一天
        const textCfg = {
          fill: '#ccc'
        };
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.axis('value', {
      label: {
        fill: '#cccccc'
      }
    });
    chart.legend({
      nameStyle: {
        fill: '#333333'
      },
      valueStyle: {
        fill: '#e8541e'
      }
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      crosshairsStyle: {
        stroke: '#108ee9',
        lineDash: [ 4, 4 ]
      },
      onChange: function onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.forEach(function(item) {
          map[item.name] = _.clone(item);
        });
        tooltipItems.forEach(function(item) {
          const name = item.name;
          const value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    chart
      .line()
      .position('date*value')
      .color('type', [ '#1677FF', '#00B7F4', '#FF9F18' ])
      .size('type', [ 1.5, 1, 1 ]);
    chart
      .area()
      .position('date*value')
      .color('type', [
        'l(90) 0:#1677ff 1:#FFFFFF',
        'transparent',
        'transparent'
      ]);

    chart.render();
  });
