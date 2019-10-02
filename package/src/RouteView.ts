import React from "react";
import { Route } from "router5";
import Extra from "./Extra";


/**
 * @class
 */
export default class RouteView extends Extra {
    /**
     * the router5 route object.
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
    props: { [key: string] : any } = null;

    /**
     * create a route view.
     * @constructor
     * @param route
     * @param component
     */
    constructor(route: Route, component: React.ComponentType<object>, props: { [key: string] : any } = {}) {
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
