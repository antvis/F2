import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';
import './index.less';

const IndexPage = () => {
  const { t, i18n } = useTranslation();
  const features = [
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
      title: t('专注移动，体验优雅'),
      description: t(
        '围绕设计、性能以及异构环境，为用户提供移动端图表的最佳实践',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
      title: t('图表丰富，组件完备'),
      description: t(
        '基于图形语法，可灵活构建各类图表（50+），组件完备，覆盖各类场景',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
      title: t('扩展灵活，创意无限'),
      description: t(
        '插件机制，图形、动画、交互均可灵活扩展，使用更自由',
      ),
    },
  ];
  const companies = [
    { name: '蚂蚁财富', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/89790c1c-cc08-4270-8489-99893a57b20c.png' },
    { name: '淘票票', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/4664f031-d79c-4030-a14a-3bbf3709b51c.png', },
    { name: '钉钉', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/ce76cb7b-f916-4784-9475-6c16ad62df42.png', },
    { name: '掌上运维', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/2f9d94fc-0fae-4618-9563-3be0cc9be5eb.png', },
    { name: '支付宝', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/0014f3ad-ec8c-4023-97b4-740090cd78a2.png', },
    { name: '小红书', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/8a401562-c488-49a5-9f7e-bc1d2c6873bf.png', },
    { name: '盒马', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/ed57edff-e5d5-4e50-bccd-7002e0a4048e.png', },
    { name: '口碑', img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/9fb6be41-76d6-4ca0-be56-71a247cac5a4.png', },
  ];
  const bannerButtons = [
    {
      text: t('开始使用'),
      link: `/${i18n.language}/docs/tutorial/getting-started`,
      type: 'primary',
    },
    {
      text: t('图表演示'),
      link: `/${i18n.language}/examples/gallery`,
    },
  ];

  const cases = [
    {
      logo: 'https://antv.alipay.com/assets/image/home/f2/caifu-logo.png',
      title: t('蚂蚁财富'),
      description: t('已广泛应用于基金、定期、黄金、股票等各个金融业务场景中，支撑着蚂蚁财富 app 上众多可视化场景。同时通过深入剖析用户的可视化诉求，沉淀出多套面向金融的可视化方案。'),
      link: 'https://www.yuque.com/mo-college/f2-fund-course',
      image: 'https://antv.alipay.com/assets/image/home/f2/usecase-caifu.png',
    },
    {
      logo: 'https://antv.alipay.com/assets/image/home/f2/alipay-logo.png',
      title: t('支付宝'),
      description: t('覆盖蚂蚁会员、支付宝月账单、个人总资产等业务场景，通过可视化的形式帮助您更快更好得了解您的消费数据。'),
      image: 'https://antv.alipay.com/assets/image/home/f2/usecase-alipay.png',
    },
    {
      logo: 'https://antv.alipay.com/assets/image/home/f2/dt-logo.png',
      title: t('灯塔专业版'),
      description: t('灯塔专业版，为影视人提供有价值的数据。整合阿里海量用户数据，提供全面专业数据，让行业更加公开透明，提升行业决策效率。'),
      image: 'https://antv.alipay.com/assets/image/home/f2/usecase-tpp.png',
    },
  ];

  return (
    <>
      <SEO title={t('F2 移动端可视化方案')} titleSuffix="AntV" lang={i18n.language} />
      <Banner
        coverImage={
          <img
            width="100%"
            className="Notification-module--number--31-3Z"
            style={{ marginTop: '70px' }}
            src="https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/870e2e92-6187-4729-889c-232a7df0998a.png"
          />
        }
        title={t('F2 移动端可视化方案')}
        description={t(
          'F2 是一个专注于移动，开箱即用的可视化解决方案，完美支持 H5 环境同时兼容多种环境（Node, 小程序，Weex），完备的图形语法理论，满足你的各种可视化需求，专业的移动设计指引为你带来最佳的移动端图表体验。',
        )}
        buttons={bannerButtons}
        className='banner'
      />
      <Features
        features={features}
        style={{ width: '100%' }}
      />
      <Cases cases={cases} />
      <Companies
        title={t('感谢信赖')}
        companies={companies}
      />
    </>
  );
};

export default IndexPage;
