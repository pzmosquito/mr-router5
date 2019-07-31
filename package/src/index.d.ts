import * as React from "react";
import { Router, Route } from "router5";
import { MiddlewareFactory } from "router5/types/types/router";


declare class RouterStore {
    route: Route | null;
    previousRoute: Route | null;

    obsRoute: Route | null;
    obsPreviousRoute: Route | null;

    router: Router | null;
    routes: RouteDef[] | null;

    getRoute(
        routeName: string,
        routes: RouteDef[],
        parentRouteName: string
    ): RouteDef | null;
}


// mr-router5's Route definition, different from rotuer5's Route object
export declare interface RouteDef {
    name: string,
    path: string,
    component: React.ComponentType<object>,
    children?: RouteDef[],
    loader?: Function,
    preloader?: Function,
    postloader?: Function
}

export declare const routerStore: RouterStore;

export declare const routerApp: (
    router: Router,
    routes: RouteDef[],
    WrappedComponent: React.ComponentType<object>
) => typeof WrappedComponent;

export declare const RouteComponent: React.FunctionComponent<{ routeNodeName: string }>;

export declare const dataloaderMiddleware: MiddlewareFactory;
