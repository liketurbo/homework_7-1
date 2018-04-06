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
    app: path.join(__dirname, 'source/index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
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
    options: { name: 'assets/[name].[ext]' },
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
    test: /\.(t|j)sx?$/, 
    use: {
       loader: 'awesome-typescript-loader',
    }, 
  },
];

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css",
  }),
  new CleanWebpackPlugin('build'),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html'),
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async',
  }),
  new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, 'public/index.html')),
    minimize: inProduction,
  }),
];

export default {
  ...basics, module: { rules }, plugins,
};