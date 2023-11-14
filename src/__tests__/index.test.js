import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { routerStore, RouteNodeComponent, makeMiddleware } from "..";
import RouteView from "../RouteView";


const HomeComponent = () => React.createElement("div", null, "Home Element");
const UserRouteNode = () => React.createElement(RouteNodeComponent, { routeNodeName: "users" });
const UserViewComponent = () => React.createElement("div", null, "User View Element");

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

test("RouteNodeComponent renders components based on route changes", () => {
    router.start("/");
    router.navigate("home", () => {
        render(React.createElement(RouteNodeComponent, { routeNodeName: "" }));
        waitFor(() => {
            expect(screen.getByText("Home Element")).toBeInTheDocument();
        });

        router.navigate("users.view", () => {
            render(React.createElement(RouteNodeComponent, { routeNodeName: "users" }));
            waitFor(() => {
                expect(screen.getByText("User View Element")).toBeInTheDocument();
            });
        });
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
