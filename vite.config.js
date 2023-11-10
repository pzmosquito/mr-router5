import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    build: {
        target: "esnext",
        outDir: path.resolve(__dirname, "dist"),
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "MyLib",
            // formats: ["umd"],
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            external: ["mobx", "mobx-react-lite", "react", "router5"],
            output: {
                globals: {
                    mobx: "mobx",
                    "mobx-react-lite": "mobx-react-lite",
                    react: "react",
                    router5: "router5"
                }
            }
        }
    },
    // plugins: [react()]
});
