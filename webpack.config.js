var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: './static/jsx/main.jsx',
  output: { path: path.resolve('./static/js/app/'), 
      filename: 'bundle.js' 
    },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};