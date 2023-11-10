import React from "react";
import createRouter from "router5";
import { routerStore, toRoutes } from "..";
import RouteView from "../RouteView";


test("routerStore.routeUpdated()", () => {
    const HomeComponent = () => React.createElement("<div>Home Element</div>");
    const UserRouteNode = () => React.createElement("<RouteComponent />", { routeNodeName: "users" });
    const UserViewComponent = () => React.createElement("<div>User View Element</div>");

    const routeViews = [
        new RouteView({ name: "home", path: "/" }, HomeComponent),
        new RouteView({ name: "users", path: "/users" }, UserRouteNode),
        new RouteView({ name: "users.view", path: "/view" }, UserViewComponent),
    ];

    const router = createRouter(toRoutes(routeViews));
    routerStore.init(router, routeViews);
    router.start("/");
});
