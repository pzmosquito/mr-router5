import * as React from  "react";
import {routerStore} from "mr-router5";


export default () => (
    <div>
        React Package
        <br />
        <div onClick={() => routerStore.router.navigate("pkg.mobx")}>To To Mobx</div>
    </div>
);
