# mr-router5 &nbsp; [![npm version](https://img.shields.io/npm/v/mr-router5)](https://www.npmjs.com/package/mr-router5) [![npm bundle size](https://img.shields.io/bundlephobia/min/mr-router5)](https://bundlephobia.com/result?p=mr-router5) [![npm type definitions](https://img.shields.io/npm/types/mr-router5)](https://www.npmjs.com/package/mr-router5)

mr-router5 uses [Router5](https://router5.js.org) together with [MobX](https://mobx.js.org) for your favorite React application.

- `router5` is an awesome framework and view library agnostic router.
- `MobX` is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.


## Why mr-router5

First of all, router5 is just better than `react-router` IMO, simple, powerful, clean implementation. router5 has `react-router5` package that works with React application. However, using MobX makes the connection so much easier. `mr-router5` also has powerful data loader lifecycle methods and payload system that make route transition much more flexible .


## Peer Dependencies

- `React` ^16.8.0
- `router5` ^7.0.0
- `mobx` ^4.0.0 || ^5.0.0
- `mobx-react-lite` ^1.0.0


## Installation
`npm install --save mr-router5`


## Reference

- `RouteView` contain route info, more like a superset of router5 [route object](https://router5.js.org/guides/defining-routes).
    - `setRoute(route)` set router5 route object.
    - `getRoute()` retrieve router5 route object.
    - `setComponent(component)` set React component for the route.
    - `getComponent()` retrieve React component for the route.
    - `setPreloader(loaderFn)` define route level `preloader` lifecycle method.
        - if set, it'll override global method.
    - `setLoader(loaderFn)` define route level `loader` lifecycle method.
        - if set, it'll override global method.
    - `setPostloader(loaderFn)` define route level `postloader` lifecycle method.
        - if set, it'll override global method.
    - `setExtra(name, data?)` define route level extra payload.
        - 'name' param can be object that maps 'key, value' to 'name' and 'data'.
        - it **does not** override global extra payload.
    - `getExtra(name?)` retrieve route level extra payload by name.

#### `mr-router5` package exports following:
- `RouteTree` hold all RouteView objects.
    - `constructor(routeViews)` create RouteTree instance with array of RouteView objects.
    - `add(routeView, routeView, ...)` add RouteView objects to the route tree.
    - `getRoutes()` retrieve array of `router5` route objects.
    - `static createRouteView(route, component)` create RouteView object.
        - `route` `router5` route object.
        - `component` React component to render for the route.
    - `getRouteView(name)` retrieve RouteView object by route name.
    - `setPreloader(loaderFn)` define global `preloader` lifecycle method for all routes.
    - `setLoader(loaderFn)` define global `loader` lifecycle method for all routes.
    - `setPostloader(loaderFn)` define global `postloader` lifecycle method for all routes.
    - `setExtra(name, data?)` define global extra payload for all routes.
        - 'name' param can be object that maps 'key, value' to 'name' and 'data'.
    - `getExtra(name?)` retrieve global extra payload by name.
- `initRouterStore(router, routeTree)` initialize router store.
    - `router` the `router5` router instance.
    - `routeTree` the `RouteTree` instance.
- `RouteComponent` the React component to render component defined in `RouteView`.
- `routerStore` the store object which contains:
    - `route` the "to" route object.
    - `previousRoute` the "from" route object.
    - `routeView` the "to" RouteView object.
    - `previousRouteView` the "from" RouteView object.
    - `router` the reference of the `router5` router instance.
    - `routeTree` the reference of the `RouteTree` instance.
- [`dataloaderMiddleware`](#dataloader) the middleware for data loader lifecycle methods.


## How to use

### define route tree

**Only flat routes are supported.**

```js
// routes.js

import { RouteTree } from "mr-router5";
import Home from "../home/Home";
import UserNode from "../route-nodes/UserNode";
import UserNode from "../route-nodes/UserViewNode";
import UserList from "../users/UserList";
import UserView from "../users/UserView";

export default new RouteTree([
    RouteTree.createRouteView({name: "home", path: "/"}, Home),
    RouteTree.createRouteView({name: "users", path: "/users"}, UserNode),
    RouteTree.createRouteView({name: "users.list", path: "/list"}, UserList),
    RouteTree.createRouteView({name: "users.view", path: "/view"}, UserViewNode),
    RouteTree.createRouteView({name: "users.view.detail", path: "/:id<\\d+>"}, UserView),
]);

```

### create root node component

```js
// RootNode.jsx

import React from "react";
import { RouteComponent } from "mr-router5";

// Important: routeNodeName must match the full route name. For example, `users.view` instead of `view`.*
const routeNodeName = ""; // empty string for root route node

export default () => (
    <div>
        <h2>Header</h2>
        <RouteComponent routeNodeName={routeNodeName} />
        <h4>Footer</h4>
    </div>
);
```

### initialize router store

*see [router5](https://router5.js.org/guides/defining-routes#adding-routes) on how to create router.*

```js
// App.jsx

import React from "react";
import { render } from "react-dom";
import createRouter from "router5";
import { initRouterStore } from "mr-router5";
import routeTree from "./routes";
import RootNode from "./route-nodes/RootNode";

const router = createRouter(routeTree.getRoutes(), {});
initRouterStore(router, routeTree);

// IMPORTANT: if you call routeTree.add() to add RouteView after router is created, you need to call `router.add(routeTree.getRoutes())` to add new routes as well.

router.start(() => {
    render(<RootNode />, document.getElementById("app"));
});
```
<a name="dataloader"></a>
### define router5 routes with loader functions

*We sometimes need to load data before/on/after rendering the component. mr-router5 supports data loading lifecyle methods. Please see `example` app for some sample code.*
- `preloader`: called when route transition starts. Route transition and other lifecycle methods **will not** wait for it to finish if the function returns a `Promise`.
- `loader`: called after `preloader`. Route transition **will** wait for it to finish.
    - `loader` method optionally takes an object with following properties (if `loader` method returns a Promise, pass the object to `resolve()` or `reject()`; otherwise, simply return the object):
        - `redirect`: an object with `name` and optional `params` properties for redirection.
        - `skipPostloader`: a boolean value for skipping `postloader`.
- `postloader`: called after route transition is done.


```js
import { dataloaderMiddleware, RouteTree } from "mr-router5";
import createRouter from "router5";

// dataloader middleware will pass an object consists of `toState`, `fromState`, `routeTree`, `router` properties as argument to loader functions.

// preloader gets called when route transition starts.
const preloader = ({toState, fromState, routeTree, router}) => new Promise((resolve) => {
    // load data that won't alter route transition
    resolve();
});

// loader gets called after preloader but will not wait for preloader to settle.
const loader = ({toState, fromState, routeTree, router}) => new Promise((resolve, reject) => {
    resolve();
    // OR
    reject({
        redirect: { name: "login" },
        skipPostloader: true,
    });
});

// postloader gets called after route transition is done.
const postloader = ({toState, fromState, routeTree, router}) => console.log("transition is done.");

const routeTree = new RouteTree([
    RouteTree.createRouteView({name: "home", path: "/"})
        .setPreloader(preloader)
        .setLoader(loader)
        .setPostloader(postloader),
    RouteTree.createRouteView({name: "login", path: "/login"}, Login),
]);

// you can also define global loaders. global loaders will be loaded on all routes.
// if you have loader defined for a route, it'll override the global loader.
routeTree.setPostloader(({ toState }) => {
    console.log(`${toState.name} loaded`);
});

const router = createRouter(routeTree.getRoutes(), {});
router.useMiddleware(dataloaderMiddleware);
```

That's it. Enjoy routing.


## Example

1. clone the repo
1. go to `package` directory, `npm install` and `npm run build`
1. go to `example` directory, `npm install` and `npm run dev`
1. launch browser, navigate to `http://localhost:8080`
