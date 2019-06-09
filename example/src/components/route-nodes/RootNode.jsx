import * as React from "react";
import {RouteComponent, routerStore} from "../../../../package/dist";


const routeNodeName = "";

export default () => {
    console.log("rendering RootNode");

    return (
        <div>
            <h2>Mr. Router5 Example</h2>
            <hr />
            <a href="javascript:void(0)" onClick={() => routerStore.router.navigate("home")}>Home</a>
            &nbsp; | &nbsp;
            <a href="javascript:void(0)" onClick={() => routerStore.router.navigate("users.list")}>Player List</a>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} />
        </div>
    );
};
