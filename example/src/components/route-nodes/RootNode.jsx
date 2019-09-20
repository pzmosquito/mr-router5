import * as React from "react";
import {RouteComponent, routerStore} from "../../../../package/dist";


const routeNodeName = "";

export default () => {
    console.log("rendering RootNode");

    return (
        <div>
            <h2>mr-router5 Example (React + Router5 + MobX)</h2>
            <hr />
            <a href="javascript:void(0)" onClick={() => routerStore.router.navigate("home")}>Home</a>
            &nbsp; | &nbsp;
            <a href="javascript:void(0)" onClick={() => routerStore.router.navigate("users.list")}>Player List</a>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} />
        </div>
    );
};
