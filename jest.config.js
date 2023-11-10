// make sure to run `node fix-deps.cjs` before running tests

export default {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"],
    "roots": ["<rootDir>/src/__tests__/"],
    "moduleNameMapper": {
        "^router5$": "<rootDir>/node_modules/router5/dist/index.es.js",
        "^router5-transition-path$": "<rootDir>/node_modules/router5-transition-path/dist/index.es.js",
    },
};
