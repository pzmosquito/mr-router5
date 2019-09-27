import { observable, action, ObservableMap } from "mobx";
import { Router, SubscribeState, State } from "router5";
import transitionPath from "router5-transition-path";
import RouteTree from "./RouteTree";
import RouteView from "./RouteView";


/**
 * @class
 */
export default class RouterStore {
    /**
     * the observable 'to' state route.
     * @member {State}
     */
    @observable.ref
    route: State = null;

    /**
     * the observable 'from' state route.
     * @member {State}
     */
    @observable.ref
    previousRoute: State = null;

    /**
     * the observable 'to' route view.
     * @member {RouteView}
     */
    @observable.ref
    routeView: RouteView = null;

    /**
     * the observable 'from' route view.
     * @member {RouteView}
     */
    @observable.ref
    previousRouteView: RouteView = null;

    /**
     * reference of router instance
     * @member {Router}
     */
    router: Router = null;

    /**
     * reference of route tree instance
     * @member {RouteTree}
     */
    routeTree: RouteTree = null;

    /**
     * route component to activate for route nodes
     * @member {ObservableMap<string, RouteView>}
     * @private
     */
    private routeNodePath: ObservableMap<string, RouteView> = observable(new Map(), { deep: false });

    /**
     * initialize router store.
     * @param {Router} router - router5 router instance.
     * @param {RouteTree} routeTree - route tree instance.
     */
    init(router: Router, routeTree: RouteTree) {
        this.route = null;
        this.previousRoute = null;
        this.routeView = null;
        this.previousRouteView = null;

        this.router = router;
        this.routeTree = routeTree;

        this.router.subscribe(state => {
            this.routeUpdated(state);
        });
    }

    /**
     * handle route update.
     * @param {SubscribeState} state - the current state route.
     * @private
     */
    @action
    private routeUpdated(state: SubscribeState) {
        this.route = state.route;
        this.previousRoute = state.previousRoute;
        this.routeView = this.routeTree.getRouteView(this.route.name);
        if (this.previousRoute) {
            this.previousRouteView = this.routeTree.getRouteView(this.previousRoute.name);
        }

        const {intersection, toActivate} = transitionPath(this.route, this.previousRoute);
        const updatedPath = [intersection].concat(toActivate);

        for (let i = 0; i < updatedPath.length - 1; i += 1) {
            const currRouteName = updatedPath[i];
            const nextRouteView = this.routeTree.getRouteView(updatedPath[i + 1]);

            this.routeNodePath.set(currRouteName, nextRouteView);
        }
    }

    /**
     * retrieve the React component to render for a route node.
     * @param {string} routeNodeName - name of the route node.
     * @return {React.ComponentType<object>} - the React component to render.
     */
    getRouteNodeComponent(routeNodeName: string) {
        const routeView = this.routeNodePath.get(routeNodeName);

        return routeView.getComponent();
    }

    /**
     * add route views to the route tree and router.
     * @param {...RouteView[]} routeViews - route views to be added.
     */
    addRouteViews(...routeViews: RouteView[]) {
        const routes = routeViews.map((rv) => rv.getRoute());
        this.router.add(routes);
        this.routeTree.add(...routeViews);
    }
}
