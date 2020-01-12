const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-6`
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'F2',
    description: 'The Grammar of Graphics in JavaScript',
    siteUrl: 'https://f2.antv.vision',
    githubUrl: repository.url,
    navs: [
      {
        slug: 'docs/tutorial/getting-started',
        title: {
          zh: '使用教程',
          en: 'Tutorial'
        }
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API 文档',
          en: 'API'
        }
      },
      {
        slug: 'examples',
        title: {
          zh: '图表演示',
          en: 'Examples'
        }
      }
    ],
    docs: [
      {
        slug: 'tutorial/manual',
        title: {
          zh: '教程',
          en: 'Tutorial'
        },
        order: 1
      },
      {
        slug: 'api/chart',
        title: {
          zh: '图表',
          en: 'Chart'
        },
        order: 1
      },
      {
        slug: 'api/graphic',
        title: {
          zh: '绘图',
          en: 'Graphic'
        },
        order: 2
      }
    ],
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery',
        title: {
          zh: 'Gallery',
          en: 'Gallery'
        }
      },
      {
        slug: 'line',
        icon: 'line',
        title: {
          zh: '折线图',
          en: 'Line Charts'
        }
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area Charts'
        }
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱状图',
          en: 'Column Charts'
        }
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar Charts'
        }
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie Charts'
        }
      },
      {
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'Radar Charts'
        }
      },
      {
        slug: 'point',
        icon: 'point',
        title: {
          zh: '点图',
          en: 'Point Charts'
        }
      },
      {
        slug: 'funnel',
        icon: 'funnel',
        title: {
          zh: '漏斗图',
          en: 'Funnel Charts'
        }
      },
      {
        slug: 'candlestick',
        icon: 'candlestick',
        title: {
          zh: '蜡烛图',
          en: 'Candlestick Charts'
        }
      },
      {
        slug: 'relation',
        icon: 'relation',
        title: {
          zh: '关系图',
          en: 'Relation Charts'
        }
      },
      {
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '关系图',
          en: 'Heatmap Charts'
        }
      },
      {
        slug: 'component',
        icon: 'component',
        title: {
          zh: '功能组件',
          en: 'Chart Components'
        }
      },
      {
        slug: 'other',
        icon: 'other',
        title: {
          zh: '其他图表',
          en: 'Other Chart'
        }
      }
    ],
    playground: {
      playgroundDidMount: 'window.initPlayground()',
      container: `
        <div class="mobile-container">
          <div class="mobile-header"></div>
          <div class="mobile-content">
            <canvas id="container"/>
          </div>
        </div>
      `
    },
    docsearchOptions: {
      apiKey: '349619374e9488b3f000714317d67381',
      indexName: 'antv_f2'
    }
  }
};
