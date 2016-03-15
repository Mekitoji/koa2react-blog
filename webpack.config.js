const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exlude: /node_modules/,
      },
    ],
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  devtool: 'source-map',
};
