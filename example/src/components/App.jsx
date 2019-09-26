import * as React from "react";
import { render } from "react-dom";
import { initRouterStore } from "../../../package/dist";
import createRouter from "../routing/create-router";
import routeTree from "../routing/routes";
import RootNode from "./route-nodes/RootNode";


// router
const router = createRouter(routeTree.getRoutes());

// app component
initRouterStore(router, routeTree);

// renderer
const renderApp = () => {
    render(
        <RootNode />,
        document.getElementById("app")
    );
};

export {
    renderApp,
    router
};
