import React from "react";
import {observer} from "mobx-react-lite";
import RouterStore from "./RouterStore";


const routerStore = new RouterStore();


const routerApp = (router, routes, WrappedComponent) => {
    routerStore.init(router, routes);

    return WrappedComponent;
};


const RouteComponent = observer(({routeNodeName}) => {
    const routeObj = routerStore.routeNodePath.get(routeNodeName);
    const Component = routeObj.component;

    return <Component />;
});


export {
    routerStore,
    routerApp,
    RouteComponent
};
