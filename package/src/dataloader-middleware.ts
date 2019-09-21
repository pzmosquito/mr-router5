import { Router, State } from "router5";
import { IRouterStore } from "./types";
import { DoneFn, Params } from "router5/types/types/base";


declare interface DoneRedirect {
    name: string;
    params?: Params;
}

declare interface LoaderOption {
    redirect?: DoneRedirect;
    skipPostloader?: boolean;
}

export default (routerStore: IRouterStore) => (router: Router) => (toState: State, fromState: State, done: DoneFn) => {
    const routeDef = routerStore.getRouteDef(toState.name);
    const loaderArgs = {toState, fromState, router};

    // preloader
    if (Object.prototype.hasOwnProperty.call(routeDef, "preloader")) {
        routeDef.preloader(loaderArgs);
    }

    // postloader
    const doneWithPostloader = (option: LoaderOption = {}) => {
        const { redirect = null, skipPostloader = false } = option;

        if (redirect) {
            try {
                done({ redirect });
            }
            catch (e) {
                throw new Error("'redirect' option must be object of {name: string, params?: object} shape.");
            }
        }
        else {
            done();
        }

        if (!skipPostloader && Object.prototype.hasOwnProperty.call(routeDef, "postloader")) {
            routeDef.postloader(loaderArgs);
        }
    };

    // loader
    if (Object.prototype.hasOwnProperty.call(routeDef, "loader")) {
        const dl = routeDef.loader(loaderArgs);

        if (dl instanceof Promise) {
            dl.then(doneWithPostloader).catch(doneWithPostloader);
        }
        else {
            doneWithPostloader(dl);
        }
    }
    else {
        doneWithPostloader();
    }
};
