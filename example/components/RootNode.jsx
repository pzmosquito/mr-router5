import React, {useContext} from  "react";
import AppContext from "./Context";
import {routeNode, RouteComponent} from "../../src";


const routeNodeName = "";
const routerStore = useContext(AppContext);

export default routeNode(() => {
    return (
        <div>
            <h4>Header</h4>
            <hr />
            <RouteComponent routeNodeName={routeNodeName} routerStore={routerStore} />
            <hr/>
            <h4>Footer</h4>
        </div>
    );
});

