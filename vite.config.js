import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        target: "esnext",
        outDir: path.resolve(__dirname, "dist"),
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            formats: ["es", "cjs"],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ["mobx", "react", "router5", "mobx-react-lite",],
            output: {
                globals: {
                    mobx: "mobx",
                    react: "react",
                    router5: "router5",
                    "mobx-react-lite": "mobx-react-lite",
                }
            },
        },
    },
});
