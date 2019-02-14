import * as React from "react";
import {RouteComponent, routerStore} from "mr-router5";


export default () => {
    const routeNodeName = "pkg";

    return (
        <div>
            <h5>View Package</h5>
            <div onClick={() => routerStore.router.navigate("home")}>Back to Home</div>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} />
        </div>
    );
};
