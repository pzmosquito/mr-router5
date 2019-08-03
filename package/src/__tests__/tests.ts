import * as React from "react";
import createRouter, { Router } from "router5";
import { routerApp, routerStore, dataloaderMiddleware, RouteComponent } from "../index";
import { shallow } from "enzyme";


const AppComponent = () => React.createElement("<div>Root App Element</div>");
const HomeComponent = () => React.createElement("<div>Home Element</div>");
const LoginComponent = () => React.createElement("<div>Login Element</div>");
const UserRouteNode = () => React.createElement("<RouteComponent />", { routeNodeName: "users" });
const UserViewComponent = () => React.createElement("<div>User View Element</div>");

let loaders: string[] = [];
const simulateFetch = (str: string, delay = 0) => new Promise((resolve) => {
    setTimeout(() => {
        loaders.push(str);
        resolve(str);
    }, delay);
});
const preloader = () => Promise.resolve(simulateFetch("preloaded", 30));
const loader = () => Promise.resolve(simulateFetch("loaded", 15));
const postloader = () => Promise.resolve(simulateFetch("postloaded"));

const routes = [
    { name: "home", path: "/", component: HomeComponent },
    { name: "login", path: "/login", component: LoginComponent },
    { name: "users", path: "/users", component: UserRouteNode, children: [
        { name: "view", path: "/view", component: UserViewComponent, preloader, loader, postloader },
    ] },
];
let router: Router = null;
let WrappedApp: React.ComponentType<object> = null;

beforeEach(() => {
    router = createRouter(routes);
    WrappedApp = routerApp(router, routes, AppComponent);
    router.start("/");
});

afterEach(() => {
    router = null;
    WrappedApp = null;
    loaders = [];
})

test("routerApp", () => {
    expect(routerStore.routes).toBe(routes);
    expect(routerStore.router).toBe(router);
    expect(WrappedApp).toBe(AppComponent);
});

test("routerStore.routeUpdated()", () => {
    router.navigate("login", () => {
        expect(routerStore.route.name).toBe("login");
        expect(routerStore.routeNodePath.get("").component).toBe(LoginComponent);
    });
    router.navigate("users.view", () => {
        expect(routerStore.route.name).toBe("users.view");
        expect(routerStore.routeNodePath.get("users").component).toBe(UserViewComponent);
    });
});

test("routerStore.getRouteDef()", () => {
    expect(routerStore.getRouteDef("home").component).toBe(HomeComponent);
    expect(routerStore.getRouteDef("login").component).toBe(LoginComponent);
    expect(routerStore.getRouteDef("users").component).toBe(UserRouteNode);
    expect(routerStore.getRouteDef("users.view").component).toBe(UserViewComponent);
});

test("dataloaderMiddleware", (done) => {
    expect(loaders.length).toBe(0);
    router.useMiddleware(dataloaderMiddleware);
    router.navigate("users.view", () => {
        expect(loaders.length).toBe(1);
        expect(loaders[0]).toBe("loaded");

        setTimeout(() => {
            expect(loaders.length).toBe(3);
            expect(loaders[0]).toBe("loaded");
            expect(loaders[1]).toBe("postloaded");
            expect(loaders[2]).toBe("preloaded");
            done();
        }, 30);
    });
});

test("RouteComponent", () => {
    router.navigate("users.view", () => {
        let elem = React.createElement(RouteComponent, { routeNodeName: "" });
        let wrapper = shallow(elem);
        expect(wrapper.equals(React.createElement(UserRouteNode))).toBe(true);

        elem = React.createElement(RouteComponent, { routeNodeName: "users" });
        wrapper = shallow(elem);
        expect(wrapper.equals(React.createElement(UserViewComponent))).toBe(true);
    });
});
