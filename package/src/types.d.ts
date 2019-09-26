import React from "react";
import { Router, State, Route } from "router5";
import { MiddlewareFactory } from "router5/types/types/router";
import RouteDef from "./RouteView";
import RouteTree from "./RouteTree";
import { ObservableMap } from "mobx";
import RouteView from "./RouteView";


export declare interface IRouterStore {
    route: State;

    previousRoute: State;

    routeView: RouteView;

    previousRouteView: RouteView;

    router: Router;

    routeTree: RouteTree;

    routeNodePath: ObservableMap<string, RouteView>;
}

export declare const routerStore: IRouterStore;

export declare const connectRouter: (router: Router, routeTree: RouteTree) => void;

export declare const RouteComponent: React.FunctionComponent<{ routeNodeName: string }>;

export declare const dataloaderMiddleware: MiddlewareFactory;
