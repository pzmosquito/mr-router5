import * as React from "react";
import { Router, Route } from "router5";
import { MiddlewareFactory } from "router5/types/types/router";


// mr-router5's Route object, different from rotuer5's Route
declare interface RouteObj {
    name: string,
    path: string,
    component: React.ReactNode,
    children?: RouteObj[],
    loader?: Function,
    preloader?: Function,
    postloader?: Function
}


declare class RouterStore {
    route: Route | null;
    previousRoute: Route | null;

    obsRoute: Route | null;
    obsPreviousRoute: Route | null;

    router: Router | null;
    routes: RouteObj[] | null;

    getRoute(
        routeName: string,
        routes: RouteObj[],
        parentRouteName: string
    ): RouteObj | null;
}

export declare const routerStore: RouterStore;

export declare const routerApp: (
    router: Router,
    routes: RouteObj[],
    WrappedComponent: React.ReactNode
) => React.ReactNode;

export declare const RouteComponent: React.FunctionComponent<{ routeNodeName: string }>;

export declare const dataloaderMiddleware: MiddlewareFactory;
