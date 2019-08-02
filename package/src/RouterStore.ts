import { observable, action, ObservableMap } from "mobx";
import { Router, SubscribeState, State } from "router5";
import transitionPath from "router5-transition-path";
import { IRouterStore, RouteDef } from "./types";


export default class RouterStore implements IRouterStore {
    // route objects
    route: State = null;
    previousRoute: State = null;

    // observable route objects
    @observable.ref
    obsRoute: State = null;

    @observable.ref
    obsPreviousRoute: State = null;

    // reference of router instance
    router: Router = null;

    // reference of routes definition
    routes: RouteDef[] = null;

    // route component to activate for route nodes
    routeNodePath: ObservableMap<string, RouteDef> = observable(new Map(), { deep: false });


    init(router: Router, routes: RouteDef[]) {
        this.router = router;
        this.routes = routes;

        this.router.subscribe(state => {
            this.routeUpdated(state);
        });
    }

    // handle route update
    @action
    private routeUpdated(state: SubscribeState) {
        this.route = state.route;
        this.previousRoute = state.previousRoute;

        this.obsRoute = state.route;
        this.obsPreviousRoute = state.previousRoute;

        const {intersection, toActivate} = transitionPath(this.route, this.previousRoute);
        const updatedRoutes = [intersection].concat(toActivate);

        for (let i = 0; i < updatedRoutes.length - 1; i += 1) {
            const currRoute = updatedRoutes[i];
            const nextRoute = updatedRoutes[i + 1];
            const nextRouteDef = this.getRouteDef(nextRoute);

            this.routeNodePath.set(currRoute, Object.assign({}, nextRouteDef));
        }
    }

    // get route object for a given route name.
    getRouteDef(routeName: string, routes = this.routes, parentRouteName = ""): RouteDef {
        for (const route of routes) {
            const currentRouteName = parentRouteName === "" ? route.name : `${parentRouteName}.${route.name}`;

            if (routeName === currentRouteName) {
                return route;
            }
            if (Object.prototype.hasOwnProperty.call(route, "children")) {
                const routeFound = this.getRouteDef(routeName, route.children, currentRouteName);
                if (routeFound) {
                    return routeFound;
                }
            }
        }
        return null;
    }
}
