// @flow
import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import {mrrouter5Plugin} from "../../src/";
import routes from "./routes";


export default (routerStore) => {
    const router = createRouter(routes, {defaultRoute: "home"});

    router.usePlugin(browserPlugin({useHash: false, preserveHash: false}));
    // router.usePlugin(mrrouter5Plugin(routerStore, routes));
    routerStore.init(router, routes);

    return router;
};
