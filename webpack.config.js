//絶対パスで表示させるため、このファイルまでの絶対パスを出力
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackplugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  //エントリーポイントを登録
  //読み込むファイル名
  entry: './src/javascripts/main.js',
  //出力先
  output: {
    path: path.resolve(__dirname, './htdocs'),
    filename: 'javascripts/main.js'
  },
  //modeの指定
  mode: 'development', 
  module: {
    rules: [
      {
        test:/\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env',{'targets':'>0.25%,not dead'}],
                '@babel/preset-react',
              ],
            }
          },
        ]
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                 require('autoprefixer')({ grid: true })
                ],
              },
            },
          },
          {
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /\.(png|jpg|jpeg)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     esModule: false,
          //     name: 'images/[name].[ext]',
          //   },
          // },

          // 追加
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            }
          },
        ]
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, 'src'),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: './stylesheets/main.css'
    }),
    new HtmlWebpackplugin({
      template: './src/templates/index.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackplugin({
      template: './src/templates/access.pug',
      filename: 'access.html',
    }),
    new HtmlWebpackplugin({
      template: './src/templates/members/taro.pug',
      filename: 'members/taro.html',
    }),
    new CleanWebpackPlugin(),
  ] ,

}

