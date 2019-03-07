import * as React from "react";
import {RouteComponent} from "../../../../package/dist";


const routeNodeName = "users.view";

export default () => {
    console.log("rendering UserViewNode");

    return (
        <div>
            <h3>User View Template</h3>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} />
        </div>
    );
};
