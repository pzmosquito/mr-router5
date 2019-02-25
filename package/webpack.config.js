const path = require("path");


module.exports = {
    target: "node",
    mode: "production",
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd"
    },
    externals: {
        mobx: "mobx",
        "mobx-react-lite": "mobx-react-lite",
        react: "react",
        router5: "router5"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
};
