import * as React from  "react";
import {routerStore} from "mr-router5";


export default () => (
    <div>
        MobX Package
        <br />
        <div onClick={() => routerStore.router.navigate("pkg.react")}>Go To React</div>
    </div>
);
