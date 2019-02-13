import {observable, action} from "mobx";


export default class RouterStore {
    @observable.ref
    toState = null;

    @observable.ref
    fromState = null;

    @observable.ref
    err = null;

    @observable.ref
    opts = null;

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

        console.log(this.toState);
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

    routeComponent = (routes = this.routes, segmentName = "") => {
        for (const route of routes) {
            const routeName = segmentName ? `${segmentName}.${route.name}` : route.name;

            if (routeName === this.toState.name) {
                return route.component;
            }
            if (Object.prototype.hasOwnProperty.call(route, "children")) {
                return this.routeComponent(route.children, routeName);
            }
        }
        throw new Error(`route '${this.toState.name}' is not defined.`);
    };
}
