var path = require('path');
var webpack = require('webpack');
 
var path = require('path');
var webpack = require('webpack');


module.exports = {
  entry: './static/ts/main.jsx',
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