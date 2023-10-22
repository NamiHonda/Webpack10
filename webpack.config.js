//絶対パスで表示させるため、このファイルまでの絶対パスを出力
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  //エントリーポイントを登録
  //読み込むファイル名
  entry: './src/javascripts/main.js',
  //出力先
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/main.js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg)/,
        use: [
          {
            loader: 'file-loader',
              options: {
                esModule: false,
                name: 'images/[name].[ext]',
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/main.css'
    }),
    new HtmlWebpackplugin({
      template: './src/templates/index.html',
    }),
    new CleanWebpackPlugin(),
  ] 
}