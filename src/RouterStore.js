import { makeObservable, observable, action } from "mobx";
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
    routeViewMap = new Map();

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
            init: action.bound,
            routeUpdated: action.bound,
        });
    }

    /**
     * initialize router store.
     * @param router - router5 router instance.
     * @param routeViews - array of route views.
     */
    init(router, routeViews) {
        this.route = null;
        this.previousRoute = null;
        this.routeView = null;
        this.previousRouteView = null;

        this.router = router;
        this.routeViewMap = new Map(routeViews.map((rv) => [rv.route.name, rv]))

        this.router.subscribe(state => {
            this.routeUpdated(state);
        });
    }

    /**
     * handle route update.
     * @param state - the current state route.
     * @private
     */
    routeUpdated(state) {
        this.route = state.route;
        this.routeView = this.routeViewMap.get(this.route.name);

        this.previousRoute = state.previousRoute;
        if (this.previousRoute) {
            this.previousRouteView = this.routeViewMap.get(this.previousRoute.name);
        }

        const { intersection, toActivate } = transitionPath(this.route, this.previousRoute);
        const activatePath = [intersection, ...toActivate];

        activatePath.slice(0, -1).forEach((currRouteName, i) => {
            const nextRouteView = this.routeViewMap.get(activatePath[i + 1]);
            this.routeNodePath.set(currRouteName, nextRouteView);
        });
    }
}
