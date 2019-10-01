import { Route } from "router5";
import Payload from "./Payload";


/**
 * @class
 */
export default class RouteView extends Payload {
    /**
     * @member {Route}
     * @private
     */
    private _route: Route = null;

    /**
     * @member {React.ComponentType<object>}
     */
    component: React.ComponentType<object> = null;

    /**
     * create a route view.
     * @constructor
     * @param route
     * @param component
     */
    constructor(route: Route, component: React.ComponentType<object>) {
        super();
        this._route = route;
        this.component = component;
    }

    /**
     * retrieve router5 route object.
     * @return {Route} the router5 route object.
     */
    get route() {
        return this._route;
    }
}
