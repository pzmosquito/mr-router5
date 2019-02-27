const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    target: "web",
    mode: "development",
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {react: require.resolve("react")}
    },
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/index.html"}),
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
