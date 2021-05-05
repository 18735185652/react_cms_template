const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const { HotModuleReplacementPlugin, DefinePlugin, IgnorePlugin } = require('webpack');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.less', '.jsx', '.ts', '.wasm'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: {
      '@': resolve('src'),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8081,
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|bmp|gif|svg)$/,
        use: [{
          loader: 'url-loader',
        }],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: { fix: true },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-proposal-private-methods', { loose: true }],
            ],
          },
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],

  },
  plugins: [
    // new WebpackBar(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      filename: 'index.html',
      chunks: ['main'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
    // 热更新
    new HotModuleReplacementPlugin(),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new DefinePlugin({
      'process.env.VERSION_APP': 'zs',
    }),
    new CleanWebpackPlugin(),

  ],
};