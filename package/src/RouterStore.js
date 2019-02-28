import {observable, action} from "mobx";
import transitionPath from "router5-transition-path";


export default class RouterStore {
    // route objects
    route = null;
    previousRoute = null;

    // reference of router instance
    router = null;

    // reference of routes definition
    routes = null;

    // route component to activate for route nodes
    @observable.shallow
    routeNodePath = new Map();


    init(router, routes) {
        this.router = router;
        this.routes = routes;

        this.router.subscribe(routeObj => {
            this.routeUpdated(routeObj);
        });
    }

    // handle route update
    @action
    routeUpdated(routeObj) {
        this.route = routeObj.route;
        this.previousRoute = routeObj.previousRoute;

        const {intersection, toActivate} = transitionPath(this.route, this.previousRoute);
        const updatedRoutes = [intersection].concat(toActivate);

        for (let i = 0; i < updatedRoutes.length - 1; i++) {
            const currRoute = updatedRoutes[i];
            const nextRoute = updatedRoutes[i + 1];
            const nextRouteObj = Object.assign({}, this.getRoute(this.routes, nextRoute));

            this.routeNodePath.set(currRoute, nextRouteObj);
        }
    }

    // get route object for a given route name.
    getRoute(routes, routeName, parentRouteName) {
        for (const route of routes) {
            const currentRouteName = parentRouteName ? `${parentRouteName}.${route.name}` : route.name;

            if (routeName === currentRouteName) {
                return route;
            }
            if (Object.prototype.hasOwnProperty.call(route, "children")) {
                return this.getRoute(route.children, routeName, currentRouteName);
            }
        }
        throw new Error(`route '${routeName}' is not defined.`);
    }
}
