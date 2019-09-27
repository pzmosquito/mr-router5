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
    const routeTree = routerStore.routeTree;
    const toRouteView = routeTree.getRouteView(toState.name);

    // arguments to be passed to all loaders
    const loaderArgs = {
        toState,
        fromState,
        routeTree,
        router,
    };

    // preloader
    const preloader = toRouteView.getPreloader() || routerStore.routeTree.getPreloader();
    if (preloader) {
        preloader(loaderArgs);
    }

    // postloader
    const doneWithOption = (option: LoaderOption = {}) => {
        const { redirect = null, skipPostloader = false } = option;

        if (redirect) {
            done({ redirect });
        }
        else {
            done();
        }

        if (!skipPostloader) {
            const postloader = toRouteView.getPostloader() || routerStore.routeTree.getPostloader();
            if (postloader) {
                postloader(loaderArgs);
            }
        }
    };

    // loader
    const loader = toRouteView.getLoader() || routerStore.routeTree.getLoader();
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
