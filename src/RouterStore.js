import {observable, action} from "mobx";
import transitionPath from "router5-transition-path";


export default class RouterStore {
    // to route
    @observable.ref
    route = null;

    // from route
    @observable.ref
    previousRoute = null;

    // route component name to activate for route nodes
    @observable.shallow
    routeNodeComponent = new Map();
    
    // reference of router instance
    router = null;

    // reference of routes instance
    routes = null;

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
            const currRoute = this.getRouteName(updatedRoutes[i]);
            const nextRoute = updatedRoutes[i + 1];

            this.routeNodeComponent.set(currRoute, nextRoute);
        }
    }

    // return mr-router5 specific route name (mainly for root node)
    getRouteName(routeName) {
        return routeName === "" ? "__" : routeName;
    }

    // get attached component for a given route name.
    routeComponent(routeName) {
        const route = this._getRoute(this.routes, routeName);

        return route.component;
    }

    // get route object for a given route name.
    _getRoute(routes, routeName, parentRouteName) {
        for (const route of routes) {
            const currentRouteName = parentRouteName ? `${parentRouteName}.${route.name}` : route.name;

            if (routeName === currentRouteName) {
                return route;
            }
            if (Object.prototype.hasOwnProperty.call(route, "children")) {
                return this._getRoute(route.children, routeName, currentRouteName);
            }
        }
        throw new Error(`route '${routeName}' is not defined.`);
    }
}
