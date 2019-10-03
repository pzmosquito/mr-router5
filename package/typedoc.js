module.exports = {
    out: "../docs",
    target: "ES6",
    readme: "none",
    exclude: [
        "**/__tests__/**/*",
        "**/RouteExtra.ts",
        "**/dataloader-middleware.ts",
        "**/MergeDataLoaderTag.ts",
    ],
    mode: "file",
    excludePrivate: false,
    excludeProtected: false,
};
