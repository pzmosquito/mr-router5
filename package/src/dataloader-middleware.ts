import { Router, State } from "router5";
import { DoneFn, Params } from "router5/types/types/base";
import RouterStore from "./RouterStore";


export default (routerStore: RouterStore) => (router: Router) => (toState: State, fromState: State, done: DoneFn) => {
    const routeTree = routerStore.routeTree;
    const { dataLoaders } = routeTree.getRouteView(toState.name);

    const runDataLoader = (dlIndex = 0) => {
        if (dlIndex === dataLoaders.length) {
            done();
        }
        else {
            const { loader, wait } = dataLoaders[dlIndex];
            const loaded = loader({ toState, fromState, routeTree, router });

            // data loader returns a Promise
            if (loaded instanceof Promise) {
                // need to wait for data loader
                if (wait) {
                    loaded
                        .then(() => {
                            runDataLoader(dlIndex + 1);
                        })
                        .catch((redirect) => {
                            done(redirect);
                        });
                }

                // no need to wait for data loader
                else {
                    runDataLoader(dlIndex + 1);
                    loaded.catch((redirect) => {
                        done(redirect);
                    });
                }
            }

            // data loader returns anything else
            else {
                runDataLoader(dlIndex + 1);
            }
        }
    }

    runDataLoader();
};
