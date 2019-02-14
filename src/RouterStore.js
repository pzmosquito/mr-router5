import {observable, action, computed, autorun} from "mobx";


export default class RouterStore {
    @observable.ref
    route = null;

    router = null;
    routes = null;

    init(router, routes) {
        this.router = router;
        this.routes = routes;
        this.router.subscribe(route => {
            this.route = route;
        })
    }

    routeComponent(routeNodeName) {
        if (routeNodeName === this.route.route.name) {
            return () => null;
        }

        const routeNodeLevel = routeNodeName === "" ? 0 : routeNodeName.split(".").length;
        const routeName = this.route.route.name.split(".").slice(0, routeNodeLevel + 1).join(".");

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
        throw new Error(`route '${this.route.route.name}' is not defined.`);
    }
}
