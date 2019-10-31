# mr-router5 &nbsp; [![npm version](https://img.shields.io/npm/v/mr-router5)](https://www.npmjs.com/package/mr-router5) [![npm bundle size](https://img.shields.io/bundlephobia/min/mr-router5)](https://bundlephobia.com/result?p=mr-router5) [![npm type definitions](https://img.shields.io/npm/types/mr-router5)](https://www.npmjs.com/package/mr-router5)

mr-router5 uses [Router5](https://router5.js.org) together with [MobX](https://mobx.js.org) for your favorite React application.

- `router5` is an awesome framework and view library agnostic router.
- `MobX` is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.


## Why mr-router5

First of all, router5 is just better than `react-router` IMO, simple, powerful, clean implementation. router5 has `react-router5` package that works with React application. However, using MobX makes the connection so much easier. `mr-router5` also has additional features that make route transition much more powerful and flexible.


## Peer Dependencies

- `React` ^16.8.0
- `router5` ^7.0.0
- `mobx` ^4.0.0 || ^5.0.0
- `mobx-react-lite` ^1.0.0


## Installation
`npm install --save mr-router5`


## Reference

- [API docs](https://pzmosquito.github.io/mr-router5/)
- [payload](#payload)


## Basic Usage

*see [router5](https://router5.js.org/guides/defining-routes#adding-routes) on how to create router.*

```js
import React from "react";
import { render } from "react-dom";
import createRouter from "router5";
import { initMrRouter5, RouteComponent, RouteTree, RouteView } from "mr-router5";

// define components.
const Home = () => <div>'home' component</div>;
const UserNode = () => <div>'user' route node component</div>;
const UserList = () => <div>'user list' component</div>;
const UserView = () => <div>'user view' component</div>;

// define route tree. NOTE, only flat routes are supported.
const routeTree = new RouteTree([
    new RouteView({name: "home", path: "/"}, Home),
    new RouteView({name: "users", path: "/users"}, UserNode),
    new RouteView({name: "users.list", path: "/list"}, UserList)),
    new RouteView({name: "users.view", path: "/view"}, UserView),
]);

// initialize router and router store.
const router = createRouter(routeTree.getRoutes(), {});
initMrRouter5(router, routeTree);

// create root route node.
const routeNodeName = ""; // empty string for root route node
const RootNode = () => (
    <div>
        <h2>Header</h2>
        <RouteComponent routeNodeName={routeNodeName} />
        <h4>Footer</h4>
    </div>
);

// start the router.
router.start(() => {
    render(<RootNode />, document.getElementById("app"));
});
```

<a name="payload"></a>
## payload

You can use `extra` and `dataLoader` to route view or route tree. `extra` and `dataLoader` are simply JS Map. There are many ways to use them, one example will be middleware, see [router5 middleware](https://router5.js.org/advanced/middleware).

Currently, there's no difference between `extra` and `dataLoader` in terms of functionality. I keep them for future improvements.

```js
const routeTree = new RouteTree([
    // set payload and data loader at route view level
    new RouteView({name: "login", path: "/login"}, Login)
        .extra.set("requireLogin", false),
    new RouteView({name: "user", path: "/user"}, UserComponent)
        .extra.set("user", "John Doe")
        .dataLoader.set("getUserDetail", (user) => ({ /* user details */ }))
]);

// set payload and data loader at route tree level
routeTree.extra.set("requireLogin", true);

// write middleware
router.useMiddleware((router) => (toState, fromState, done) => {
    // get route view of the toState
    const rv = routeTree.getRouteView(toState.name);
    
    // `getExtra()` and `getDataLoader()` are helper functions to get data with optional default value.
    const requireLogin = rv.getExtra("requireLogin", routeTree.extra.get("requireLogin"));
    
    if (!requireLogin) {
        done();
        return;
    }

    const isLoggedIn = true; // check if user is logged in
    if (isLoggedIn) {
        const user = rv.extra.get("user");
        const userDetail = rv.dataLoader.get("getUserDetail")(user);
        // process and store userDetail
        done();
    }
    else {
        done({ redirect: { name: "login" } });
    }
});
```

That's it. Enjoy routing.
