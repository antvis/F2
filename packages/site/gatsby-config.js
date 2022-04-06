const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-6`,
      },
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'F2',
    description: 'The Grammar of Graphics in JavaScript',
    siteUrl: 'https://f2.antv.vision',
    githubUrl: repository.url,
    versions: {
      '4.x': 'https://f2.antv.vision',
      '3.x': 'https://f2-v3.antv.vision',
    },
    navs: [
      {
        slug: 'docs/tutorial/getting-started',
        title: {
          zh: '使用文档',
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
        slug: 'examples/gallery',
        title: {
          zh: '图表示例',
          en: 'Gallery',
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
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery',
        title: {
          zh: '',
          en: '',
        },
      },
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
        slug: 'candlestick',
        icon: 'candlestick',
        title: {
          zh: '蜡烛图',
          en: 'Candlestick Charts',
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
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heatmap Charts',
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
      devDependencies: {
        typescript: 'latest',
      },
      container: `
        <div class="mobile-container">
          <div class="mobile-header"></div>
          <div class="mobile-content">
            <canvas id="container" style="display: block; width: 375px; height: 260px;" />
          </div>
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
};
