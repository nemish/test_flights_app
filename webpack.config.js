var path = require('path');
var webpack = require('webpack');
require('es6-promise').polyfill();

var PROD = JSON.parse(process.env.NODE_ENV || '0');

var watch = true;
var plugins = []

if (PROD) {
    watch = false;
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }));
}

module.exports = {
    entry: {
        app: './app/index.js',
    },

    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, 'static', 'js'),
        publicPath: '/static/js/'
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['transform-decorators-legacy' ]
                }
            },
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    watch: watch
};