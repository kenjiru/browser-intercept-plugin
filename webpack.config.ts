import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

const buildDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');

const config = {
    devtool: 'source-map',
    output: {
        path: buildDir,
        filename: '[name].js',
    },
    entry: {
        background: path.join(srcDir, './background.ts'),
        devtools_page: path.join(srcDir, './devtools_page.ts'),
        devtools_panel: path.join(srcDir, './devtools_panel.tsx'),
    },
    resolve: {
        extensions: ['.webpack.js', '.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
            }, {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader'],
            }, {
                test: /\.less/,
                loaders: ['style-loader', 'css-loader', 'less-loader'],
            }, {
                test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
                loader: "url-loader",
                query: {
                    limit: 5000,
                    name: "[path][name].[ext]",
                    hash: "[hash]"
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Background Script',
            chunks: ['background'],
            template: require('html-webpack-template'),
            filename: 'background.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            title: 'DevTools Page',
            chunks: ['devtools_page'],
            template: require('html-webpack-template'),
            filename: 'devtools_page.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            title: 'DevTools Panel',
            chunks: ['devtools_panel'],
            template: require('html-webpack-template'),
            filename: 'devtools_panel.html',
            inject: false,
            appMountId: 'root',
        }),
        new CopyWebpackPlugin([
            {
                context: 'src/',
                from: 'icons/*',
            }, {
                context: 'src/',
                from: 'manifest.json',
            }
        ]),
    ]
};

export default config;
