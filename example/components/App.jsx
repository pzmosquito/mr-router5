// @flow
import {hot} from "react-hot-loader";
import * as React from "react";
import {render} from "react-dom";
import {RouterStore} from "../../src/";
import createRouter from "../routing/create-router";
import AppContext from "./Context";
import RootNode from "./RootNode";


// router
const routerStore = new RouterStore();
const router = createRouter(routerStore);

// app component
const App = () => (
    <AppContext.Provider value={routerStore}>
        <RootNode />
    </AppContext.Provider>
);

// make app hot reloadable
const HotApp = hot(module)(App);

// renderer
const renderApp = () => {
    render(<HotApp />, document.getElementById("app"));
};

export {
    renderApp,
    router
};
