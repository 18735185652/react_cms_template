const { merge } = require('webpack-merge');

const path = require('path');
const base = require('../webpack.config.js');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map', // 不生成source-map
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8082,
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: {
      index: '/index.html',
    },
    proxy: {
      '/api': {
        // 要访问的跨域的域名
        target: 'http://localhost:3000',
        // ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
});
