
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        polyfill: './src/polyfill.ts',
        vender: './src/vender.ts',
        app: './src/main.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets'}
        ]),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            output: __dirname + '/dist',
            inject: 'head'
        }),
        new ScriptExtPlugin({
            defaultAttribute: 'defer'
        }),
        // new webpack.ContextReplacementPlugin(
        //     // /angular(\\|\/)core(\\|\/)@angular/,
        //     /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)fesm5/,
        //     __dirname + '/dist' // Angular Source
        // ),
        // new webpack.ContextReplacementPlugin(
        //     /(.+)?angular(\\|\/)core(.+)?/, __dirname, {}
        // ),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.join(__dirname, 'src')
        )
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            /** load ts */
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            /** load images */
            // {
            //     test: /\.(png|jpg|gif|svg|ico)$/,
            //     use: [
            //     {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'images/'
            //         }
            //     }]
            // },
            /** load css */
            // {
            //     test: /\.css$/,
            //     loaders: ['style-loader','css-loader'],
            // },
            /** load sass */
            // {
            //     test: /\.scss$/,
            //     loaders: ['style-loader', 'css-loader', 'sass-loader']
            // },
        ]
    }
};