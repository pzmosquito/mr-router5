import { Router, State } from "router5";
import { DoneFn } from "router5/types/types/base";
import RouterStore from "./RouterStore";
import { MergeDataLoaderTag } from "./DataLoader";


export default (routerStore: RouterStore) => (router: Router) => (toState: State, fromState: State, done: DoneFn) => {
    const routeTree = routerStore.routeTree;
    const dataLoaders = routeTree.getRouteView(toState.name).getDataLoaders().slice();

    // merge global data loaders and remove MergeDataLoaderTag
    const mergeDataLoaderTagIndex = dataLoaders.findIndex(dl => dl instanceof MergeDataLoaderTag);
    if (mergeDataLoaderTagIndex >= 0) {
        dataLoaders.splice(mergeDataLoaderTagIndex, 1, ...routeTree.getDataLoaders());
    }

    const runDataLoader = (dlIndex = 0) => {
        if (dlIndex === dataLoaders.length) {
            done();
            return;
        }

        // @ts-ignore dataLoaders should all be instance of DataLoader at this point.
        const { loader, wait } = dataLoaders[dlIndex];
        const loaded = loader({ toState, fromState, routeTree, router });

        if (loaded instanceof Promise) {
            if (wait) {
                loaded
                    .then(() => {
                        runDataLoader(dlIndex + 1);
                    })
                    .catch((err: any) => {
                        done(err);
                    });
            }
            else {
                runDataLoader(dlIndex + 1);
                loaded.catch((err: any) => {
                    done(err);
                });
            }
        }
        else {
            runDataLoader(dlIndex + 1);
        }
    };

    runDataLoader();
};
