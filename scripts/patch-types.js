const fs = require('fs');
const { join } = require('path');
const pkg = require('../package.json');

/**
 * @param {String} rootDir 根目录
 */
async function main(rootDir) {
  // 给可能被使用的入口文件添加类型
  const entryFiles = [
    'dist/f2-all.js',
    'dist/f2-all.min.js',
    'dist/f2-simple.js',
    'dist/f2-simple.min.js',
    'dist/f2.js',
    'dist/f2.min.js',
    'es/index-all.js',
    'es/index-simple.js',
    'es/index.js',
    'lib/index-all.js',
    'lib/index-simple.js',
    'lib/index.js'
  ].map(path => join(rootDir, path));
  for (const entryFile of entryFiles) {
    if (fs.existsSync(entryFile)) {
      const entryTypesFile = entryFile.replace(/\.js$/, '.d.ts');
      fs.writeFileSync(entryTypesFile, [
        `import F2 from '${pkg.name}';`,
        'export = F2;'
      ].join('\n'));
    }
  }

  // 给插件添加类型
  const pluginDirs = [
    'es/plugin',
    'lib/plugin'
  ].map(path => join(rootDir, path));
  for (const pluginDir of pluginDirs) {
    if (fs.existsSync(pluginDir)) {
      const pluginFiles = fs.readdirSync(pluginDir)
        .filter(file => file.endsWith('.js'))
        .map(file => join(pluginDir, file));
      for (const pluginFile of pluginFiles) {
        const pluginTypesFile = pluginFile.replace(/\.js$/, '.d.ts');
        fs.writeFileSync(pluginTypesFile, [
          `import F2 from '${pkg.name}';`,
          'declare const plugin: F2.Plugin;',
          'export default plugin;'
        ].join('\n'));
      }
    }
  }
}

main(join(__dirname, '..'));
