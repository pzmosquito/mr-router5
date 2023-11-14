# mr-router5 &nbsp; [![npm version](https://img.shields.io/npm/v/mr-router5)](https://www.npmjs.com/package/mr-router5) [![npm bundle size](https://img.shields.io/bundlephobia/min/mr-router5)](https://bundlephobia.com/result?p=mr-router5) [![npm type definitions](https://img.shields.io/npm/types/mr-router5)](https://www.npmjs.com/package/mr-router5)

mr-router5 uses [Router5](https://router5.js.org) together with [MobX](https://mobx.js.org) for your favorite React application.

- `router5` is an awesome framework and view library agnostic router.
- `MobX` is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.


## Why mr-router5

mr-router5 creates a minimal bridge between router5, MobX and React. When I say 'minimal bridge', I really mean it. Your React components stay untouched, there's no need to create HOC for your root App component. The global and route level payload makes the route transition more flexible and powerful.


## Peer Dependencies

[see here](./package.json#L34).


## Installation
`npm install --save mr-router5`


## Reference

- [API docs](https://pzmosquito.github.io/mr-router5/)
- [payload](#payload)


## Basic Usage

*see [router5](https://router5.js.org/guides/defining-routes#adding-routes) on how to create router instance.*

```js
import React from "react";
import { render } from "react-dom";
import { RouteComponent, RouteView, routerStore } from "mr-router5";

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

// create router instance and initialize mr-router5.
const router = routerStore.createRouter(routeViews, {});

// create root route node.
const routeNodeName = ""; // THIS NAME MUST MATCH THE ROUTE NAME! (empty string for root route node)
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

You can add payload to each route view, by setting `extra` and `dataLoader`. There are many ways to use them, one example would be middleware, see [router5 middleware](https://router5.js.org/advanced/middleware). The middleware with payload is ideal for fetching data or checking authentication prior to navigating to the target route.

```js
import React from "react";
import { render } from "react-dom";
import { RouteView, makeMiddleware } from "mr-router5";
const routeViews = [
    new RouteView({name: "login", path: "/login"}, Login),
    new RouteView({name: "user", path: "/user"}, UserComponent)
        .setExtra("user", "John Doe")
        .setExtra("requireLogin", true)
        .setDataLoader("getUserDetail", (user) => ({ /* user details */ }))
];

const middleware = (middlewareData) => {
    // middlewareData is an object that can be destructured with the following properties.
    const {
        router,
        toState,
        fromState,
        done,
        getDataLoader,
        getExtra,
    } = middlewareData;
    
    // skip login check if 'requireLogin' is false.
    if (!getExtra("requireLogin", false)) {
        done();
    }
    else {
        // check if user is logged in
        const isLoggedIn = true;
        if (isLoggedIn) {
            const user = getExtra("user");
            const userDetail = getDataLoader("getUserDetail")(user);
            done();
        }
        else {
            done({ redirect: { name: "login" } });
        }
    }
}

// The 'makeMiddleware' wrapper simplifies the original router5 middleware implementation.
router.useMiddleware(makeMiddleware(middleware));
```

That's it. Enjoy routing.
