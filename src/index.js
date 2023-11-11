import React from "react";
import router5CreateRouter from "router5";
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
const RouteComponent = observer(({ routeNodeName }) => {
    const { component, props } = routerStore.routeNodePath.get(routeNodeName);

    return React.createElement(component, props);
});

function createRouter(routeViews, options) {
    return router5CreateRouter(
        routeViews.map((rv) => rv.route),
        options,
    );
}

function makeMiddleware(middlewareFn) {
    return (router) => (toState, fromState, done) => {
        const { getDataLoader, getExtra } = routerStore.getRouteView(toState.name);
        const params = {
            router,
            toState,
            fromState,
            done,
            getDataLoader,
            getExtra,
        };
        middlewareFn(params);
    };
}

export {
    RouteView,
    routerStore,
    RouteComponent,
    createRouter,
    makeMiddleware,
};
