import { defineConfig } from 'dumi';
import { repository } from './package.json';

export default defineConfig({
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  themeConfig: {
    title: 'F2', // 网站header标题
    metas: {
      title: { zh: 'F2 移动端可视化引擎', en: 'F2 Mobile Visualization Engine' },
      description: {
        zh: 'F2 是一个专注于移动端，面向常规统计图表，开箱即用的可视化引擎，完美支持 H5 环境同时兼容多种环境（Node, 小程序），完备的图形语法理论，满足你的各种可视化需求，专业的移动设计指引为你带来最佳的移动端图表体验。',
        en: 'F2 is a mobile-focused, ready-to-use visualization engine designed for standard statistical charts. It perfectly supports H5 environments while being compatible with various platforms (Node, Mini Programs). With a comprehensive graphical syntax theory, it meets all your visualization needs. Its professional mobile design guidelines provide the best charting experience on mobile devices.',
      },
    },
    siteUrl: 'https://f2.antv.antgroup.com',
    defaultLanguage: 'zh',
    feedback: true, // 开启文档用户反馈
    sitePackagePath: 'packages/site', // 文档项目相对于项目根目录的相对路径
    links: true, // 是否显示links答疑小蜜
    petercat: {
      show: true,
      token: 'd54d0b62-8070-46a5-a721-38132a34b8a1', // 此处填 Petercat token
    },
    isAntVSite: false,
    sitemap: {}, // 开启并采用默认配置
    deadLinkChecker: {}, // 开启并采用默认配置
    githubUrl: repository.url, // GitHub 地址
    footerTheme: 'light', // 白色 底部主题
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: true, // 是否显示 GitHub star 数量
    showAntVProductsCard: true, // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: false, // 是否在 demo 页展示API文档
    versions: {
      ['5.10.0']: 'https://f2.antv.antgroup.com',
      '4.x': 'https://f2-v4.antv.vision',
      '3.x': 'https://f2-v3.antv.vision',
    },
    navs: [
      {
        slug: 'docs/tutorial/getting-started',
        title: {
          zh: '教程',
          en: 'Manual',
        },
      },
      {
        slug: 'docs/api',
        title: {
          zh: '组件API',
          en: 'Component Documentation',
        },
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
      },
    ],
    docs: [
      {
        slug: 'api/chart',
        title: {
          zh: '图表 - Chart',
          en: 'Chart',
        },
        order: 4,
      },
      {
        slug: 'api/chart/guide',
        title: {
          zh: '标注 - Guide',
          en: 'Guide',
        },
        order: 10,
      },
      {
        slug: 'tutorial/framework',
        title: {
          zh: '多端/框架 - Framework',
          en: 'Framework',
        },
        order: 70,
      },
      {
        slug: 'tutorial/advanced',
        title: {
          zh: '进阶 - Advanced',
          en: 'Advanced',
        },
        order: 80,
      },
      {
        slug: 'tutorial/question',
        title: {
          zh: '常见问题 - Question',
          en: 'Question',
        },
        order: 90,
      },
    ],
    cases: [
      {
        logo: 'https://antv.alipay.com/assets/image/home/f2/caifu-logo.png',
        title: {
          zh: '蚂蚁财富',
          en: 'Ant Fortune',
        },
        description: {
          zh: '已广泛应用于基金、定期、黄金、股票等各个金融业务场景中，支撑着蚂蚁财富 app 上众多可视化场景。同时通过深入剖析用户的可视化诉求，沉淀出多套面向金融的可视化方案。',
          en: 'It has been widely used in various financial business scenarios such as funds, fixed-term, gold, and stocks, and supports many visualization scenarios on the Ant Fortune app. At the same time, through in-depth analysis of users visualization demands, a number of financial-oriented visualization solutions have been developed',
        },
        link: 'https://www.yuque.com/mo-college/f2-fund-course',
        image:
          'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/b2d3eebe-f3c0-45b7-a608-161d38f8c432.png',
      },
      {
        logo: 'https://antv.alipay.com/assets/image/home/f2/alipay-logo.png',
        title: {
          zh: '支付宝',
          en: 'Alipay',
        },
        description: {
          zh: '覆盖蚂蚁会员、支付宝月账单、个人总资产等业务场景，通过可视化的形式帮助您更快更好得了解您的消费数据。',
          en: 'Covering business scenarios such as ant membership, Alipay monthly bills, personal total assets, etc., helping you to understand your consumption data faster and better through visualization',
        },
        image: 'https://antv.alipay.com/assets/image/home/f2/usecase-alipay.png',
      },
      {
        logo: 'https://antv.alipay.com/assets/image/home/f2/dt-logo.png',
        title: {
          zh: '灯塔专业版',
          en: 'Beacon Pro',
        },
        description: {
          zh: '灯塔专业版，为影视人提供有价值的数据。整合阿里海量用户数据，提供全面专业数据，让行业更加公开透明，提升行业决策效率。',
          en: 'Beacon Professional Edition, providing valuable data for film and television people. Integrate Alibabas massive user data, provide comprehensive professional data, make the industry more open and transparent, and improve the efficiency of industry decision-making',
        },
        image: 'https://antv.alipay.com/assets/image/home/f2/usecase-tpp.png',
      },
    ],
    detail: {
      engine: {
        zh: 'F2',
        en: 'F2',
      },
      title: {
        zh: 'F2·移动端可视化引擎',
        en: 'F2·Mobile visualization engine',
      },
      description: {
        zh: 'F2 是一个专注于移动端，面向常规统计图表，开箱即用的可视化引擎，完美支持 H5 环境同时兼容多种环境（Node, 小程序），完备的图形语法理论，满足你的各种可视化需求，专业的移动设计指引为你带来最佳的移动端图表体验。',
        en: 'F2 is an out-of-the-box visualization engine focused on the mobile terminal, oriented to conventional statistical charts, perfectly supporting the H5 environment and compatible with multiple environments (Node, applet), complete graphics grammar theory, to meet your various visualization needs , professional mobile design guidelines to bring you the best mobile graphics experience',
      },
      image:
        'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*wi05Q7Za5ZIAAAAAAAAAAAAADmJ7AQ/original',
      imageStyle: {
        marginLeft: '80px',
        marginTop: '30px',
        transform: 'scale(1.4)',
      },
      buttons: [
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/tutorial/getting-started`,
        },
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples`,
          type: 'primary',
        },
      ],
    },
    features: [
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
        title: {
          zh: '专注移动，体验优雅',
          en: 'focus on mobile, experience elegance',
        },
        description: {
          zh: '围绕设计、性能以及异构环境，为用户提供移动端图表的最佳实践',
          en: 'provide users with best practices for mobile charts around design, performance, and heterogeneous environments',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
        title: {
          zh: '图表丰富，组件完备',
          en: 'rich charts and complete components',
        },
        description: {
          zh: '基于图形语法，可灵活构建各类图表（50+），组件完备，覆盖各类场景',
          en: 'based on graphics syntax, various charts (50+) can be flexibly constructed, with complete components, covering various scenarios',
        },
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
        title: {
          zh: '扩展灵活，创意无限',
          en: 'flexible expansion, unlimited creativity',
        },
        description: {
          zh: '插件机制，图形、动画、交互均可灵活扩展，使用更自由',
          en: 'plug-in mechanism, graphics, animations, and interactions can be flexibly expanded and used more freely',
        },
      },
    ],
    companies: [
      {
        name: '蚂蚁财富',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/89790c1c-cc08-4270-8489-99893a57b20c.png',
      },
      {
        name: '淘票票',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/4664f031-d79c-4030-a14a-3bbf3709b51c.png',
      },
      {
        name: '钉钉',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/ce76cb7b-f916-4784-9475-6c16ad62df42.png',
      },
      {
        name: '掌上运维',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/2f9d94fc-0fae-4618-9563-3be0cc9be5eb.png',
      },
      {
        name: '支付宝',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/0014f3ad-ec8c-4023-97b4-740090cd78a2.png',
      },
      {
        name: '小红书',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/8a401562-c488-49a5-9f7e-bc1d2c6873bf.png',
      },
      {
        name: '盒马',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/ed57edff-e5d5-4e50-bccd-7002e0a4048e.png',
      },
      {
        name: '口碑',
        img: 'https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/9fb6be41-76d6-4ca0-be56-71a247cac5a4.png',
      },
    ],
    examples: [
      {
        slug: 'creative',
        icon: 'gallery',
        title: {
          zh: '场景案例',
          en: 'Creative Charts',
        },
      },
      {
        slug: 'line',
        icon: 'line',
        title: {
          zh: '折线图',
          en: 'Line Charts',
        },
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area Charts',
        },
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱状图',
          en: 'Column Charts',
        },
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar Charts',
        },
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie Charts',
        },
      },
      {
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'Radar Charts',
        },
      },
      {
        slug: 'point',
        icon: 'point',
        title: {
          zh: '点图',
          en: 'Point Charts',
        },
      },
      {
        slug: 'funnel',
        icon: 'funnel',
        title: {
          zh: '漏斗图',
          en: 'Funnel Charts',
        },
      },
      {
        slug: 'relation',
        icon: 'relation',
        title: {
          zh: '关系图',
          en: 'Relation Charts',
        },
      },
      {
        slug: 'candlestick',
        icon: 'candlestick',
        title: {
          zh: 'K 线图',
          en: 'Candlestick Charts',
        },
      },
      {
        slug: 'component',
        icon: 'component',
        title: {
          zh: '功能组件',
          en: 'Chart Components',
        },
      },
      {
        slug: 'other',
        icon: 'other',
        title: {
          zh: '其他图表',
          en: 'Other Chart',
        },
      },
    ],
    playground: {
      playgroundDidMount: 'window.initPlayground()',
      dependencies: {
        '@antv/f2': '5.x',
      },
      devDependencies: {
        typescript: 'latest',
      },
      container: `
          <div class="mobile-container">
            <div class="mobile-header"></div>
            <div class="mobile-content">
              <canvas id="container" style="display: block; width: 375px; height: 260px;" />
            </div>
             <div id="mobile-footer"></div>
          </div>
        `,
      json: {
        // riddle 需要添加如下配置
        gravity: {
          gmap: { '@antv/f2': '@antv/f2/dist/index.min.js' },
        },
      },
    },
    docsearchOptions: {
      apiKey: '349619374e9488b3f000714317d67381',
      indexName: 'antv_f2',
    },
  },
  runtimePublicPath: {},
  headScripts: [
    'https://polyfill.alicdn.com/v3/polyfill.js?features=Intl.RelativeTimeFormat,Intl.RelativeTimeFormat.~locale.en',
    'https://cdn.jsdelivr.net/npm/lil-gui@0.19',
  ],
  legacy: {},
  ...(process.env.NODE_ENV === 'production'
    ? { ssr: { builder: 'webpack' }, mako: false }
    : { ssr: false, mako: {} }),
});
