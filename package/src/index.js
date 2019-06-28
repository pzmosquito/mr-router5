import React from "react";
import {observer} from "mobx-react-lite";
import RouterStore from "./RouterStore";
import dataloaderMiddlewareWrapper from "./dataloader-middleware";


const routerStore = new RouterStore();


const routerApp = (router, routes, WrappedComponent) => {
    routerStore._init(router, routes);

    return WrappedComponent;
};


const RouteComponent = observer(({routeNodeName}) => {
    const routeObj = routerStore._routeNodePath.get(routeNodeName);
    const Component = routeObj.component;

    return <Component />;
});


const dataloaderMiddleware = dataloaderMiddlewareWrapper(routerStore);


export {
    routerStore,
    routerApp,
    RouteComponent,
    dataloaderMiddleware
};
