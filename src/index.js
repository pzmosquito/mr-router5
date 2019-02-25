import * as React from "react";
import {observer} from "mobx-react-lite";
import RouterStore from "./RouterStore";


const routerStore = new RouterStore();

const routerApp = (router, routes, WrappedComponent) => {
    routerStore.init(router, routes);

    return WrappedComponent;
};

const routeNode = (name, WrappedComponent) => () => <WrappedComponent routeNodeName={name} />;

const RouteComponent = observer(({routeNodeName}) => {
    const componetName = routerStore.routeNodeComponent[routerStore.getRouteName(routeNodeName)];
    const Component = routerStore.routeComponent(componetName);

    return <Component />;
});


export {
    routerStore,
    routerApp,
    RouteComponent,
    routeNode
};
