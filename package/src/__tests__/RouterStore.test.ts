import React from "react";
import createRouter from "router5";
import { routerStore, initRouterStore } from "..";
import RouteTree from "../RouteTree";


test("routerStore.routeUpdated()", () => {
    const HomeComponent = () => React.createElement("<div>Home Element</div>");
    const LoginComponent = () => React.createElement("<div>Login Element</div>");
    const UserRouteNode = () => React.createElement("<RouteComponent />", { routeNodeName: "users" });
    const UserViewComponent = () => React.createElement("<div>User View Element</div>");

    const routeTree = new RouteTree([
        RouteTree.createRouteView({ name: "home", path: "/" }, HomeComponent),
        RouteTree.createRouteView({ name: "login", path: "/login" }, LoginComponent),
        RouteTree.createRouteView({ name: "users", path: "/users" }, UserRouteNode),
        RouteTree.createRouteView({ name: "users.view", path: "/view" }, UserViewComponent),
    ]);

    const router = createRouter(routeTree.getRoutes());
    initRouterStore(router, routeTree);
    router.start("/");

    router.navigate("login", () => {
        expect(routerStore.route.name).toBe("login");
        expect(routerStore.getRouteNodeComponent("")).toBe(LoginComponent);

        router.navigate("users.view", () => {
            expect(routerStore.route.name).toBe("users.view");
            expect(routerStore.getRouteNodeComponent("users")).toBe(UserViewComponent);
        });
    });
});
