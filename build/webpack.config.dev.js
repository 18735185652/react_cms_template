const { merge } = require('webpack-merge');

console.log('merge: ', merge);

const path = require('path');
const base = require('../webpack.config.js');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map', // 不生成source-map
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
    proxy: { // 重写方式，代理
      '/api': {
        target: 'http://localhost:3000',
        // changeOrigin: true,
        pathReWrite: { '^/api': '' },
      },
    },
  },
});
