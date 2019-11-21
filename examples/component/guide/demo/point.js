import F2 from '@antv/f2';

fetch('../data/income.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      time: {
        type: 'timeCat',
        range: [ 0, 1 ],
        tickCount: 3
      }
    });

    chart.axis('time', {
      label: function label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });

    chart.guide().point({
      position: [ '2014-01-03', 6.763 ]
    });
    chart.guide().text({
      position: [ '2014-01-03', 6.763 ],
      content: '受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%',
      style: {
        textAlign: 'left',
        lineHeight: 16,
        fontSize: 10
      },
      offsetX: 10
    });

    chart.guide().point({
      position: [ '2013-05-31', 2.093 ]
    });
    chart.guide().text({
      position: [ '2013-05-31', 2.093 ],
      content: '余额宝刚成立时，并未达到\n目标资产配置，故收益率较低',
      style: {
        textAlign: 'left',
        lineHeight: 16,
        fontSize: 10
      },
      offsetX: 10,
      offsetY: -10
    });

    chart.guide().point({
      position: [ '2016-09-04', 2.321 ]
    });
    chart.guide().text({
      position: [ '2016-09-04', 2.321 ],
      content: '受积极货币政策的影响，收益率降\n到历史最低2.321%',
      style: {
        textBaseline: 'bottom',
        lineHeight: 16,
        fontSize: 10
      },
      offsetY: -20
    });

    chart.line().position('time*rate');
    chart.render();
  });
