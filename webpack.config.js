const { resolve } = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: resolve(__dirname, 'server/public/js/dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolveLoader: {
    root: resolve(__dirname, 'node_modules'),
  },
  devtool: 'source-map',
};
