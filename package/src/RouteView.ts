import React from "react";
import { Route } from "router5";
import RouteExtra from "./RouteExtra";
import { MergeDataLoaderTag } from "./DataLoader";


/**
 * @class
 */
export default class RouteView extends RouteExtra {
    /**
     * the router5 route object.
     * @member
     * @private
     */
    private _route: Route = null;

    /**
     * the component to render.
     * @member
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

    /**
     * add MergeDataLoaderTag to dataLoaders as placeholder for merging global data laoders.
     */
    mergeDataLoaders() {
        if (this.getDataLoaders().find(dl => dl instanceof MergeDataLoaderTag)) {
            throw new Error("data loaders have been merged already");
        }
        this.addDataLoaders(RouteExtra.createMergeDataLoaderTag());

        return this;
    }
}
