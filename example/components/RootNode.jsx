import React from "react";
import {RouteComponent} from "../../src";


export default () => {
    const routeNodeName = "";

    return (
        <div>
            <h4>Header</h4>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} />
            <hr/>
            <h4>Footer</h4>
        </div>
    );
};

