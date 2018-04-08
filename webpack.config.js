import path from 'path';
import glob from 'glob';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

const inProduction = process.argv[process.argv.length - 1]
  .match(/[a-z]+$/g)[0] === 'production';

const basics = {
  entry: {
    app: path.join(__dirname, 'source/index.jsx'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const rules = [
  {
    test: /\.ico$/,
    loader: 'file-loader',
    options: { name: '[name].[ext]' },
  },
  {
    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      publicPath: 'assets/',
    },
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
    ],
  },
  {
    test: /\.jsx?$/,
    use: ['babel-loader'],
    exclude: ['/node_modules'],
  },
];

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new CleanWebpackPlugin('build'),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html'),
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async',
  }),
  new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, 'source/**/*.jsx')),
    minimize: inProduction,
  }),
];

export default {
  ...basics, module: { rules }, plugins,
};
