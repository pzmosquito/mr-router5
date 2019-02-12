export default (routerStore, routes) => (router, dependencies) => {
    routerStore.init(router, routes);

    return {
        // invoked when router.start() is called
        onStart: routerStore.onStart,

        // invoked when router.stop() is called
        onStop: routerStore.onStop,

        onTransitionStart: routerStore.onTransitionStart,

        onTransitionCancel: routerStore.onTransitionCancel,

        onTransitionError: routerStore.onTransitionError,

        // options contains replace and reload boolean flags
        onTransitionSuccess: routerStore.onTransitionSuccess,

        // a function called when removing the plugin
        teardown: routerStore.teardown
    }
}