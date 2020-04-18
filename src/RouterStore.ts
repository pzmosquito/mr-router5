import { observable, action, ObservableMap } from "mobx";
import { Router, SubscribeState, State } from "router5";
import transitionPath from "router5-transition-path";
import RouteTree from "./RouteTree";
import RouteView from "./RouteView";


export default class RouterStore {
    constructor() {
        this.getRouteNode = this.getRouteNode.bind(this);
    }

    /**
     * the observable 'to' state route.
     */
    @observable.ref
    route: State = null;

    /**
     * the observable 'from' state route.
     */
    @observable.ref
    previousRoute: State = null;

    /**
     * the observable 'to' route view.
     */
    @observable.ref
    routeView: RouteView = null;

    /**
     * the observable 'from' route view.
     */
    @observable.ref
    previousRouteView: RouteView = null;

    /**
     * reference of router instance
     * @private
     */
    private _router: Router = null;

    /**
     * reference of route tree instance
     * @private
     */
    private _routeTree: RouteTree = null;

    /**
     * route component to activate for route nodes
     * @private
     */
    private routeNodePath: ObservableMap<string, RouteView> = observable(new Map(), { deep: false });

    /**
     * initialize router store.
     * @param router - router5 router instance.
     * @param routeTree - route tree instance.
     * @private
     */
    @action.bound
    init(router: Router, routeTree: RouteTree) {
        this.route = null;
        this.previousRoute = null;
        this.routeView = null;
        this.previousRouteView = null;

        this._router = router;
        this._routeTree = routeTree;

        this._router.subscribe(state => {
            this.routeUpdated(state);
        });
    }

    /**
     * reference of router instance
     */
    get router() {
        return this._router;
    }

    /**
     * reference of route tree instance
     */
    get routeTree() {
        return this._routeTree;
    }

    /**
     * handle route update.
     * @param state - the current state route.
     * @private
     */
    @action
    private routeUpdated(state: SubscribeState) {
        this.route = state.route;
        this.previousRoute = state.previousRoute;
        this.routeView = this._routeTree.getRouteView(this.route.name);
        if (this.previousRoute) {
            this.previousRouteView = this._routeTree.getRouteView(this.previousRoute.name);
        }

        const {intersection, toActivate} = transitionPath(this.route, this.previousRoute);
        const activatePath = [intersection].concat(toActivate);

        for (let i = 0; i < activatePath.length - 1; i += 1) {
            const currRouteName = activatePath[i];
            const nextRouteView = this._routeTree.getRouteView(activatePath[i + 1]);

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
}
