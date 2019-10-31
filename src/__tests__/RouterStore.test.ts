import React from "react";
import createRouter from "router5";
import { routerStore, initMrRouter5 } from "..";
import RouteTree from "../RouteTree";
import RouteView from "../RouteView";


test("routerStore.routeUpdated()", () => {
    const HomeComponent = () => React.createElement("<div>Home Element</div>");
    const UserRouteNode = () => React.createElement("<RouteComponent />", { routeNodeName: "users" });
    const UserViewComponent = () => React.createElement("<div>User View Element</div>");

    const routeTree = new RouteTree([
        new RouteView({ name: "home", path: "/" }, HomeComponent),
        new RouteView({ name: "users", path: "/users" }, UserRouteNode),
        new RouteView({ name: "users.view", path: "/view" }, UserViewComponent),
    ]);

    const router = createRouter(routeTree.getRoutes());
    initMrRouter5(router, routeTree);
    router.start("/");

    const { getRouteNode } = routerStore;

    router.navigate("users.view", () => {
        expect(routerStore.route.name).toBe("users.view");
        expect(getRouteNode("users").component).toBe(UserViewComponent);
    });
});
