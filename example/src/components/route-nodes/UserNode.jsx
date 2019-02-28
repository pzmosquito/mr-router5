import * as React from "react";
import {RouteComponent} from "../../../../package/dist";


const routeNodeName = "users";

export default () => {
    console.log("rendering UserNode");

    return (
        <div>
            <RouteComponent routeNodeName={routeNodeName} />
        </div>
    );
};
