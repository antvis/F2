import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';

const IndexPage = () => {
  const { t, i18n } = useTranslation();
  const features = [
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
      title: t('简单方便'),
      description: t(
        '从数据出发，仅需几行代码可以轻松获得想要的图表展示效果。',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
      title: t('方便可靠'),
      description: t(
        '大量产品实践之上，提供绘图引擎、完备图形语法，专业设计规范。',
      ),
    },
    {
      icon:
        'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
      title: t('无限可能'),
      description: t(
        '任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。',
      ),
    },
  ];
  const companies = [
    { name: '蚂蚁财富', img: 'https://antv.alipay.com/assets/image/home/f2/mayicaifu.png' },
    { name: '淘票票', img: 'https://antv.alipay.com/assets/image/home/f2/taopiaopiao.png', },
    { name: '钉钉', img: 'https://antv.alipay.com/assets/image/home/f2/dingding.png', },
    { name: '支付宝', img: 'https://antv.alipay.com/assets/image/home/f2/alipay.png', },
    { name: '小红书', img: 'https://antv.alipay.com/assets/image/home/f2/xiaohongshu.png', },
    { name: '盒马', img: 'https://antv.alipay.com/assets/image/home/f2/hema.png', },
    { name: '口碑', img: 'https://antv.alipay.com/assets/image/home/f2/koubei.png', },
  ];
  const bannerButtons = [
    {
      text: t('开始使用'),
      link: './docs/tutorial/getting-started',
      type: 'primary',
    },
    {
      text: t('demo演示'),
      link: './examples/basic',
    },
  ];
  const notifications = [
  ];

  const cases = [
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*-dLnTIexOxwAAAAAAAAAAABkARQnAQ',
      title: t('精品 Gallery'),
      description: t('真实的数据可视化案例，我们将它们归纳为一个个故事性的设计模板，让用户达到开箱即用的效果。'),
      link: 'examples/basic',
      image: 'https://antv.alipay.com/assets/image/home/f2/usecase-caifu.png',
    },
  ];

  return (
    <>
      <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
      <Banner
        coverImage={
          <img
            width="100%"
            className="Notification-module--number--31-3Z"
            style={{ marginLeft: '125px', marginTop: '50px' }}
            src="https://gw.alipayobjects.com/zos/rmsportal/yFuPizVQnXnCMNVrZhaX.png"
          />
        }
        title={t('F2 移动端可视化方案')}
        description={t(
          'F2 是一个专注于移动，开箱即用的可视化解决方案，完美支持 H5 环境同时兼容多种环境（Node, 小程序，Weex），完备的图形语法理论，满足你的各种可视化需求，专业的移动设计指引为你带来最佳的移动端图表体验。',
        )}
        buttons={bannerButtons}
        notifications={notifications}
        className='banner'
      />
      <Features
        features={features}
        style={{ width: '100%' }}
      />
      <Cases cases={cases} />
      <Companies
        title={t('合作公司')}
        companies={companies}
      />
    </>
  );
};

export default IndexPage;
