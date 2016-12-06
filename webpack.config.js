var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        "./app/main.ts"
        ],
    resolve: {
        modulesDirectories: [
            "./node_modules/", "app"
        ],
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    output: {
        filename: "./zip/bundle.js",
        libraryTarget: "amd"
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    color: ['#c23531', '#2f4554'],
    plugins: [
        new CopyWebpackPlugin([
            {from: "manifest.json", to: "./zip/"},
            {from: "icon*.png", to: "./zip/"},
            {from: "devtools.html", to: "./zip/"},
            {from: "index.production.html", to: "./zip/index.html"},
            {from: "styles.css", to: "./zip/"},
            {from: "node_modules/angular2/bundles/angular2-polyfills.js", to: "./zip/libs/angular2/bundles/angular2-polyfills.js"},
            {from: "node_modules/angular2/bundles/angular2.dev.js", to: "./zip/libs/angular2/bundles/angular2.dev.js"},
            {from: "node_modules/rxjs/bundles/Rx.js", to: "./zip/libs/rxjs/bundles/Rx.js"}
        ])
    ]
};
