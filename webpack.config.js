const path = require("path");


module.exports = {
    target: "web",
    resolve: {
        extensions: [".ts"],
    },
    mode: "production",
    entry: [
        "./src/index.ts"
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
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
};
