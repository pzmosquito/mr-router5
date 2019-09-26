import { Route } from "router5";
import RoutePayload from "./RoutePayload";


export default class RouteView extends RoutePayload {
    private route: Route = null;

    private component: React.ComponentType<object> = null;

    /**
     * set router5 route object of the route view.
     * @param {Route} route - router5 route object.
     * @return {RouteView} the route view object.
     */
    setRoute(route: Route) {
        this.route = route;
        return this;
    }

    /**
     * retrieve router5 route object.
     * @return {Route} the router5 route object.
     */
    getRoute() {
        return this.route;
    }

    /**
     * set React component of the route view.
     * @param {object} component - React component to render for the route.
     * @return {RouteView} the route view object.
     */
    setComponent(component: React.ComponentType<object>) {
        this.component = component;
        return this;
    }

    /**
     * retrieve React component of the route view.
     * @return {object} the React component of the route view.
     */
    getComponent() {
        return this.component;
    }
}
