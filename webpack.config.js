const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIRECTORY = 'self-manager-package';
const pathsToClean = [BUILD_DIRECTORY];
const cleanOptions = {};
const mode = process.env.NODE_ENV;

const styleLoaderOpts = ({
  modules = false,
  stylusLoader = false,
}) => {
  const options = {
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        modules,
        camelCase: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
        importLoaders: 1,
      },
    },{
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')()
        ]
      }
    }]
  };
  if (stylusLoader) {
    options.use[0].options.importLoaders = 2;
    options.use.push('stylus-loader');
  }
  return options;
};

module.exports = {
  mode: mode,
  entry: path.join(__dirname, './src/bootstrap.jsx'),
  output: {
    path: path.resolve(__dirname, BUILD_DIRECTORY),
    filename: 'js/self-manager.[hash].js',
    // publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
    },{
      test: /\.css$/,
      use: ExtractTextPlugin.extract(styleLoaderOpts({})),
    },{
      test: /\.styl$/,
      use: ExtractTextPlugin.extract(styleLoaderOpts({ modules: true, stylusLoader: true })),
    },{
      test: /\.(eot|woff|ttf)$/,
      loader: 'file-loader',
      options: {
        useRelativePath: true,
        outputPath: 'font/',
        publicPath: '../resources/icons/'
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new HtmlWebpackPlugin({
      title: 'SELF-MANAGER',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('css/self-manager.[hash].css'),
    new CopyWebpackPlugin([{
      from: './extensions/manifest.json',
      to: '',
    }])
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.styl', '.css', '.json'],
  },
  devServer: {
    contentBase: path.join(__dirname, BUILD_DIRECTORY),
    compress: true,
    port: 9000,
    historyApiFallback: false,
  },
};
