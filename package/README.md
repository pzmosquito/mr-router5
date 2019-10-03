# mr-router5 &nbsp; [![npm version](https://img.shields.io/npm/v/mr-router5)](https://www.npmjs.com/package/mr-router5) [![npm bundle size](https://img.shields.io/bundlephobia/min/mr-router5)](https://bundlephobia.com/result?p=mr-router5) [![npm type definitions](https://img.shields.io/npm/types/mr-router5)](https://www.npmjs.com/package/mr-router5)

mr-router5 uses [Router5](https://router5.js.org) together with [MobX](https://mobx.js.org) for your favorite React application.

- `router5` is an awesome framework and view library agnostic router.
- `MobX` is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming.


## Why mr-router5

First of all, router5 is just better than `react-router` IMO, simple, powerful, clean implementation. router5 has `react-router5` package that works with React application. However, using MobX makes the connection so much easier. `mr-router5` also has powerful data loading feature and payload system that make route transition much more flexible .


## Peer Dependencies

- `React` ^16.8.0
- `router5` ^7.0.0
- `mobx` ^4.0.0 || ^5.0.0
- `mobx-react-lite` ^1.0.0


## Installation
`npm install --save mr-router5`


## Reference

- [API docs](https://pzmosquito.github.io/mr-router5/)
- [dataloader-middleware](#dataloader)
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
<a name="dataloader"></a>
## dataloaderMiddleware

We sometimes need to load data during the route transition. `mr-router5` supports data loaders at route level or at global level.

```js
import { dataloaderMiddleware, RouteTree, RouteView, DataLoader, initMrRouter5 } from "mr-router5";
import createRouter from "router5";

// dataloader middleware will pass an object consists of `toState`, `fromState`, `routeTree`, `router`, `carriedData` properties as argument to loader functions.

const checkAuth = () => { /* check auth */ }

const getData = () => Promise.resolve("test data");

const processData = ({ carriedData }) => console.log(carriedData);

// define route tree
const routeTree = new RouteTree([
    new RouteView({name: "user", path: "/user"}, UserComponent)
        .addDataLoaders(
            new DataLoader(getData), // data resolved here can be carried over to next data loader.
            new DataLoader(processData), // this will log "test data"
        )
        .mergeDataLoaders() // call global data loaders after `addDataLoaders()`, global loaders can be defined later.

]);

// add global data loader to route tree.
// global loaders will not be auto loaded, you need to call `mergeDataLoaders()` to tell route view to load it.
routeTree.addDataLoaders(new DataLoader(checkAuth));

const router = createRouter(routeTree.getRoutes(), {});

// use middleware
router.useMiddleware(dataloaderMiddleware);

initMrRouter5(router, routeTree);
```

<a name="payload"></a>
## payload

You can set payload to route view or route tree.

```js
// set payload
const routeTree = new RouteTree([
    new RouteView({name: "user", path: "/user"}, UserComponent).setPayload("user", "John Doe")
]);

routeTree.setPayload({ userList: ["John Doe", "Jane Doe"], loggedIn: true });

// retrieve payload
routerStore.toRouteView.getPayload("user"); // John Doe

routeStore.routeTree.getPayload("userList"); // ["John Doe", "Jane Doe"]

// or retrieve all payload
routeStore.routeTree.getPayload(); // {userList: ["John Doe", "Jane Doe"], loggedIn: true}
```

That's it. Enjoy routing.


## Example

1. clone the repo
1. go to `package` directory, `npm install` and `npm run build`
1. go to `example` directory, `npm install` and `npm run dev`
1. launch browser, navigate to `http://localhost:8080`
