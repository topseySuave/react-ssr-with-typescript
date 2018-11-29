const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      gistout: ['./src/index.tsx', 'webpack-hot-middleware/client'],
      vendor: ['react', 'react-dom']
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader'
        },
        {
          test: /\.s?css$/, // This will match either .scss or .css
          include: path.join(__dirname, './src'),
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 700000, // Convert images < 8kb to base64 strings
              name: './public/images/[name].[ext]'
            }
          }]
        },
      ]
    },
    resolve: {
      extensions: [' ', '.js', '.jsx', '.json', '.ts', '.tsx'],
      modules: ['src', 'node_modules']
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src', 'index.html') }),
      new webpack.HotModuleReplacementPlugin()
    ]
}