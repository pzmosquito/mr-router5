import React from "react";
import { Router } from "router5";
import { observer } from "mobx-react-lite";
import RouterStore from "./RouterStore";
import RouteView from "./RouteView";
import RouteTree from "./RouteTree";
import dataloaderMiddlewareWrapper from "./dataloader-middleware";


const routerStore = new RouterStore();


const RouteComponent = observer(({ routeNodeName }: { routeNodeName: string }) => {
    const routeView = routerStore.routeNodePath.get(routeNodeName);

    return React.createElement(routeView.getComponent());
});


const connectRouter = (router: Router, routeTree: RouteTree) => {
    routerStore.init(router, routeTree);
};


const dataloaderMiddleware = dataloaderMiddlewareWrapper(routerStore);


export {
    routerStore,
    RouteComponent,
    RouteView,
    RouteTree,
    connectRouter,
    dataloaderMiddleware,
};
