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
     * the component to render.
     * @member {React.ComponentType<object>}
     */
    component: React.ComponentType<object> = null;

    /**
     * the props for the component.
     * @member
     */
    props: { [name: string]: any } = null;

    /**
     * create a route view.
     * @constructor
     * @param route
     * @param component
     */
    constructor(route: Route, component: React.ComponentType<object>, props: { [name: string]: any } = {}) {
        super();
        this._route = route;
        this.component = component;
        this.props = props;
    }

    /**
     * retrieve router5 route object.
     * @return {Route} the router5 route object.
     */
    get route() {
        return this._route;
    }
}
