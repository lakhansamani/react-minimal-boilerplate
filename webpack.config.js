const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteWebPackPlugin = require('write-file-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { NODE_ENV } = process.env;

const plugins = [
  // Ignore all locale files of moment.js
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['dist/app'],
  }),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    alwaysWriteToDisk: true,
  }),
  new HtmlWebpackHarddiskPlugin(),
  new CopyWebpackPlugin({
    patterns: ['./public/favicon.ico', './public/manifest.json'],
  }),
  new WriteWebPackPlugin(),
  new Dotenv(),
];

const isDevelopment = NODE_ENV === 'development';

module.exports = {
  mode: NODE_ENV || isDevelopment,
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: isDevelopment ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDevelopment
      ? '[name].bundle.js'
      : '[name].[chunkhash:8].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Splitting React into a different bundle
        common: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function insertAtTop(element) {
                const parent = document.querySelector('head');
                // eslint-disable-next-line no-underscore-dangle
                const lastInsertedElement =
                  window._lastElementInsertedByStyleLoader;

                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                } else {
                  parent.appendChild(element);
                }

                // eslint-disable-next-line no-underscore-dangle
                window._lastElementInsertedByStyleLoader = element;
              },
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
