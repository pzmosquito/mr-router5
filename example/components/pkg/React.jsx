import * as React from  "react";
import {routerStore} from "mr-router5";


export default () => {
    console.log("rendering react");
    return (
        <div>
            React Package
            <br />
            <div onClick={() => routerStore.router.navigate("pkg.mobx")}>Go To Mobx</div>
        </div>
    );
};
