var path = require('path');
var extract_text_plugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    javascript: './static/jsx/main.jsx'
  },
  output: {
      path: path.join(__dirname, 'static/js/app/'),
      filename: 'bundle.js'
    },
  module: {    
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: extract_text_plugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"],
          publicPath: "/dist"
        })
      },
      {
        test: /\.(jpg|png)$/,
        use: 'url-loader?limit=25000',
      }
    ]
  },
  plugins: [
      new extract_text_plugin({
        filename: "main.css",
        disable: false,
        allChunks: true
      })
    ],
};
