var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: "./index.tsx",
    },
    
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
    },

    plugins: [
        //new CommonsChunkPlugin("commons", "commons.bundle.js", ["index", "article", "category"]),
        new ExtractTextPlugin("[name].bundle.css")
    ],

    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "babel?cacheDirectory",
                exclude: /(node_modules|bower_components)/ },
            { test: /\.tsx?$/, loader: "babel?cacheDirectory!ts-loader",
                exclude: /(node_modules|bower_components)/ },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', "css") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('style', "css!less") },
            { test: /\.jpg$/, loader: "file" },
            { test: /\.png$/, loader: "url?limit=102400" },
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "immutable": "Immutable"
    },
};