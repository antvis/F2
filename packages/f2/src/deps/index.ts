/**
 * 原因：
 * 因为 d3 的一些库，输出了带有 es6 语法的文件，umi 和 father 会通过 es5-imcompatible-versions 识别并进行编译，可见：https://github.com/umijs/es5-imcompatible-versions/blob/master/package.json#L52，但是小程序之类的的构建就没有这个机制，就会报下面这段错误，所以把这些依赖 fork 一份进来，走一遍构建
 * 
 * 
 * `/Users/yue/Code/github/antv/F2/packages/my/examples/test/node_modules/d3-hierarchy/src/hierarchy/iterator.js: Unexpected token (17:23)
Please set enableNodeModuleBabelTransform to true or add "d3-hierarchy" to node_modules_es6_whitelist in mini.project.json for node_modules babel transform`
 */

/**
 * d3-color from https://github.com/d3/d3-color
 * d3-interpolate from https://github.com/d3/d3-interpolate
 * d3-hierarchy from https://github.com/d3/d3-hierarchy
 */

export {};
