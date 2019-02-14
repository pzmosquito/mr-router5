import React from "react";
import RouterStore from "./RouterStore";
import {observer} from "mobx-react-lite";


const routerStore = new RouterStore();

const routerApp = (router, routes, WrappedComponent) => {
    routerStore.init(router, routes);

    return WrappedComponent;
};

const RouteComponent = observer(({routeNodeName}) => {
    const Component = routerStore.routeComponent(routeNodeName);

    return <Component />;
});


export {
    routerStore,
    routerApp,
    RouteComponent
}
