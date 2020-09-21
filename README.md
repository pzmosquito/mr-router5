# mr-router5 &nbsp; [![npm version](https://img.shields.io/npm/v/mr-router5)](https://www.npmjs.com/package/mr-router5) [![npm bundle size](https://img.shields.io/bundlephobia/min/mr-router5)](https://bundlephobia.com/result?p=mr-router5) [![npm type definitions](https://img.shields.io/npm/types/mr-router5)](https://www.npmjs.com/package/mr-router5)

mr-router5 uses [Router5](https://router5.js.org) together with [MobX](https://mobx.js.org) for your favorite React application.

- `router5` is an awesome framework and view library agnostic router.
- `MobX` is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.


## Why mr-router5

mr-router5 creates a minimal bridge between router5, MobX and React. When I say 'minimal bridge', I really mean it. Your React components stay untouched, there's no need to create HOC for your root App component. The global and route level payload makes the route transition more flexible and powerful.


## Peer Dependencies

- `React` ^16.8.0
- `router5` ^7.0.0 || ^8.0.0
- `mobx` ^4.0.0 || ^5.0.0
- `mobx-react-lite` ^1.0.0 || ^2.0.0


## Installation
`npm install --save mr-router5`


## Upgrade v3 to v4

`v4` removes the `RouteTree` class, the upgrade should be straightforward.
```js
// v3
import { RouteTree, routerStore, initMrRouter5 } from "mr-router5";

const routeTree = new RouteTree([...]);
const router = createRouter(routeTree.getRoutes(), {});
initMrRouter5(router, routeTree);

// v4
import { routerStore, toRoutes } from "mr-router5";

const routeViews = [...];
const router = createRouter(toRoutes(routeViews), {});
routeStore.init(router, routeViews);
```


## Reference

- [API docs](https://pzmosquito.github.io/mr-router5/)
- [payload](#payload)


## Basic Usage

*see [router5](https://router5.js.org/guides/defining-routes#adding-routes) on how to create router.*

```js
import React from "react";
import { render } from "react-dom";
import createRouter from "router5";
import { RouteComponent, RouteView, routerStore, toRoutes } from "mr-router5";

// define components.
const Home = () => <div>'home' component</div>;
const UserNode = () => <div>'user' route node component</div>;
const UserList = () => <div>'user list' component</div>;
const UserView = () => <div>'user view' component</div>;

// define route views. NOTE, only flat routes are supported.
const routeViews = [
    new RouteView({name: "home", path: "/"}, Home),
    new RouteView({name: "users", path: "/users"}, UserNode),
    new RouteView({name: "users.list", path: "/list"}, UserList),
    new RouteView({name: "users.view", path: "/view"}, UserView),
];

// initialize router and router store.
const router = createRouter(toRoutes(routeViews), {});
routeStore.init(router, routeViews);

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

You can set `extra` and `dataLoader` for route view. `extra` and `dataLoader` are simply JS Map. There are many ways to use them, one example will be middleware, see [router5 middleware](https://router5.js.org/advanced/middleware).

Currently, there's no difference between `extra` and `dataLoader` in terms of functionality. I keep them for future improvements.

```js
const routeViews = [
    new RouteView({name: "login", path: "/login"}, Login),
    new RouteView({name: "user", path: "/user"}, UserComponent)
        .setExtra("user", "John Doe")
        .setExtra("requireLogin", true)
        .setDataLoader("getUserDetail", (user) => ({ /* user details */ }))
];

// write middleware
router.useMiddleware((router) => (toState, fromState, done) => {
    // get route view of the toState
    const rv = routerStore.getRouteView(toState.name);
    
    // skip login check if 'requireLogin' is false.
    if (!rv.getExtra("requireLogin", false)) {
        done();
        return;
    }

    const isLoggedIn = true; // check if user is logged in
    if (isLoggedIn) {
        const user = rv.getExtra("user");
        const userDetail = rv.dataLoader.get("getUserDetail")(user);
        done();
    }
    else {
        done({ redirect: { name: "login" } });
    }
});
```

That's it. Enjoy routing.
