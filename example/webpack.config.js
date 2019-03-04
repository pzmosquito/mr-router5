const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


const distPath = path.resolve(__dirname, "dist");

module.exports = {
    target: "web",
    mode: "development",
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            react: require.resolve("react")
        }
    },
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: "[name].[hash].js",
        path: distPath,
        publicPath: "/"
    },
    devServer: {
        contentBase: distPath,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/index.html"}),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
};
