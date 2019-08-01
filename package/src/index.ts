import * as React from "react";
import { Router } from "router5";
import { observer } from "mobx-react-lite";
import { RouteDef } from "./types";
import RouterStore from "./RouterStore";
import dataloaderMiddlewareWrapper from "./dataloader-middleware";


const routerStore = new RouterStore();


const routerApp = (router: Router, routes: RouteDef[], WrappedComponent: React.ComponentType<object>) => {
    routerStore.init(router, routes);

    return WrappedComponent;
};


const RouteComponent = observer(({ routeNodeName }: { routeNodeName: string }) => {
    const routeDef = routerStore.routeNodePath.get(routeNodeName);
    const Component = routeDef.component;

    return React.createElement(Component);
});


const dataloaderMiddleware = dataloaderMiddlewareWrapper(routerStore);


export {
    routerStore,
    routerApp,
    RouteComponent,
    dataloaderMiddleware
};
