import React from "react";
import createRouter, { Router } from "router5";
import { routerApp, routerStore, dataloaderMiddleware, RouteComponent } from "../index";
import { shallow } from "enzyme";


const AppComponent = () => React.createElement("<div>Root App Element</div>");
const HomeComponent = () => React.createElement("<div>Home Element</div>");
const LoginComponent = () => React.createElement("<div>Login Element</div>");
const UserRouteNode = () => React.createElement("<RouteComponent />", { routeNodeName: "users" });
const UserViewComponent = () => React.createElement("<div>User View Element</div>");

let loaders: string[] = [];
const simulateFetch = (str: string, delay = 0, toReject = false, skipPostloader = false) => new Promise((resolve, reject) => {
    setTimeout(() => {
        loaders.push(str);

        if (toReject) {
            reject({ redirect: { name: "login" }, skipPostloader });
        }
        else {
            resolve();
        }
    }, delay);
});
const preloader = (stateName: string) => simulateFetch(`${stateName} preloaded`, 30);
const loader = (stateName: string) => simulateFetch(`${stateName} loaded`, 15);
const errLoader = (stateName: string, skipPostloader = false) => simulateFetch(`${stateName} err loaded`, 15, true, skipPostloader);
const postloader = (stateName: string) => simulateFetch(`${stateName} postloaded`);

const routes = [
    { name: "home", path: "/", component: HomeComponent },
    { name: "login", path: "/login", component: LoginComponent, postloader: () => postloader("login") },
    { name: "users", path: "/users", component: UserRouteNode, children: [
        { name: "view", path: "/view", component: UserViewComponent, preloader: () => preloader("view"), loader: () => loader("view"), postloader: () => postloader("view") },
        { name: "viewerr", path: "/viewerr", component: UserViewComponent, preloader: () => preloader("viewerr"), loader: () => errLoader("viewerr"), postloader: () => postloader("viewerr") },
        { name: "viewerrskip", path: "/viewerrskip", component: UserViewComponent, preloader: () => preloader("viewerrskip"), loader: () => errLoader("viewerrskip", true), postloader: () => postloader("viewerrskip") },
        { name: "viewerrskipsync", path: "/viewerrskipsync", component: UserViewComponent, loader: () => ({ redirect: { name: "login" }, skipPostloader: true }), postloader: () => postloader("viewerrskipsync") },
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
        expect(loaders[0]).toBe("view loaded");

        setTimeout(() => {
            expect(router.getState().name).toBe("users.view");
            expect(loaders.length).toBe(3);
            expect(loaders[0]).toBe("view loaded");
            expect(loaders[1]).toBe("view postloaded");
            expect(loaders[2]).toBe("view preloaded");
            done();
        }, 50);
    });
});

test("dataloaderMiddlewareRedirect", (done) => {
    expect(loaders.length).toBe(0);
    router.useMiddleware(dataloaderMiddleware);
    router.navigate("users.viewerr", () => {
        expect(loaders.length).toBe(1);
        expect(loaders[0]).toBe("viewerr err loaded");

        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(loaders.length).toBe(4);
            expect(loaders[0]).toBe("viewerr err loaded");
            expect(loaders[1]).toBe("login postloaded");
            expect(loaders[2]).toBe("viewerr postloaded");
            expect(loaders[3]).toBe("viewerr preloaded");
            done();
        }, 80);
    });
});

test("dataloaderMiddlewareRedirectSkipPostloader", (done) => {
    expect(loaders.length).toBe(0);
    router.useMiddleware(dataloaderMiddleware);
    router.navigate("users.viewerrskip", () => {
        expect(loaders.length).toBe(1);
        expect(loaders[0]).toBe("viewerrskip err loaded");

        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(loaders.length).toBe(3);
            expect(loaders[0]).toBe("viewerrskip err loaded");
            expect(loaders[1]).toBe("login postloaded");
            expect(loaders[2]).toBe("viewerrskip preloaded");
            done();
        }, 80);
    });
});

test("dataloaderMiddlewareRedirectSkipPostloaderSync", (done) => {
    expect(loaders.length).toBe(0);
    router.useMiddleware(dataloaderMiddleware);
    router.navigate("users.viewerrskipsync", () => {
        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(loaders.length).toBe(1);
            expect(loaders[0]).toBe("login postloaded");
            done();
        }, 50);
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
