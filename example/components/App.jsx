// @flow
// import {hot} from "react-hot-loader";
import * as React from "react";
import {render} from "react-dom";
import RouterStore from "../../src/RouterStore";
import createRouter from "../routing/create-router";
import RouteNode from "./RouteNode";
import AppContext from "./Context";


// router
const routerStore = new RouterStore();
const router = createRouter(routerStore);

// app component
const App = () => (
    <AppContext.Provider value={routerStore}>
        <RouteNode />
    </AppContext.Provider>
);

// make app hot reloadable
// const HotApp = hot(module)(App);

// renderer
const renderApp = () => {
    render(<App />, document.getElementById("app"));
};

export {
    renderApp,
    router
};
