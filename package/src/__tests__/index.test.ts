import React from "react";
import createRouter, { Router } from "router5";
import { shallow } from "enzyme";
import { initRouterStore, routerStore, RouteComponent } from "..";
import RouteTree from "../RouteTree";


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

let router: Router = null;

beforeEach(() => {
    router = createRouter(routeTree.getRoutes());
});

afterEach(() => {
    router = null;
});


test("connectRouter", () => {
    initRouterStore(router, routeTree);
    expect(routerStore.router).toBe(router);
    expect(routerStore.routeTree).toBe(routeTree);
});

test("RouteComponent", () => {
    initRouterStore(router, routeTree);
    router.start("/");

    let elem;
    let wrapper;

    router.navigate("login", () => {
        elem = React.createElement(RouteComponent, { routeNodeName: "" });
        wrapper = shallow(elem);
        expect(wrapper.equals(React.createElement(LoginComponent))).toBe(true);

        router.navigate("users.view", () => {
            elem = React.createElement(RouteComponent, { routeNodeName: "" });
            wrapper = shallow(elem);
            expect(wrapper.equals(React.createElement(UserRouteNode))).toBe(true);

            elem = React.createElement(RouteComponent, { routeNodeName: "users" });
            wrapper = shallow(elem);
            expect(wrapper.equals(React.createElement(UserViewComponent))).toBe(true);
        });
    });
});
