import React, {useContext} from  "react";
import {observer} from "mobx-react-lite";
import {RouteNode} from "../../../src";
import AppContext from "../Context";


export default observer(() => {
    const routerStore = useContext(AppContext);
    const routeNodeName = "pkg";
    const Component = routerStore.routeComponent(routeNodeName);

    return (
        <div>
            <h5>View Package</h5>
            <div onClick={() => routerStore.router.navigate("home")}>Back to Home</div>
            <hr />
            <Component />
        </div>
    );
});
