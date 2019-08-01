import { Router, State } from "router5";
import { IRouterStore } from "./types";
import { DoneFn } from "router5/types/types/base";


export default (routerStore: IRouterStore) => (router: Router) => (toState: State, fromState: State, done: DoneFn) => {
    const routeDef = routerStore.getRouteDef(toState.name);

    if (Object.prototype.hasOwnProperty.call(routeDef, "preloader")) {
        routeDef.preloader({toState, fromState, router});
    }

    const doneWithPostloader = () => {
        done();
        if (Object.prototype.hasOwnProperty.call(routeDef, "postloader")) {
            routeDef.postloader({toState, fromState, router});
        }
    };

    if (Object.prototype.hasOwnProperty.call(routeDef, "loader")) {
        const dl = routeDef.loader({toState, fromState, router});

        if (dl instanceof Promise) {
            dl.then(() => {
                doneWithPostloader();
            });
        }
        else {
            doneWithPostloader();
        }
    }
    else {
        doneWithPostloader();
    }
};
