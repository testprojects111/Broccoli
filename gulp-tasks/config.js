/* eslint import/no-extraneous-dependencies:0 */


const minimist = require('minimist');

const reportsDir = 'reports';

module.exports = ({
  env: 'dev',
  nodeModulesDir: 'node_modules',
  sourceDir: 'src',
  sourceClientDir: 'src/client',
  sourceServerDir: 'src/server',
  destDir: 'public',
  cssSrcDir: 'src/client/scss',
  imgDir: 'src/client/imgs',
  viewsDir: 'src/server/views',
  testsDir: 'tests',
  autoprefixer: {
    browsers: [
      '> 1%',
      'last 2 versions',
    ],
    cascade: true,
    remove: true,
  },
});
module.exports.cloptions = minimist(process.argv.slice(2), ({
  alias: {
    d: 'debug',
    v: 'verbose',
    l: 'local',
    w: 'watch',
    c: 'coverage',
  },
  boolean: [
    'debug',
    'verbose',
    'local',
    'watch',
    'coverage',
  ]
}));
