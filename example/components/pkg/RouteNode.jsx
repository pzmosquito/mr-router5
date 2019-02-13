import * as React from  "react";
import {RouteNode} from "../../../src/modules";
import AppContext from "../Context";


export default () => (
    <AppContext.Consumer>
        {routerStore => (
            <RouteNode name="pkg" routerStore={routerStore}>
                <div>
                    <hr />
                    {routerStore.routeComponent()}
                </div>
            </RouteNode>
            )
        }
    </AppContext.Consumer>
);
