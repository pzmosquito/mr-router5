import { Route } from "router5";
import RouteView from "./RouteView";
import RoutePayload from "./RoutePayload";


/**
 * @class
 */
export default class RouteTree extends RoutePayload {
    /**
     * @member {RouteView[]}
     * @private
     */
    private routeViews: RouteView[] = [];

    /**
     * create a route tree.
     * @constructor
     * @param {RouteView[]} routeViews array of route view objects.
     */
    constructor(routeViews: RouteView[] = []) {
        super();
        this.routeViews = routeViews;
    }

    /**
     * add route view objects to the route tree.
     * NOTE, this only adds to the route tree, not the router instance.
     * @param {...RouteView[]} routeViews - route view objects.
     */
    add(...routeViews: RouteView[]) {
        this.routeViews.push(...routeViews);
    }

    /**
     * retrieve array of router5 routes.
     * @return {Route[]} router5 routes.
     */
    getRoutes() {
        return this.routeViews.map((rv) => rv.getRoute());
    }

    /**
     * create route view object.
     * @param {Route} route - router5 route object.
     * @param {Route} component - React component to render for the route.
     * @return {RouteView} a route view object of the route.
     */
    static createRouteView(route: Route, component: React.ComponentType<object>) {
        const routeView = new RouteView();
        return routeView.setRoute(route).setComponent(component);
    }

    /**
     * retrieve route view object by route name.
     * @param {string} name - route name.
     * @return {RouteView} the route view object.
     */
    getRouteView(name: string) {
        const routeView = this.routeViews.find((rv) => rv.getRoute().name === name);

        if (routeView) {
            return routeView;
        }

        throw new Error(`route name '${name}' does not exist.`);
    }
}
