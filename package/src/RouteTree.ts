import { Route, Router } from "router5";
import RouteView from "./RouteView";
import RoutePayload from "./RoutePayload";


/**
 * @class
 */
export default class RouteTree extends RoutePayload {
    /**
     * hold array of all route views.
     * @member {RouteView[]}
     * @private
     */
    private routeViews: RouteView[] = [];

    /**
     * reference of router5 router instance.
     * @member {Router}
     * @private
     */
    private router: Router = null;

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
     * set router5 router instance.
     * @param {Router{} router - router5 router instance.
     */
    setRouter(router: Router) {
        this.router = router;
    }

    /**
     * add route views to the route tree and router.
     * @param {...RouteView[]} routeViews - route views to be added.
     */
    addRouteViews(...routeViews: RouteView[]) {
        const routes = routeViews.map((rv) => rv.getRoute());
        this.router.add(routes);
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
