import { Route } from "router5";
import RouteView from "./RouteView";
import RoutePayload from "./RoutePayload";


export default class RouteTree extends RoutePayload {
    private routeViews: RouteView[] = [];

    constructor(routeViews: RouteView[] = []) {
        super();
        this.routeViews = routeViews;
    }

    add(...routeViews: RouteView[]) {
        this.routeViews.push(...routeViews);
    }

    /**
     * retrieve router5's routes array
     */
    getRoutes() {
        return this.routeViews.map((rv) => rv.getRoute());
    }

    static createRouteView(route: Route, component: React.ComponentType<object>) {
        const routeView = new RouteView();
        return routeView.setRoute(route).setComponent(component);
    }

    /**
     * retrieve route view by route name
     * @param name route name
     */
    getRouteView(name: string) {
        const routeView = this.routeViews.find((rv) => rv.getRoute().name === name);

        if (routeView) {
            return routeView;
        }

        throw new Error(`route name '${name}' does not exist.`);
    }
}
