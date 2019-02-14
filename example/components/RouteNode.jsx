import React, {useContext} from  "react";
import {observer} from "mobx-react-lite";
import {routeNode} from "../../src";
import AppContext from "./Context";


export default observer(() => {
    const routeNodeName = "";
    const routerStore = useContext(AppContext);
    const Component = routerStore.routeComponent(routeNodeName);

    return (
        <div>
            <h4>Header</h4>
            <hr />
            <Component />
            <hr/>
            <h4>Footer</h4>
        </div>
    );
});

