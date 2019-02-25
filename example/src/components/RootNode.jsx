import * as React from "react";
import {routeNode, RouteComponent} from "mr-router5";


export default routeNode("", ({routeNodeName}) => {
    console.log("rendering root node");
    return (
        <div>
            <h4>Header</h4>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} />
            <hr/>
            <h4>Footer</h4>
        </div>
    );
});