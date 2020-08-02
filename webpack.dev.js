const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: "./src/client/index.js",
    output: {
      libraryTarget: "var",
      library: "Client"
    },
    stats: 'verbose',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader' , 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ verbose: true }),
        new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        hash: true,
        xhtml: true
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}
