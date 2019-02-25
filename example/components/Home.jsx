import * as React from "react";
import {routerStore} from "mr-router5";


export default () => {
    console.log("rendering home");
    return (
        <div>
            <div onClick={() => routerStore.router.navigate("home")}>Home</div>
            <div onClick={() => routerStore.router.navigate("pkg.mobx")}>MobX</div>
            <div onClick={() => routerStore.router.navigate("pkg.react")}>React</div>
        </div>
    );
};
