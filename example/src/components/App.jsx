import * as React from "react";
import {render} from "react-dom";
import {routerApp} from "../../../package/dist";
import createRouter from "../routing/create-router";
import routes from "../routing/routes";
import RootNode from "./route-nodes/RootNode";


// router
const router = createRouter(routes);

// app component
const App = routerApp(router, routes, RootNode);

// renderer
const renderApp = () => {
    render(
        <App />,
        document.getElementById("app")
    );
};

export {
    renderApp,
    router
};
