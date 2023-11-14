# mr-router5 &nbsp; [![npm version](https://img.shields.io/npm/v/mr-router5)](https://www.npmjs.com/package/mr-router5) [![npm bundle size](https://img.shields.io/bundlephobia/min/mr-router5)](https://bundlephobia.com/result?p=mr-router5)

mr-router5 uses [Router5](https://router5.js.org) together with [MobX](https://mobx.js.org) for your favorite React application.

- `router5` is an awesome framework and view library agnostic router.
- `MobX` is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.


## Why mr-router5

mr-router5 creates a minimal bridge between router5, MobX and React. When I say 'minimal bridge', I really mean it. Your React components stay untouched, there's no need to create HOC for your root App component. The route view features makes the route transition more flexible and powerful.


## Peer Dependencies

- `mobx`: ^6,
- `mobx-react-lite`: ^3 || ^4,
- `react`: >=16.8,
- `router5`: ^7 || ^8


## Installation

`npm install --save mr-router5`


## Basic Usage

Integrating `mr-router5` into your React application is straightforward. Below is an example that demonstrates the essential steps:

1. **Create Route Node Components**: Start by creating the route node components.

*see [router5](https://router5.js.org/introduction/core-concepts) docs for the core concepts.*
```js
export const RootNode = () => (
    <div>
        <h2>Site Header</h2>
        {/*
            IMPORTANT: The 'routeNodeName' prop must match the route node name defined in step 2!
            (empty string for root route node)
        */}
        <RouteComponent routeNodeName="" />
        <h4>Footer</h4>
    </div>
);

export const UserNode = () => (
    <div>
        <h2>User Page</h2>
        <RouteComponent routeNodeName="users" />
    </div>
);
```

2. **Set Up Route Views**: `mr-router5` utilizes `RouteView` to associate routes with components. Here, we define a set of route views, linking each route to its respective component.
```js
import { RouteView } from "mr-router5";
// import route nodes and other components

const routeViews = [
    new RouteView({name: "home", path: "/"}, Home),
    new RouteView({name: "users", path: "/users"}, UserNode),
    new RouteView({name: "users.list", path: "/list"}, UserList),
    new RouteView({name: "users.view", path: "/view"}, UserView),
];
```
Note: `mr-router5` currently supports only flat routes, meaning nested routes are not yet available.

3. **Initialize and start the Router**: Create and initialize the router with the defined route views. This sets up the routing logic for your application. Finally start the router to enable route handling in your application.

*see [router5](https://router5.js.org/guides/defining-routes#adding-routes) docs for adding options and dependencies.*
```js
const options = {};
const dependencies = {};
const router = routerStore.createRouter(routeViews, options, dependencies);
router.start(() => {
    render(<RootNode />, document.getElementById("app"));
});
```


## Extra Features

You can add extra functionalities to route views by attaching the `extra` and `dataLoader` payload. There are many ways to use them, one example would be middleware. The middleware is ideal for fetching data or checking authentication prior to navigating to the target route. The `extra` and `dataLoader` payload will further streamline the original router5 middleware implementation.

*see [router5](https://router5.js.org/advanced/middleware) docs for adding middlewares.*

1. **Attach Extra and DataLoader**: You can attach additional data or loaders to your route views. This is useful for scenarios like data preloading or conditional route handling.
```js
import { RouteView } from "mr-router5";
// import route nodes and other components

const routeViews = [
    new RouteView({name: "login", path: "/login"}, Login),
    new RouteView({name: "user", path: "/user"}, UserComponent)
        .setExtra("user", "John Doe")
        .setExtra("requireLogin", true)
        .setDataLoader("getUserDetail", (user) => ({ /* user details */ }))
];
```

2. **Middleware Implementation**: `makeMiddleware()` simplifies and adds additional context to the original router5 middleware implementation.
```js
import { makeMiddleware } from "mr-router5";

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

router.useMiddleware(makeMiddleware(middleware));
```

That's it. Enjoy routing.
