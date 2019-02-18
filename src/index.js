import * as React from "react";
import {observer, useObservable, useObserver} from "mobx-react-lite";
import RouterStore from "./RouterStore";


const routerStore = new RouterStore();

const routerApp = (router, routes, WrappedComponent) => {
    routerStore.init(router, routes);

    return WrappedComponent;
};

const routeNode = (name, WrappedComponent) => () => <WrappedComponent routeNodeName={name} />;

const RouteComponent = observer(({routeNodeName}) => {
    const toActivate = useObservable({name: null});
    // console.log(`RouteComponent name for route node '${routeNodeName}' was '${toActivate.name}'`);

    if (routerStore.transition.intersection === routeNodeName || toActivate.name === null) {
        toActivate.name = routerStore.routeComponentToActivate(routeNodeName);
    }
    // console.log(`RouteComponent name for route node '${routeNodeName}' is '${toActivate.name}'`);

    const Component = routerStore.routeComponent(toActivate.name);

    return <Component />;
});


export {
    routerStore,
    routerApp,
    RouteComponent,
    routeNode
};
