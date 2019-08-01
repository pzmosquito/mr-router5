import * as React from "react";
import { Router, State } from "router5";
import { MiddlewareFactory } from "router5/types/types/router";


export declare interface IRouterStore {
    route: State;
    previousRoute: State;

    obsRoute: State;
    obsPreviousRoute: State;

    router: Router;
    routes: RouteDef[];

    getRouteDef(
        routeName: string,
        routes?: RouteDef[],
        parentRouteName?: string
    ): RouteDef;
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

export declare const routerStore: IRouterStore;

export declare const routerApp: (
    router: Router,
    routes: RouteDef[],
    WrappedComponent: React.ComponentType<object>
) => typeof WrappedComponent;

export declare const RouteComponent: React.FunctionComponent<{ routeNodeName: string }>;

export declare const dataloaderMiddleware: MiddlewareFactory;
