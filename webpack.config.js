const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// var babelLoader = {
//   loader: 'babel-loader',
//   options: {
//     cacheDirectory: true,
//     presets: ['@babel/preset-env'],
//   }
// };

module.exports = {
  mode: "production",
  entry: './src/index.tsx',
  devtool: "source-map",

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: [
          {
            loader:'url-loader',
            options: {
              limit: false,
              outputPath: 'img',
              name: "[name].[hash].[ext]",
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html')
    })
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      context: () => true,
      // target: 'http://localhost:3001'
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: {'^/api' : ''}
      }
    }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
};