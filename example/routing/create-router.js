// @flow
import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import routes from "./routes";


export default (routerStore) => {
    const router = createRouter(routes, {defaultRoute: "home"});

    router.usePlugin(browserPlugin({useHash: false, preserveHash: false}));
    routerStore.init(router, routes);

    return router;
};
