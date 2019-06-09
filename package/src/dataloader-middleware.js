export default routerStore => router => (toState, fromState, done) => {
    const routeObj = routerStore.getRoute(toState.name);

    if (Object.prototype.hasOwnProperty.call(routeObj, "dataloader")) {
        routeObj.dataloader({router, toState, fromState, done});
    }
    else {
        done();
    }
};
