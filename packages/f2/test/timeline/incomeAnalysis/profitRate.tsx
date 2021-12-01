import { jsx } from '../../../src';
import { px2hd } from '../../../src/util';
import { getTranslateMatrix, toSignedPercent } from './util';
import Text from './text';
import Image from './image';
import Block from './block';

const images = [
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/978fb991-68dc-4dcb-9db8-1b731ea3ade6.png',
    w: px2hd('97px'),
    h: px2hd('199px'),
    start: {
      x: px2hd('52px'),
      y: px2hd('400px'),
    },
    end: {
      x: px2hd('52px'),
      y: px2hd('140px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/9601b747-81ef-4603-b7b9-b51c79ff48a4.png',
    w: px2hd('75px'),
    h: px2hd('123px'),
    start: {
      x: px2hd('154px'),
      y: px2hd('400px'),
    },
    end: {
      x: px2hd('154px'),
      y: px2hd('216px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/9601b747-81ef-4603-b7b9-b51c79ff48a4.png',
    w: px2hd('75px'),
    h: px2hd('123px'),
    start: {
      x: px2hd('454px'),
      y: px2hd('400px'),
    },
    end: {
      x: px2hd('454px'),
      y: px2hd('254px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/0183942e-d2aa-401e-a33c-ce179c583e86.png',
    w: px2hd('70px'),
    h: px2hd('124px'),
    start: {
      x: px2hd('518px'),
      y: px2hd('400px'),
    },
    end: {
      x: px2hd('518px'),
      y: px2hd('50px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/7460e508-923c-40d0-b633-adc8de5f3f95.png',
    w: px2hd('157px'),
    h: px2hd('159px'),
    start: {
      x: px2hd('544px'),
      y: px2hd('400px'),
    },
    end: {
      x: px2hd('544px'),
      y: px2hd('180px'),
    },
  },
];

const negativeImages = [
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/60840258-155f-401f-83eb-a70cdcb6d76b.png',
    w: px2hd('97px'),
    h: px2hd('219px'),
    start: {
      x: px2hd('40px'),
      y: px2hd('-220px'),
    },
    end: {
      x: px2hd('40px'),
      y: px2hd('20px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/39b71b9f-4847-4988-afc9-47acc5503cc9.png',
    w: px2hd('75px'),
    h: px2hd('136px'),
    start: {
      x: px2hd('136px'),
      y: px2hd('-200px'),
    },
    end: {
      x: px2hd('136px'),
      y: px2hd('168px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/39b71b9f-4847-4988-afc9-47acc5503cc9.png',
    w: px2hd('75px'),
    h: px2hd('136px'),
    start: {
      x: px2hd('418px'),
      y: px2hd('-200px'),
    },
    end: {
      x: px2hd('418px'),
      y: px2hd('-30px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/a4dcdaf3-c1d4-45e3-a6ce-1c4fc8161504.png',
    w: px2hd('68px'),
    h: px2hd('124px'),
    start: {
      x: px2hd('494px'),
      y: px2hd('-200px'),
    },
    end: {
      x: px2hd('494px'),
      y: px2hd('190px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/93a05535-b5e1-47cf-9739-a1eaa0886313.png',
    w: px2hd('157px'),
    h: px2hd('216px'),
    start: {
      x: px2hd('544px'),
      y: px2hd('-220px'),
    },
    end: {
      x: px2hd('544px'),
      y: px2hd('-54px'),
    },
  },
];

export default (props, context) => {
  const { data } = props;
  const { width, height } = context;
  const center = {
    x: width / 2,
    y: height / 2,
  };
  const { monthProfitRate, rankRate } = data;
  // 正收益
  if (monthProfitRate >= 0) {
    return (
      <group
        animation={{
          leave: {
            easing: 'quinticIn',
            property: ['matrix'],
            duration: 500,
            start: {},
            end: {
              matrix: getTranslateMatrix(0, -center.y),
            },
          },
        }}
      >
        <Image images={images} delay={1400} interval={100} />
        <group>
          <Text
            delay={400}
            text={[
              { text: '月收益率', fontSize: '36px', fontWeight: 500, fill: '#333333' },
              { text: ' 达到了', fontSize: '30px', fill: '#333333' },
            ]}
          />
          <Block
            delay={900}
            center={center}
            fontSize={px2hd('64px')}
            padding={[px2hd('30px'), px2hd('60px'), px2hd('30px'), px2hd('60px')]}
            value={toSignedPercent(monthProfitRate)}
            fill="#EB5662"
            leaveAnimation={rankRate < 0.1 ? true : false}
          />
        </group>
      </group>
    );
  }
  return (
    <group
      animation={{
        leave: {
          easing: 'quinticIn',
          property: ['matrix'],
          duration: 500,
          start: {},
          end: {
            matrix: getTranslateMatrix(0, -center.y),
          },
        },
      }}
    >
      <Image images={negativeImages} delay={1400} interval={100} />
      <group>
        <Text
          delay={400}
          text={[{ text: '月收益率 ', fontSize: '36px', fontWeight: 500, fill: '#333333' }]}
        />
        <Block
          delay={900}
          center={center}
          fontSize={px2hd('64px')}
          padding={[px2hd('30px'), px2hd('60px'), px2hd('30px'), px2hd('60px')]}
          value={toSignedPercent(monthProfitRate)}
          fill="#3EAD91"
          leaveAnimation={rankRate < 0.1 ? true : false}
        />
      </group>
    </group>
  );
};
