import React from "react";
import { observer } from "mobx-react-lite";
import RouterStore from "./RouterStore";
import RouteView from "./RouteView";

/**
 * @constant
 */
const routerStore = new RouterStore();


/**
 * @constant
 */
const RouteComponent = observer(({ routeNodeName }: { routeNodeName: string }) => {
    const { component, props } = routerStore.getRouteNode(routeNodeName);

    return React.createElement(component, props);
});

export {
    RouteView,
    routerStore,
    RouteComponent,
};
