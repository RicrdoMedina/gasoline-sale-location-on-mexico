const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = (env, argv) => {

  const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/[name].[hash].css')
  ]

  if (argv.mode === 'production') {
    plugins.push(
      new CleanWebpackPlugin(['dist'], {root:__dirname}),
      new HtmlWebpackPlugin({
        filename: '../index.html',
        template: './templates/index.ejs',
        title: 'Cotizador de criptomonedas',
        minify: {
          collapseWhitespace: 'false'
        }
      })
    )
  }

  return {
    entry: path.resolve(__dirname,'src/js/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].js',
      publicPath: './dist',
    },
    devServer:{
      port: 8080,
      hot: true,
      open: true
    },
    module:{
      rules: [
        {
          test: /\.(js)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.resolve(__dirname, './src')]
        },
        {
          test:/\.js$/,
          use:{
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        },
        {
          test:/\.css$/,
          use: ExtractTextPlugin.extract({
            use:[
              {
                loader:'css-loader',
                options: {
                  minimize: false
                }
              },
              'postcss-loader'
            ]
          }),
        },
        {
          test:/\.(jpg|png|gif|woff|eot|ttf|svg)$/,
          use:{
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: '/images/[name].[hash].[ext]'
            }
          }
        },
      ]
    },
    plugins
  }
};

module.exports = config;