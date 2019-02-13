import * as React from  "react";
import {RouteNode} from "../../src/modules";
import AppContext from "./Context";


export default () => (
    <AppContext.Consumer>
        {routerStore => (
            <RouteNode name="" routerStore={routerStore}>
                <div>
                    <h4>Test Router</h4>
                    <hr />
                    {routerStore.routeComponent()}
                </div>
            </RouteNode>
            )
        }
    </AppContext.Consumer>
);
