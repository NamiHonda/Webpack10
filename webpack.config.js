//絶対パスで表示させるため、このファイルまでの絶対パスを出力
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackplugin = require('html-webpack-plugin');

module.exports = {
  //エントリーポイントを登録
  //読み込むファイル名
  entry: './src/index.js',
  //出力先
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js'
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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackplugin({
      template: './src/index.html',
    }),
  ] 
}