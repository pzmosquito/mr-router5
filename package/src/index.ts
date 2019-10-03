import React from "react";
import { Router } from "router5";
import { observer } from "mobx-react-lite";
import RouterStore from "./RouterStore";
import RouteTree from "./RouteTree";
import RouteView from "./RouteView";
import dataloaderMiddlewareWrapper from "./dataloader-middleware";
import DataLoader from "./DataLoader";


/**
 * @constant
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
 * @param router - router5 router instance.
 * @param routeTree - route tree instance.
 */
const initMrRouter5 = (router: Router, routeTree: RouteTree) => {
    routeTree.setRouter(router);
    routerStore.init(router, routeTree);
};


export {
    RouteTree,
    RouteView,
    routerStore,
    DataLoader,
    dataloaderMiddleware,
    RouteComponent,
    initMrRouter5,
};
