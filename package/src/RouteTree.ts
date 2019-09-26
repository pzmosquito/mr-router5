import RouteView from "./RouteView";
import RoutePayload from "./RoutePayload";


export default class RouteTree extends RoutePayload {
    private routeViews: RouteView[] = null;

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
