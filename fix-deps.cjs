/**
 * This Node.js script is designed to modify the package.json files
 * of specified Node.js modules to specify them as ES modules.
 * It does this by adding a "type": "module" property to their package.json
 */

const fs = require("fs");

async function addTypeModule(moduleName) {
    const jsonData = require(`${moduleName}/package.json`);
    jsonData.type = "module";
    fs.writeFileSync(`node_modules/${moduleName}/package.json`, JSON.stringify(jsonData, null, 2));
}

addTypeModule("router5");
addTypeModule("router5-transition-path");
