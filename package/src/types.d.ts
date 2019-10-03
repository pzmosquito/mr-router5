import React from "react";
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

    getRouteNode: (routeNodeName: string) => RouteView;
};

export declare const initMrRouter5: (router: Router, routeTree: RouteTree) => void;

export declare const RouteComponent: React.FunctionComponent<{ routeNodeName: string }>;

export declare const dataloaderMiddleware: MiddlewareFactory;
