import { makeObservable, observable, action } from "mobx";
import router5 from "router5";
import transitionPath from "router5-transition-path";


export default class RouterStore {
    /**
     * Current route.
     */
    route = null;

    /**
     * Previous route.
     */
    previousRoute = null;

    /**
     * The route view object for the current route.
     */
    routeView = null;

    /**
     * The route view object for the previous route.
     */
    previousRouteView = null;

    /**
     * Instance of router5's router.
     */
    router = null;

    /**
     * Map of route views keyed by route name.
     */
    routeViewsMap = new Map();

    /**
     * Map of route node paths.
     */
    routeNodePath = new Map();

    constructor() {
        makeObservable(this, {
            route: observable,
            previousRoute: observable,
            routeNodePath: observable.shallow,
            routeUpdated: action.bound,
        });
        this.createRouter = this.createRouter.bind(this);
    }

    /**
     * Creates a router instance with provided route views and options.
     * @param {Array} routeViews Array of route view objects.
     * @param {Object} options Router options.
     * @param {Object} dependencies Dependencies for middleware and plugins.
     * @returns The created router instance.
     */
    createRouter(routeViews, options, dependencies) {
        this.routeViewsMap = new Map(routeViews.map((rv) => [rv.route.name, rv]));
        this.router = router5(routeViews.map((rv) => rv.route), options, dependencies);
        this.router.subscribe(({ route, previousRoute }) => this.routeUpdated(route, previousRoute));

        return this.router;
    }

    /**
     * Updates the current and previous routes and their respective views.
     * @param {Object} route The current route object.
     * @param {Object} previousRoute The previous route object.
     */
    routeUpdated(route, previousRoute) {
        this.route = route;
        this.routeView = this.routeViewsMap.get(this.route.name);

        this.previousRoute = previousRoute;
        this.previousRouteView = this.previousRoute ? this.routeViewsMap.get(this.previousRoute.name) : this.previousRoute;

        const { intersection, toActivate } = transitionPath(this.route, this.previousRoute);
        const activatePath = [intersection, ...toActivate];

        activatePath.slice(0, -1).forEach((routeName, routeIdx) => {
            const nextRouteView = this.routeViewsMap.get(activatePath[routeIdx + 1]);
            this.routeNodePath.set(routeName, nextRouteView);
        });
    }
}
