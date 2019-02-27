import * as React from "react";
import {routeNode, RouteComponent} from "../../../../package/dist";


export default routeNode("users", ({routeNodeName}) => {
    console.log("rendering UserNode");

    return (
        <div>
            <RouteComponent routeNodeName={routeNodeName} />
        </div>
    );
});
