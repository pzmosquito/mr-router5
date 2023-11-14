import React from "react";
import { observer } from "mobx-react-lite";
import RouterStore from "./RouterStore";
import RouteView from "./RouteView";

/**
 * Instance of RouterStore.
 */
const routerStore = new RouterStore();

/**
 * RouteComponent is a React component that renders the view for a given route node.
 * It observes changes to the routeNodePath in the routerStore.
 * @param {Object} props - Properties passed to the component.
 * @param {string} props.routeNodeName - Name of the route node.
 */
const RouteComponent = observer(({ routeNodeName }) => {
    const { component, props } = routerStore.routeNodePath.get(routeNodeName);

    return React.createElement(component, props);
});

/**
 * Creates a middleware function for use with the router.
 * @param {Function} middlewareFn - The middleware function to be used.
 * @returns The middleware function wrapped with routerStore context.
 */
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
    makeMiddleware,
};
