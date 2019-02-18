import * as React from  "react";
import {routerStore} from "mr-router5";


export default () => {
    console.log("rendering mobx");
    return (
        <div>
            MobX Package
            <br />
            <div onClick={() => routerStore.router.navigate("pkg.react")}>Go To React</div>
        </div>
    );
};
