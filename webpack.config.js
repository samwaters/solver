const path = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')

const APP_DIR = path.join(__dirname, 'src')
const BUILD_DIR = path.join(__dirname, 'dist')

module.exports = {
    devServer: {
        hot: true,
        port: 9002,
        static: path.join(__dirname, 'dist'),
    },
    entry: {
        app: APP_DIR + '/index.tsx',
        vendor: [
            '@redux-saga/core',
            'react',
            'react-dom',
            'react-redux',
            'redux',
        ],
        worker: APP_DIR + '/worker/worker.ts',
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [{ loader: 'url-loader' }],
            },
            {
                exclude: /node_modules/,
                include: APP_DIR,
                test: /\.(js|jsx|ts|tsx)$/,
                use: [{ loader: 'babel-loader' }],
            },
        ],
    },
    output: {
        filename: '[name].prod.js',
        path: BUILD_DIR,
    },
    plugins: [
        new webpack.optimize.SplitChunksPlugin(),
        new webpack.DefinePlugin({
            mode: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new ESLintPlugin(),
    ],
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'src', 'actions'),
            components: path.resolve(__dirname, 'src', 'components'),
            reducers: path.resolve(__dirname, 'src', 'reducers'),
            sagas: path.resolve(__dirname, 'src', 'sagas'),
            selectors: path.resolve(__dirname, 'src', 'selectors'),
            theme: path.resolve(__dirname, 'src', 'theme'),
            utils: path.resolve(__dirname, 'src', 'utils'),
        },
        extensions: ['.css', '.js', '.jsx', '.json', '.scss', '.ts', '.tsx'],
        modules: ['node_modules'],
    },
}
