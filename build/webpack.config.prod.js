const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('optimize-css-assets-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const glob = require('glob');
const path = require('path');
const base = require('../webpack.config.js');

const PATHS = {
  src: path.join(__dirname, 'src'),
};
module.exports = merge(base, {
  mode: 'production',
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: 'all', // 分割同步和异步代码块
      minSize: 0, // 最小体积
      minRemainingSize: 0, // 代码分割后的最小保留体积,默认等于minSize
      maxSize: 0, // 最大体积
      minChunks: 1, // 最小代码块
      maxAsyncRequests: 30, // 最大异步请求数
      maxInitialRequests: 30, // 最小异步请求数
      automaticNameDelimiter: '~', // 名称分离符
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 控制此缓存组选择哪些模块
          priority: -10, // 一个模块属于多个缓存组,默认缓存组的优先级是负数，自定义缓存组的优先级更高，默认值为0
          // 如果当前代码块包含已经主代码块中分离出来的模块，那么它将被重用，而不是生成新的模块。这可能会影响块的结果文件名。
        },
        default: {
          minChunks: 2,
          priority: -20,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 去除 js 中的注释
        terserOptions: {
          ecma: 6,
          warnings: false,
          format: {
            comments: false,
          },
          compress: {
            drop_console: true, // 去除 console 打印
          },
          ie8: false,
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // 移除无用的css
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
  ],
});
