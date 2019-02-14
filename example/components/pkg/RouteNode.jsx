import React, {useContext} from  "react";
import AppContext from "../Context";
import {routeNode, RouteComponent} from "../../src";


const routeNodeName = "pkg";
const routerStore = useContext(AppContext);

export default routeNode(() => {
    return (
        <div>
            <h5>View Package</h5>
            <div onClick={() => routerStore.router.navigate("home")}>Back to Home</div>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} routerStore={routerStore} />
        </div>
    );
});