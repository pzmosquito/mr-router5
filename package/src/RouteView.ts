import { Route } from "router5";
import RoutePayload from "./RoutePayload";


export default class RouteView extends RoutePayload {
    private route: Route = null;

    private component: React.ComponentType<object> = null;

    constructor(route: Route, component: React.ComponentType<object>) {
        super();
        this.route = route;
        this.component = component;
    }

    // route
    setRoute(route: Route) {
        this.route = route;
        return this;
    }

    getRoute() {
        return this.route;
    }

    // component
    setComponent(component: React.ComponentType<object>) {
        this.component = component;
        return this;
    }

    getComponent() {
        return this.component;
    }
}
