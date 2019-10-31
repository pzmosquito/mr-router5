const plugins = [
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}]
];

const presets = [
    "@babel/preset-env",
    "@babel/typescript",
];

module.exports = {
    plugins,
    presets
};
