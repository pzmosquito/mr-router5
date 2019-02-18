import {observable, entries} from "mobx";
import transitionPath from "router5-transition-path";


export default class RouterStore {
    @observable.ref
    route = null;

    @observable.ref
    previousRoute = null;

    @observable.shallow
    transition = {};
    
    router = null;
    routes = null;

    init(router, routes) {
        this.router = router;
        this.routes = routes;

        this.router.subscribe(routeObj => {
            this.route = routeObj.route;
            this.previousRoute = routeObj.previousRoute;
            
            const transition = transitionPath(this.route, this.previousRoute);
            this.transition.toActivate = transition.toActivate;
            this.transition.toDeactivate = transition.toDeactivate;
            this.transition.intersection = transition.intersection;
            // console.log("toActivate routes:", this.transition.toActivate);
        });
    }

    // get the route name for RouteComponent to activate.
    routeComponentToActivate(routeNodeName) {
        // console.log(`getting RouteComponent route name for route node '${routeNodeName}'`);
        if (routeNodeName === "" || routeNodeName === this.transition.intersection) {
            // console.log(`found RouteComponent route name '${this.transition.toActivate[0]}'.`);
            return this.transition.toActivate[0];
        }

        const routeNodeIndex = this.transition.toActivate.indexOf(routeNodeName);
        
        if (routeNodeIndex < 0) {
            throw new Error(`route '${routeNodeName}' is not defined.`);
        }
        if (routeNodeIndex === this.transition.toActivate.length - 1) {
            throw new Error(`route '${routeNodeName}' is a route node.`);
        }
        
        const routeComponentName = this.transition.toActivate[routeNodeIndex + 1];

        // console.log(`found RouteComponent route name '${routeComponentName}'.`);

        return routeComponentName;
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
