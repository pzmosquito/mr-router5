
export default routerStore => router => (toState, fromState, done) => {
    const routeObj = routerStore.getRoute(toState.name);

    if (Object.prototype.hasOwnProperty.call(routeObj, "preloader")) {
        routeObj.preloader({toState, fromState, router});
    }

    const doneWithPostloader = () => {
        done();
        if (Object.prototype.hasOwnProperty.call(routeObj, "postloader")) {
            routeObj.postloader({toState, fromState, router});
        }
    };

    if (Object.prototype.hasOwnProperty.call(routeObj, "loader")) {
        const dl = routeObj.loader({toState, fromState, router});

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
