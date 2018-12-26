const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pathsToClean = [
  'dist',
  'build'
];
const cleanOptions = {};
const mode = process.env.NODE_ENV;

module.exports = {
  mode: mode,
  entry: path.join(__dirname, './src/bootstrap.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bootstrap.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|styl)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // blueprintjs库不支持css modules
                modules: false,
                camelCase: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')()
                ]
              }
            },
            'stylus-loader'
          ]
        }),
      },
      {
        test: /\.(eot|woff|ttf)$/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          outputPath: 'font/',
          publicPath: '../resources/icons/'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new HtmlWebpackPlugin({
      title: 'SELF-MANAGER',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('css/self-manager.css')
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
