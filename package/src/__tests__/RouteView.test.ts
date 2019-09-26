import React from "react";
import RouteView from "../RouteView";


test("create route view", () => {
    class TestComponent extends React.Component {
        render() {
            return "test";
        }
    }
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView();
    rv.setRoute(route).setComponent(TestComponent);
    expect(rv.getComponent()).toBe(TestComponent);
    expect(rv.getRoute()).toBe(route);

    class AnotherComponent extends React.Component {
        render() {
            return "test";
        }
    }
    rv.setComponent(AnotherComponent);
    expect(rv.getComponent()).toBe(AnotherComponent);

    const anotherRoute = {name: "r2", path: "/r2"};
    rv.setRoute(anotherRoute);
    expect(rv.getRoute()).toBe(anotherRoute);
});
