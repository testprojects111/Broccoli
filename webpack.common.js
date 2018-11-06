const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AssetPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    app: './src/client/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/bundles'),
    filename: '[name].js',
    publicPath: '/bundles/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },
  resolve: {
    modules: ['node_modules'],
  },
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
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['public/bundles/']),
    new AssetPlugin({ filename: 'bundles.json', path: path.resolve(__dirname, 'src', 'server') }),
  ],
};
