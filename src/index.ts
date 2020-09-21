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

/**
 * convert array of route views to array of routes.
 * @param routeViews - array of route views.
 */
function toRoutes(routeViews: RouteView[]) {
    return routeViews.map((rv) => rv.route);
}

export {
    RouteView,
    routerStore,
    RouteComponent,
    toRoutes,
};
