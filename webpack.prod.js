const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['react',
              [
                'env',
                {
                  targets: {
                    browsers: ['last 1 version', 'ie >= 11', 'firefox esr'],
                  },
                  modules: false,
                },
              ], 'stage-1',
            ],
            plugins: ['transform-react-remove-prop-types'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
});
