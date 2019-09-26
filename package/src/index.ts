import React from "react";
import { Router } from "router5";
import { observer } from "mobx-react-lite";
import RouterStore from "./RouterStore";
import RouteTree from "./RouteTree";
import dataloaderMiddlewareWrapper from "./dataloader-middleware";


const routerStore = new RouterStore();

const dataloaderMiddleware = dataloaderMiddlewareWrapper(routerStore);


const RouteComponent = observer(({ routeNodeName }: { routeNodeName: string }) => {
    const component = routerStore.getRouteNodeComponent(routeNodeName);

    return React.createElement(component);
});


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
