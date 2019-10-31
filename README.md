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
- [payload & data loader](#extra)


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

<a name="extra"></a>
## payload & data loader

You can set payload and data loader to route view or route tree. There are many ways to use payload and data loader, one example will be using middleware, see [router5 middleware](https://router5.js.org/advanced/middleware).

```js
const routeTree = new RouteTree([
    // set payload and data loader at route view level
    new RouteView({name: "login", path: "/login"}, Login)
        .setPayload("requireLogin", false),
    new RouteView({name: "user", path: "/user"}, UserComponent)
        .setPayload("user", "John Doe")
        .setDataLoader("getUserDetail", (user) => ({ /* user details */ }))
]);

// set payload and data loader at route tree level
routeTree
    .setPayload("requireLogin", true),
    .setDataLoader("checkLogin", () => { /* check if user is logged in */ });

// write middleware
router.useMiddleware((router) => (toState, fromState, done) => {
    // get route view of the toState
    const rv = routeTree.getRouteView(toState.name);
    
    // check route view's 'requireLogin' payload, default to routeTree's payload if doesn't exist
    const requireLogin = rv.getPayload("requireLogin", routeTree.getPayload("requireLogin"));
    
    if (!requireLogin) {
        done();
        return;
    }

    const isLoggedIn = routeTree.getDataLoader("checkLogin")();
    if (isLoggedIn) {
        const user = rv.getPayload("user");
        const userDetail = routeTree.getRouteView(toState.name).getDataLoader("getUserDetail")(user);
        // process and store userDetail
        done();
    }
    else {
        done({ redirect: { name: "login" } });
    }
});
```

That's it. Enjoy routing.
