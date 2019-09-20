# mr-router5 &nbsp; [![npm version](https://img.shields.io/npm/v/mr-router5)](https://www.npmjs.com/package/mr-router5) [![npm bundle size](https://img.shields.io/bundlephobia/min/mr-router5)](https://bundlephobia.com/result?p=mr-router5) [![npm type definitions](https://img.shields.io/npm/types/mr-router5)](https://www.npmjs.com/package/mr-router5)

mr-router5 uses [Router5](https://router5.js.org) together with [MobX](https://mobx.js.org) for your favorite React application.

- `router5` is an awesome framework and view library agnostic router.
- `MobX` is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.


## Why mr-router5

First of all, router5 is just better than `react-router` IMO, simple, powerful, clean implementation. router5 has `react-router5` package that works with React application. However, using MobX makes the connection so much easier. In Fact, it's so easy that I'm even hesitant to create this package.


## Peer Dependencies

- `React` ^16.8.0
- `router5` ^7.0.0
- `mobx` ^4.0.0 || ^5.0.0
- `mobx-react-lite` ^1.0.0


## Installation
`npm install --save mr-router5`


## How to use

`mr-router5` package export following:
- `routerApp(router, routes, WrappedComponent)` the HOC to initialize `mr-router5`.
  - `router` the user defined router instance.
  - `routes` the user defined routes definition.
  - `WrappedComponent` the root app component.
- `routerStore` the MobX store object which contains:
  - `route` the "to" route object.
  - `previousRoute` the "from" route object.
  - `obsRoute` the observable "to" route object.
  - `obsPreviousRoute` the observable "from" route object.
  - `router` the reference of user created router instance.
  - `routes` the reference of user created routes definition.
  - `getRouteDef` the utility method to get routes definition object with given route name.
- `RouteComponent` the component to render view component for a route.
- `dataloaderMiddleware` the middleware for data loading lifecycle methods.

### define routes with additional `component` property

*The `component` property is not for router5 to be aware of the view, in fact, router5 should never know about the view. It's here for mr-router5 to compute which component to render.*

**Both flat routes and tree routes are supported.**

```js
import Home from "../home/Home";
import UserNode from "../route-nodes/UserNode";
import UserNode from "../route-nodes/UserViewNode";
import UserList from "../users/UserList";
import UserView from "../users/UserView";

export default [
    {name: "home", path: "/", component: Home},
    {name: "users", path: "/users", component: UserNode, children: [
        {name: "list", path: "/list", component: UserList},
        {name: "view", path: "/view", component: UserViewNode, children: [
            {name: "detail", path: "/:id<\\d+>", component: UserView}
        ]}
    ]}
];

```

### create root node component

*Important: `routeNodeName` prop **must** match the full route name. For example, `users.view` instead of `view`.*

```js
import * as React from "react";
import {RouteComponent} from "mr-router5";

const routeNodeName = ""; // empty string for root route node

export default () => (
    <div>
        <h2>Header</h2>
        <RouteComponent routeNodeName={routeNodeName} />
        <h4>Footer</h4>
    </div>
);
```

### wrap your base component with `routerApp`

`routerApp` function takes `router` instance, `routes` definition, and the root app component.

*see [router5](https://router5.js.org/guides/defining-routes) on how to define routes and create router.*

```js
import createRouter from "router5";
import {routerApp} from "mr-router5";
import RootNode from "./route-nodes/RootNode";

// create routes definition and router
const routes = [...];
const router = createRouter(routes);

// initialize mr-router5 by wrapping RootNode with routerApp() HOC
const App = routerApp(router, routes, RootNode);

router.start(() => {
    ReactDOM.render(<App />, document.getElementById("app"));
});
```

### define router5 routes with loader functions

*We sometimes need to load data before/on/after rendering the component. mr-router5 supports data loading lifecyle methods. Please see `example` app for some sample code.*
- `preloader`: called when route transition starts. Route transition and other lifecycle methods **will not** wait for it to finish if the function returns a `Promise`.
- `loader`: called after `preloader`. Route transition **will** wait for it to finish.
    - `loader` method optionally takes an object with following properties (if `loader` method returns a Promise, pass the object to `resolve()` or `reject()`; otherwise, simply return the object):
        - `redirect`: an object with `name` and optional `params` properties for redirection.
        - `skipPostloader`: a boolean value for skipping `postloader`.
- `postloader`: called after route transition is done.


```js
import {dataloaderMiddleware} from "mr-router5";

// dataloader middleware will pass an object consists of `toState`, `fromState`, `router` properties as argument to loader functions.

// preloader gets called when route transition starts.
const preloader = ({toState, fromState, router}) => new Promise((resolve) => {
    // load data that won't alter route transition
    resolve();
});

// loader gets called after preloader but will not wait for preloader to settle.
const loader = ({toState, fromState, router}) => new Promise((resolve, reject) => {
    resolve();
    // OR
    reject({
        redirect: { name: "login" },
        skipPostloader: true,
    });
});

// postloader gets called after route transition is done.
const postloader = ({toState, fromState, router}) => console.log("transition is done.");

const routes =  [
    {name: "home", path: "/", component: Home, preloader, loader, postloader},
    {name: "login", path: "/login", component: Login},
];

const router = createRouter(); // create router5 router instance.
router.useMiddleware(dataloaderMiddleware);
```

That's it. Enjoy routing.


## Example

1. clone the repo
1. go to `package` directory, `npm install` and `npm run build`
1. go to `example` directory, `npm install` and `npm run dev`
1. launch browser, navigate to `http://localhost:8080`
