import React from "react";
import createRouter from "router5";
import { routerStore, connectRouter, RouteView, RouteTree } from "..";


test("routerStore.routeUpdated()", () => {
    const HomeComponent = () => React.createElement("<div>Home Element</div>");
    const LoginComponent = () => React.createElement("<div>Login Element</div>");
    const UserRouteNode = () => React.createElement("<RouteComponent />", { routeNodeName: "users" });
    const UserViewComponent = () => React.createElement("<div>User View Element</div>");

    const routeTree = new RouteTree([
        new RouteView({ name: "home", path: "/" }, HomeComponent),
        new RouteView({ name: "login", path: "/login" }, LoginComponent),
        new RouteView({ name: "users", path: "/users" }, UserRouteNode),
        new RouteView({ name: "users.view", path: "/view" }, UserViewComponent),
    ]);

    const router = createRouter(routeTree.getRoutes());
    connectRouter(router, routeTree);
    router.start("/");

    router.navigate("login", () => {
        expect(routerStore.route.name).toBe("login");
        expect(routerStore.routeNodePath.get("").getComponent()).toBe(LoginComponent);

        router.navigate("users.view", () => {
            expect(routerStore.route.name).toBe("users.view");
            expect(routerStore.routeNodePath.get("users").getComponent()).toBe(UserViewComponent);
        });
    });
});
