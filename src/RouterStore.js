import { makeObservable, observable, action } from "mobx";
import router5 from "router5";
import transitionPath from "router5-transition-path";


export default class RouterStore {
    /**
     * the observable 'to' state route.
     */
    route = null;

    /**
     * the observable 'from' state route.
     */
    previousRoute = null;

    /**
     * the observable 'to' route view.
     */
    routeView = null;

    /**
     * the observable 'from' route view.
     */
    previousRouteView = null;

    /**
     * reference of router instance.
     * @private
     */
    router = null;

    /**
     * the map of the route views.
     * @private
     */
    routeViewsMap = new Map();

    /**
     * route component to activate for route nodes.
     * @private
     */
    routeNodePath = new Map();

    /**
     * @constructor
     */
    constructor() {
        makeObservable(this, {
            route: observable,
            previousRoute: observable,
            routeNodePath: observable.shallow,
            createRouter: action.bound,
            routeUpdated: action.bound,
        });
    }

    createRouter(routeViews, options) {
        this.routeViewsMap = new Map(routeViews.map((rv) => [rv.route.name, rv]));
        this.router = router5(routeViews.map((rv) => rv.route), options);
        this.router.subscribe(({ route, previousRoute }) => this.routeUpdated(route, previousRoute));

        return this.router;
    }

    /**
     * handle route update.
     * @param state - the current state route.
     * @private
     */
    routeUpdated(route, previousRoute) {
        this.route = route;
        this.routeView = this.routeViewsMap.get(this.route.name);

        this.previousRoute = previousRoute;
        this.previousRouteView = this.previousRoute ? this.routeViewsMap.get(this.previousRoute.name) : this.previousRoute;

        const { intersection, toActivate } = transitionPath(this.route, this.previousRoute);
        const activatePath = [intersection, ...toActivate];

        activatePath.slice(0, -1).forEach((currRouteName, i) => {
            const nextRouteView = this.routeViewsMap.get(activatePath[i + 1]);
            this.routeNodePath.set(currRouteName, nextRouteView);
        });
    }
}
