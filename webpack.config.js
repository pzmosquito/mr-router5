const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    target: "web",
    mode: "development",
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    entry: [
        "./example/index.js"
    ],
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist/example"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "./dist/example",
        historyApiFallback: true
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
