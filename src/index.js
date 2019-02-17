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
    const toActivate = useObservable({routeName: null});

    if (routerStore.transition.intersection === routeNodeName || toActivate.routeName === null) {
        toActivate.routeName = routerStore.routeComponentToActivate(routeNodeName);
    }

    const Component = routerStore.routeComponent(toActivate.routeName);

    return <Component />;
});


export {
    routerStore,
    routerApp,
    RouteComponent,
    routeNode
};
