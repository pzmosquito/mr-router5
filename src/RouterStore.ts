import { makeObservable, observable, action, ObservableMap } from "mobx";
import { Router, SubscribeState, State } from "router5";
import transitionPath from "router5-transition-path";
import RouteView from "./RouteView";


export default class RouterStore {
    /**
     * the observable 'to' state route.
     */
    @observable
    route: State = null;

    /**
     * the observable 'from' state route.
     */
    @observable
    previousRoute: State = null;

    /**
     * the observable 'to' route view.
     */
    @observable
    routeView: RouteView = null;

    /**
     * the observable 'from' route view.
     */
    @observable
    previousRouteView: RouteView = null;

    /**
     * reference of router instance.
     * @private
     */
    private _router: Router = null;

    /**
     * the array of the route views.
     * @private
     */
    private _routeViews: RouteView[] = null;

    /**
     * route component to activate for route nodes.
     * @private
     */
    private routeNodePath: ObservableMap<string, RouteView> = observable(new Map(), { deep: false });

    /**
     * initialize router store.
     * @param router - router5 router instance.
     * @param routeViews - array of route views.
     * @private
     */
    @action.bound
    init(router: Router, routeViews: RouteView[]) {
        this.route = null;
        this.previousRoute = null;
        this.routeView = null;
        this.previousRouteView = null;

        this._router = router;
        this._routeViews = routeViews;

        this._router.subscribe(state => {
            this.routeUpdated(state);
        });
    }

    /**
     * reference of router instance.
     */
    get router() {
        return this._router;
    }

    /**
     * the array of the route views.
     */
    get routeViews() {
        return this._routeViews;
    }

    /**
     * retrieve the route view instance of a given route name.
     * @param name - name of the route.
     */
    getRouteView(name: string) {
        return this._routeViews.find((rv) => rv.route.name === name);
    }

    /**
     * handle route update.
     * @param state - the current state route.
     * @private
     */
    @action.bound
    private routeUpdated(state: SubscribeState) {
        this.route = state.route;
        this.previousRoute = state.previousRoute;
        this.routeView = this.getRouteView(this.route.name);
        if (this.previousRoute) {
            this.previousRouteView = this.getRouteView(this.previousRoute.name);
        }

        const {intersection, toActivate} = transitionPath(this.route, this.previousRoute);
        const activatePath = [intersection].concat(toActivate);

        for (let i = 0; i < activatePath.length - 1; i += 1) {
            const currRouteName = activatePath[i];
            const nextRouteView = this.getRouteView(activatePath[i + 1]);

            this.routeNodePath.set(currRouteName, nextRouteView);
        }
    }

    /**
     * retrieve the route node of a given name.
     * @param routeNodeName - name of the route node.
     * @return the route view of the route node.
     */
    getRouteNode(routeNodeName: string) {
        return this.routeNodePath.get(routeNodeName);
    }

    constructor() {
        this.getRouteNode = this.getRouteNode.bind(this);
        this.getRouteView = this.getRouteView.bind(this);
        makeObservable(this);
    }
}
