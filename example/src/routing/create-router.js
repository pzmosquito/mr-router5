import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import {dataloaderMiddleware} from "../../../package/dist";


export default routes => {
    const router = createRouter(routes, {defaultRoute: "home"});

    router.usePlugin(browserPlugin({useHash: false, preserveHash: false}));
    router.useMiddleware(dataloaderMiddleware);

    return router;
};
