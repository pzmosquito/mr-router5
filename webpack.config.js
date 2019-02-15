const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    target: "web",
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json"]
    },
    entry: [
        "./example/index.js"
    ],
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    devServer: {
        port: 3001
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./example/index.html"}),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
};
