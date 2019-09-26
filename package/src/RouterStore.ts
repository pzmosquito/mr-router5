import { observable, action, ObservableMap } from "mobx";
import { Router, SubscribeState, State } from "router5";
import transitionPath from "router5-transition-path";
import RouteTree from "./RouteTree";
import RouteView from "./RouteView";


export default class RouterStore {
    // observable route objects
    @observable.ref
    route: State = null;

    @observable.ref
    previousRoute: State = null;

    @observable.ref
    routeView: RouteView = null;

    @observable.ref
    previousRouteView: RouteView = null;

    // reference of router instance
    router: Router = null;

    // route tree instance
    routeTree: RouteTree = null;

    // route component to activate for route nodes
    private routeNodePath: ObservableMap<string, RouteView> = observable(new Map(), { deep: false });

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

    // handle route update
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

    getRouteNodeComponent(routeNodeName: string) {
        const routeView = this.routeNodePath.get(routeNodeName);

        return routeView.getComponent();
    }

    addRouteViews(...routeViews: RouteView[]) {
        const routes = routeViews.map((rv) => rv.getRoute());
        this.router.add(routes);
        this.routeTree.add(...routeViews);
    }
}
