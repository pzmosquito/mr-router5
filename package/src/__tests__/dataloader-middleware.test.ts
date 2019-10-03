import React from "react";
import createRouter, { Router, State } from "router5";
import { initMrRouter5, dataloaderMiddleware } from "../index";
import RouteTree from "../RouteTree";
import RouteView from "../RouteView";
import DataLoader from "../DataLoader";


const HomeComponent = () => React.createElement("<div>Home Element</div>");
const LoginComponent = () => React.createElement("<div>Login Element</div>");
const AdminComponent = () => React.createElement("<div>Admin Element</div>");
const UserRouteNode = () => React.createElement("<RouteComponent />", { routeNodeName: "users" });
const UserViewComponent = () => React.createElement("<div>User View Element</div>");

let loaders: string[] = [];
const simulateFetch = (str: string, delay = 0, toReject = false) => new Promise((resolve, reject) => {
    setTimeout(() => {
        loaders.push(str);

        if (toReject) {
            reject({ redirect: { name: "login" } });
        }
        else {
            resolve();
        }
    }, delay);
});
const preloader = (stateName: string) => simulateFetch(`${stateName} preloaded`, 30);
const loader = (stateName: string) => simulateFetch(`${stateName} loaded`, 10);
const errLoader = (stateName: string) => simulateFetch(`${stateName} err loaded`, 10, true);
const postloader = (stateName: string) => simulateFetch(`${stateName} postloaded`);

let routeTree: RouteTree = null;

let router: Router = null;

beforeEach(() => {
    router = null;
    loaders = [];
    routeTree = null;

    routeTree = new RouteTree([
        new RouteView({ name: "home", path: "/" }, HomeComponent),
        new RouteView({ name: "login", path: "/login" }, LoginComponent)
            .addDataLoaders(new DataLoader(() => postloader("login"))),
        new RouteView({ name: "admin", path: "/admin" }, AdminComponent)
            .setPayload("loginRequired", true)
            .addDataLoaders(new DataLoader(({ toState, routeTree }: any) => {
                loaders.push(routeTree.getPayload("loginRequired"));
                loaders.push(routeTree.getRouteView(toState.name).getPayload("loginRequired"));
            })),
        new RouteView({ name: "users", path: "/users" }, UserRouteNode),
        new RouteView({ name: "users.view", path: "/view" }, UserViewComponent)
            .addDataLoaders(
                new DataLoader(() => preloader("view"), false),
                new DataLoader(() => loader("view")),
                new DataLoader(() => postloader("view")),
            ),
        new RouteView({ name: "users.viewerr", path: "/viewerr" }, UserViewComponent)
            .addDataLoaders(
                new DataLoader(() => preloader("viewerr"), false),
                new DataLoader(() => errLoader("viewerr")),
                new DataLoader(() => postloader("viewerr")),
            ),
        new RouteView({ name: "users.viewerrskip", path: "/viewerrskip" }, UserViewComponent)
            .addDataLoaders(
                new DataLoader(() => errLoader("viewerrskip"), false),
                new DataLoader(() => preloader("viewerrskip")),
            ),
        new RouteView({ name: "users.viewerrskipsync", path: "/viewerrskipsync" }, UserViewComponent)
            .addDataLoaders(
                new DataLoader(() => ({ redirect: { name: "login" } })),
                new DataLoader(() => postloader("viewerrskipsync")),
            )
    ]);
    router = createRouter(routeTree.getRoutes());
    initMrRouter5(router, routeTree);
    router.start("/");
    router.useMiddleware(dataloaderMiddleware);
    expect(loaders.length).toBe(0);
});

test("dataloaderMiddleware", (done) => {
    router.navigate("users.view", () => {
        expect(loaders.length).toBe(2);
        expect(loaders[0]).toBe("view loaded");
        expect(loaders[1]).toBe("view postloaded");

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

test("dataloaderMiddlewareRedirect wait", (done) => {
    router.navigate("users.viewerr", () => {
        expect(loaders.length).toBe(2);
        expect(loaders[0]).toBe("viewerr err loaded");
        expect(loaders[1]).toBe("login postloaded");

        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(loaders.length).toBe(3);
            expect(loaders[0]).toBe("viewerr err loaded");
            expect(loaders[1]).toBe("login postloaded");
            expect(loaders[2]).toBe("viewerr preloaded");
            done();
        }, 80);
    });
});

test("global loaders with merge", (done) => {
    routeTree.addDataLoaders(
        new DataLoader(() => loader("global")),
    );
    routeTree.getRouteView("login").mergeDataLoaders().addDataLoaders(new DataLoader(() => postloader("login again")));

    router.navigate("login", () => {
        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(loaders.length).toBe(3);
            expect(loaders[0]).toBe("login postloaded");
            expect(loaders[1]).toBe("global loaded");
            expect(loaders[2]).toBe("login again postloaded");
            done();
        }, 50);
    });

    expect(() => {
        routeTree.getRouteView("login").mergeDataLoaders();
    }).toThrow();
});

test("global loaders carried data", (done) => {
    let data = "";
    routeTree.addDataLoaders(
        new DataLoader(() => "d1"),
        new DataLoader(({ carriedData }) => Promise.resolve(carriedData + "d2")),
        new DataLoader(({ carriedData }) => data = carriedData),
    );

    routeTree.getRouteView("login").mergeDataLoaders();

    router.navigate("login", () => {
        setTimeout(() => {
            expect(router.getState().name).toBe("login");
            expect(data).toBe("d1d2");
            done();
        }, 50);
    });
});

test("payload", (done) => {
    routeTree.setPayload("loginRequired", false);
    router.navigate("admin", () => {
        setTimeout(() => {
            expect(router.getState().name).toBe("admin");
            expect(loaders.length).toBe(2);
            expect(loaders[0]).toBe(false);
            expect(loaders[1]).toBe(true);
            done();
        }, 50);
    });
});
