import * as React from "react";
import {RouteComponent} from "mr-router5";


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

