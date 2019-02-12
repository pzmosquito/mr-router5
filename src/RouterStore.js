import {observable, action} from "mobx";


export default class RouterStore {
    toState = observable.ref(null);
    fromState = observable.ref(null);
    err = observable.ref(null);
    opts = observable.ref(null);
    
    router = null;
    routes = null;
    
    init(router, routes) {
        this.router = router;
        this.routes = routes;
    }

    onStart() {

    }

    onStop() {

    }

    teardown() {

    }

    onTransitionStart = action((toState, fromState) => {
        this.toState = toState;
        this.fromState = fromState;
    });

    onTransitionCancel = action((toState, fromState) => {
        this.toState = toState;
        this.fromState = fromState;
    });

    onTransitionError = action((toState, fromState, err) => {
        this.toState = toState;
        this.fromState = fromState;
        this.err = err;
    });

    onTransitionSuccess = action((toState, fromState, opts) => {
        this.toState = toState;
        this.fromState = fromState;
        this.opts = opts;
    });

    get routeComponent(routes = this.routes, routeNamePrefix = "") {
        for (const route of routes) {
            if (`${routeNamePrefix}${route.name}` === this.toState.name) {
                return route.component;
            }
            if (Object.prototype.hasOwnProperty.call(route, "children")) {
                return this.routeComponent(route.children, `${route.name}.`);
            }
        }
        throw new Error(`route '${this.toState.name}' is not defined.`);
    }
}