import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { routerStore, RouteNodeComponent, makeMiddleware } from "..";
import RouteView from "../RouteView";


const HomeComponent = () => React.createElement("div", null, "Home Element");
const UserRouteNode = () => React.createElement(RouteNodeComponent, { routeNodeName: "users" });
const UserViewComponent = ({ userId }) => React.createElement("div", null, `User ${userId} View Element`);

const routeViews = [
    new RouteView({ name: "home", path: "/home" }, HomeComponent)
        .setExtra("data", "test data")
        .setDataLoader("loader", "test loader"),
    new RouteView({ name: "users", path: "/users" }, UserRouteNode),
    new RouteView({ name: "users.view", path: "/view" }, UserViewComponent, { userId: 0 })
];

let router = null;

beforeEach(() => {
    router = routerStore.createRouter(routeViews, {});
});

afterEach(() => {
    router = null;
});


test("connectRouter", () => {
    expect(routerStore.router).toBe(router);
});

test("routeNodePath should populate root route node as expected", () => {
    router.start("/");
    router.navigate("home", () => {
        waitFor(() => {
            render(React.createElement(RouteNodeComponent, { routeNodeName: "" }));
        });
        expect(routerStore.route.name).toBe("home");
        expect(routerStore.previousRoute).toBe(null);
        expect(routerStore.routeNodePath.size).toBe(1);
        expect(routerStore.routeNodePath.get("").component).toBe(HomeComponent);
        expect(screen.getByText("Home Element")).toBeInTheDocument();
    });
});

test("routeNodePath should populate nested route node as expected", () => {
    router.start("/");
    router.navigate("home");
    router.navigate("users.view", () => {
        waitFor(() => {
            render(React.createElement(RouteNodeComponent, { routeNodeName: "" }));
        });
        expect(routerStore.route.name).toBe("users.view");
        expect(routerStore.previousRoute.name).toBe("home");
        expect(routerStore.routeNodePath.size).toBe(2);
        expect(routerStore.routeNodePath.get("").component).toBe(UserRouteNode);
        expect(routerStore.routeNodePath.get("users").component).toBe(UserViewComponent);
        expect(screen.getByText("User 0 View Element")).toBeInTheDocument();
    });
});

test("makeMiddleware wrapper works as expected", () => {
    const middleware = ({
        router,
        toState,
        fromState,
        done,
        getDataLoader,
        getExtra,
    }) => {
        expect(router).toBe(router);
        expect(toState.name).toBe("home");
        expect(fromState).toBe(null);
        expect(typeof done).toBe("function");
        expect(getExtra("data")).toBe("test data");
        expect(getDataLoader("loader")).toBe("test loader");
    };

    router.useMiddleware(makeMiddleware(middleware));
    router.start("/");
    router.navigate("home");
});
