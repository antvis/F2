import { jsx } from '../../../src';
import { px2hd } from '../../../src/util';
import formatter from './formatter';
import { getTranslateMatrix } from './util';
import Text from './text';
import Image from './image';
import Block from './block';

const images = [
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/66f7c27b-96a9-4f19-8d3e-a72fdb7a5df2.png',
    w: px2hd('279px'),
    h: px2hd('289px'),
    start: {
      x: px2hd('-287px'),
      y: px2hd('-349px'),
    },
    end: {
      x: px2hd('-8px'),
      y: px2hd('-60px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/77c5b48f-1b85-4a93-b8a6-eb4c16e44d00.png',
    w: px2hd('398px'),
    h: px2hd('367px'),
    start: {
      x: px2hd('-384px'),
      y: px2hd('-325px'),
    },
    end: {
      x: px2hd('14px'),
      y: px2hd('42px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/98a3bc30-74f2-4f40-977f-329049f51fee.png',
    w: px2hd('264px'),
    h: px2hd('279px'),
    start: {
      x: px2hd('792px'),
      y: px2hd('295px'),
    },
    end: {
      x: px2hd('528px'),
      y: px2hd('16px'),
    },
  },
  {
    src:
      'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/98a3bc30-74f2-4f40-977f-329049f51fee.png',
    w: px2hd('348px'),
    h: px2hd('367px'),
    start: {
      x: px2hd('802px'),
      y: px2hd('483px'),
    },
    end: {
      x: px2hd('454px'),
      y: px2hd('116px'),
    },
  },
];

export default (props, context) => {
  const key = 'totalAmount';
  const { data } = props;
  const { width, height } = context;
  const { month, monthAmount } = data;
  const center = {
    x: width / 2,
    y: height / 2,
  };
  const { width: valueWidth } = context.measureText(formatter.amountFormat(monthAmount), {
    fontSize: px2hd('64px'),
    fontFamily: 'AlipayNumber',
  });
  const goldImages = [1, 2, 3].map((_, i) => {
    const x = center.x - valueWidth / 2 - px2hd('60px') - px2hd('35px');
    return {
      src:
        'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/d93a204c-1ef1-42a1-b180-78a52562725c.png',
      w: px2hd('70px'),
      h: px2hd('30px'),
      start: {
        x: x,
        y: px2hd('-100px'),
      },
      end: {
        x: x,
        y: px2hd('200px') - px2hd('14px') * i,
      },
    };
  });
  return (
    <group key={key}>
      <Image delay={1000} images={images} />
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
        <Text
          text={[
            { text: `客官，到${month}月底，你的`, fontSize: '30px', fill: '#333333' },
            { text: ' 总资产 ', fontSize: '36px', fontWeight: 500, fill: '#333333' },
            { text: '有', fontSize: '30px', fill: '#333333' },
          ]}
        />
        <Block
          delay={500}
          center={center}
          fontSize={px2hd('64px')}
          padding={[px2hd('30px'), px2hd('60px'), px2hd('30px'), px2hd('60px')]}
          value={formatter.amountFormat(monthAmount)}
          suffixText=" 元"
          fill="#1677FF"
        />
        <Image delay={500} images={goldImages} easing="quadraticIn" interval={60} />
      </group>
    </group>
  );
};
