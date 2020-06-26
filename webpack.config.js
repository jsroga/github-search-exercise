const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  context: __dirname, // to automatically find tsconfig.json
  entry: {
    main: './src/index.tsx'
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
  },
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.css', '.less', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.spec\.tsx?$/],
        use: [
          { loader: 'ts-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
  ],
  performance: {
    maxEntrypointSize: 9000000
  },
}

module.exports = config
