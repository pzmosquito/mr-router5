import React from "react";
import { ObservableMap } from "mobx";
import { Router, State } from "router5";
import { MiddlewareFactory } from "router5/types/types/router";
import RouteTree from "./RouteTree";
import RouteView from "./RouteView";


export declare const routerStore: {
    route: State;

    previousRoute: State;

    routeView: RouteView;

    previousRouteView: RouteView;

    router: Router;

    routeTree: RouteTree;

    init: (router: Router, routeTree: RouteTree) => void;

    getRouteNodeComponent: (routeNodeName: string) => React.ComponentType<object>;

    addRouteViews: (...routeViews: RouteView[]) => void;
};

export declare const initRouterStore: (router: Router, routeTree: RouteTree) => void;

export declare const RouteComponent: React.FunctionComponent<{ routeNodeName: string }>;

export declare const dataloaderMiddleware: MiddlewareFactory;
