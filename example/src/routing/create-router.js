import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";


export default routes => {
    const router = createRouter(routes, {defaultRoute: "home"});

    router.usePlugin(browserPlugin({useHash: false, preserveHash: false}));

    return router;
};
