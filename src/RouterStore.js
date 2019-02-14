import {observable, action, computed, autorun} from "mobx";


export default class RouterStore {
    @observable.ref
    route = null;

    @observable.ref
    previousRoute = null;

    router = null;
    routes = null;

    init(router, routes) {
        this.router = router;
        this.routes = routes;

        this.router.subscribe(routeObj => {
            this.route = routeObj.route;
            this.previousRoute = routeObj.previousRoute;
        })
    }

    routeComponent(routeNodeName) {
        if (!this.route || routeNodeName === this.route.name) {
            return () => null;
        }

        const routeNodeLevel = routeNodeName === "" ? 0 : routeNodeName.split(".").length;
        const routeName = this.route.name.split(".").slice(0, routeNodeLevel + 1).join(".");

        return this._getRouteComponent(this.routes, routeName);
    }

    _getRouteComponent(routes, routeName, parentRouteName) {
        for (const route of routes) {
            const currentRouteName = parentRouteName ? `${parentRouteName}.${route.name}` : route.name;

            if (routeName === currentRouteName) {
                return route.component;
            }
            if (Object.prototype.hasOwnProperty.call(route, "children")) {
                return this._getRouteComponent(route.children, routeName, currentRouteName);
            }
        }
        throw new Error(`route '${this.route.name}' is not defined.`);
    }
}
