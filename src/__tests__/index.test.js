import React from "react";
import { render, screen } from "@testing-library/react";
import createRouter from "router5";
import { routerStore, RouteComponent, toRoutes } from "..";
import RouteView from "../RouteView";


const HomeComponent = () => React.createElement("div", null, "Home Element");
const LoginComponent = () => React.createElement("div", null, "Login Element");
const UserRouteNode = () => React.createElement(RouteComponent, { routeNodeName: "users" });
const UserViewComponent = () => React.createElement("div", null, "User View Element");

const routeViews = [
    new RouteView({ name: "home", path: "/" }, HomeComponent),
    new RouteView({ name: "login", path: "/login" }, LoginComponent),
    new RouteView({ name: "users", path: "/users" }, UserRouteNode),
    new RouteView({ name: "users.view", path: "/view" }, UserViewComponent, { userId: 0 }),
];

let router = null;

beforeEach(() => {
    router = createRouter(toRoutes(routeViews));
    routerStore.init(router, routeViews);
});

afterEach(() => {
    router = null;
});


test("connectRouter", () => {
    expect(routerStore.router).toBe(router);
});

test("RouteComponent", () => {
    router.start("/");

    let elem;
    let wrapper;


    router.navigate("login", () => {
        render(React.createElement(RouteComponent, { routeNodeName: "" }));
        expect(screen.getByText("Login Element")).toBeInTheDocument();

        // router.navigate("users.view", () => {
        //     render(React.createElement(RouteComponent, { routeNodeName: "" }));
        //     render(React.createElement(RouteComponent, { routeNodeName: "users" }));
        //     expect(screen.getByText("User View Element")).toBeInTheDocument();
        // });



        // elem = React.createElement(RouteComponent, { routeNodeName: "" });
        // wrapper = shallow(elem);
        // expect(wrapper.equals(React.createElement(LoginComponent))).toBe(true);

        // router.navigate("users.view", () => {
        //     elem = React.createElement(RouteComponent, { routeNodeName: "" });
        //     wrapper = shallow(elem);
        //     expect(wrapper.equals(React.createElement(UserRouteNode))).toBe(true);

        //     elem = React.createElement(RouteComponent, { routeNodeName: "users" });
        //     wrapper = shallow(elem);
        //     expect(wrapper.equals(React.createElement(UserViewComponent, { userId: 0 }))).toBe(true);
        // });
    });
});
