var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    javascript: './static/jsx/main.jsx'
  },
  output: {
      path: path.resolve('./static/js/app/'),
      filename: 'bundle.js'
    },
  module: {    
    preLoaders: [
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'source-map'
        }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      }, 
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader?limit=25000',
      }
    ]
  },
};
