import { Router, State } from "router5";
import { DoneFn, Params } from "router5/types/types/base";
import RouterStore from "./RouterStore";


declare interface LoaderOption {
    redirect?: {
        name: string;
        params?: Params;
    };
    skipPostloader?: boolean;
}

export default (routerStore: RouterStore) => (router: Router) => (toState: State, fromState: State, done: DoneFn) => {
    // cannot use routerStore.routeView because it's not yet set
    const routeView = routerStore.routeTree.getRouteView(toState.name);

    // arguments to be passed to all loaders
    const loaderArgs = {
        toState,
        fromState,
        routeView,
        routeTree: routerStore.routeTree,
        router,
    };

    // preloader
    const preloader = routeView.getPreloader() || routerStore.routeTree.getPreloader();
    if (preloader) {
        preloader(loaderArgs);
    }

    // postloader
    const doneWithOption = (option: LoaderOption = {}) => {
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

        if (!skipPostloader) {
            const postloader = routeView.getPostloader() || routerStore.routeTree.getPostloader();
            if (postloader) {
                postloader(loaderArgs);
            }
        }
    };

    // loader
    const loader = routeView.getLoader() || routerStore.routeTree.getLoader();
    if (loader) {
        const loaded = loader(loaderArgs);

        if (loaded instanceof Promise) {
            loaded.then(doneWithOption).catch(doneWithOption);
        }
        else {
            doneWithOption(loaded);
        }
    }
    else {
        doneWithOption();
    }
};
