import { Router } from "router5";
import RouteView from "./RouteView";
import RouteExtra from "./RouteExtra";


/**
 * @class
 */
export default class RouteTree extends RouteExtra {
    /**
     * hold array of all route views.
     * @member
     * @private
     */
    private routeViews: RouteView[] = [];

    /**
     * reference of router5 router instance.
     * @member
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
     * @param {RouteView[]} routeViews - route views to be added.
     */
    addRouteViews(routeViews: RouteView[]) {
        if (this.router === null) {
            throw new Error("router store must be initialized first.")
        }
        this.routeViews.push(...routeViews);
    }

    /**
     * retrieve array of router5 routes.
     * @return {Route[]} router5 routes.
     */
    getRoutes() {
        return this.routeViews.map((rv) => rv.route);
    }

    /**
     * retrieve route view object by route name.
     * @param {string} name - route name.
     * @return {RouteView} the route view object.
     */
    getRouteView(name: string) {
        const routeView = this.routeViews.find((rv) => rv.route.name === name);

        if (routeView) {
            return routeView;
        }

        throw new Error(`route name '${name}' does not exist.`);
    }
}
