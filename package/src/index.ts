import React from "react";
import { Router } from "router5";
import { observer } from "mobx-react-lite";
import RouterStore from "./RouterStore";
import RouteTree from "./RouteTree";
import RouteView from "./RouteView";
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
    const { component, props } = routerStore.getRouteNode(routeNodeName);

    return React.createElement(component, props);
});


/**
 * initilize router store.
 * @param {Router} router - router5 router instance.
 * @param {RouteTree} routeTree - route tree instance.
 */
const initMrRouter5 = (router: Router, routeTree: RouteTree) => {
    routeTree.setRouter(router);
    routerStore.init(router, routeTree);
};


export {
    RouteTree,
    RouteView,
    routerStore,
    dataloaderMiddleware,
    RouteComponent,
    initMrRouter5,
};
