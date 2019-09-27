import React from "react";
import { Router } from "router5";
import { observer } from "mobx-react-lite";
import RouterStore from "./RouterStore";
import RouteTree from "./RouteTree";
import dataloaderMiddlewareWrapper from "./dataloader-middleware";


/**
 * @constant
 * @type {RouterStore}
 */
const routerStore = new RouterStore();


/**
 * @constant
 */
const dataloaderMiddleware = dataloaderMiddlewareWrapper(routerStore);


/**
 * @constant
 */
const RouteComponent = observer(({ routeNodeName }: { routeNodeName: string }) => {
    const component = routerStore.getRouteNodeComponent(routeNodeName);

    return React.createElement(component);
});


/**
 * initilize router store.
 * @param {Router} router - router5 router instance.
 * @param {RouteTree} routeTree - route tree instance.
 */
const initRouterStore = (router: Router, routeTree: RouteTree) => {
    routerStore.init(router, routeTree);
};


export {
    RouteTree,
    routerStore,
    dataloaderMiddleware,
    RouteComponent,
    initRouterStore,
};
