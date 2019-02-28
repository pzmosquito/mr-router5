import React from "react";
import {observer} from "mobx-react-lite";
import RouterStore from "./RouterStore";


const routerStore = new RouterStore();


const routerApp = (router, routes, WrappedComponent) => {
    routerStore.init(router, routes);

    return WrappedComponent;
};


const RouteComponent = observer(({routeNodeName}) => {
    const componentName = routerStore.routeNodeComponent.get(routeNodeName);
    const Component = routerStore.routeComponent(componentName);

    return <Component />;
});


export {
    routerStore,
    routerApp,
    RouteComponent
};
