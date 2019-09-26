import React from "react";
import createRouter, { Router } from "router5";
import { connectRouter, dataloaderMiddleware, RouteTree, RouteView } from "../index";


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

const routeTree = new RouteTree([
    new RouteView({ name: "home", path: "/" }, HomeComponent),
    new RouteView({ name: "login", path: "/login" }, LoginComponent).setPostloader(() => postloader("login")),
    new RouteView({ name: "users", path: "/users" }, UserRouteNode),
    new RouteView({ name: "users.view", path: "/view" }, UserViewComponent)
        .setPreloader(() => preloader("view"))
        .setLoader(() => loader("view"))
        .setPostloader(() => postloader("view")),
    new RouteView({ name: "users.viewerr", path: "/viewerr" }, UserViewComponent)
        .setPreloader(() => preloader("viewerr"))
        .setLoader(() => errLoader("viewerr"))
        .setPostloader(() => postloader("viewerr")),
    new RouteView({ name: "users.viewerrskip", path: "/viewerrskip" }, UserViewComponent)
        .setPreloader(() => preloader("viewerrskip"))
        .setLoader(() => errLoader("viewerrskip", true))
        .setPostloader(() => postloader("viewerrskip")),
    new RouteView({ name: "users.viewerrskipsync", path: "/viewerrskipsync" }, UserViewComponent)
        .setLoader(() => ({ redirect: { name: "login" }, skipPostloader: true }))
        .setPostloader(() => postloader("viewerrskipsync")),
]);

let router: Router = null;

beforeEach(() => {
    router = createRouter(routeTree.getRoutes());
    connectRouter(router, routeTree);
    router.start("/");
    router.useMiddleware(dataloaderMiddleware);
    expect(loaders.length).toBe(0);
});

afterEach(() => {
    router = null;
    loaders = [];
})

test("dataloaderMiddleware", (done) => {
    expect(loaders.length).toBe(0);
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
    router.navigate("users.viewerrskipsync", () => {
        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(loaders.length).toBe(1);
            expect(loaders[0]).toBe("login postloaded");
            done();
        }, 50);
    });
});

test("global loaders", (done) => {
    routeTree.setPreloader(() => preloader("global"));
    routeTree.setLoader(() => loader("global"));
    routeTree.setPostloader(() => postloader("global"));

    router.navigate("login", () => {
        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(loaders.length).toBe(3);
            expect(loaders[0]).toBe("global loaded");
            expect(loaders[1]).toBe("login postloaded");
            expect(loaders[2]).toBe("global preloaded");
            done();
        }, 50);
    });
});
