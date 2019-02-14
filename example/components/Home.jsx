import * as React from "react";
import AppContext from "./Context";


export default () => (
    <AppContext.Consumer>
        {routerStore => (
            <div>
                <div onClick={() => routerStore.router.navigate("home")}>Home</div>
                <div onClick={() => routerStore.router.navigate("pkg.mobx")}>MobX</div>
                <div onClick={() => routerStore.router.navigate("pkg.react")}>React</div>
            </div>
        )}
    </AppContext.Consumer>
);
