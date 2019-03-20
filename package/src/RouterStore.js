import {observable, action} from "mobx";
import transitionPath from "router5-transition-path";


export default class RouterStore {
    // route objects
    route = null;
    previousRoute = null;

    // observable route objects
    @observable.ref
    obsRoute = null;
    
    @observable.ref
    obsPreviousRoute = null;

    // reference of router instance
    router = null;

    // reference of routes definition
    routes = null;

    // route component to activate for route nodes
    @observable.shallow
    _routeNodePath = new Map();


    _init(router, routes) {
        this.router = router;
        this.routes = routes;

        this.router.subscribe(routeObj => {
            this._routeUpdated(routeObj);
        });
    }

    // handle route update
    @action
    _routeUpdated(routeObj) {
        this.route = routeObj.route;
        this.previousRoute = routeObj.previousRoute;

        this.obsRoute = routeObj.route;
        this.obsPreviousRoute = routeObj.previousRoute;

        const {intersection, toActivate} = transitionPath(this.route, this.previousRoute);
        const updatedRoutes = [intersection].concat(toActivate);

        for (let i = 0; i < updatedRoutes.length - 1; i++) {
            const currRoute = updatedRoutes[i];
            const nextRoute = updatedRoutes[i + 1];
            const nextRouteObj = this.getRoute(nextRoute);

            this._routeNodePath.set(currRoute, Object.assign({}, nextRouteObj));
        }
    }

    // get route object for a given route name.
    getRoute(routeName, routes = this.routes, parentRouteName = "") {
        for (const route of routes) {
            const currentRouteName = parentRouteName === "" ? route.name : `${parentRouteName}.${route.name}`;

            if (routeName === currentRouteName) {
                return route;
            }
            if (Object.prototype.hasOwnProperty.call(route, "children")) {
                const routeFound = this.getRoute(routeName, route.children, currentRouteName);
                if (routeFound) {
                    return routeFound;
                }
            }
        }
        return null;
    }
}
