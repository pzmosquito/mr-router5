import React from "react";
import RouteView from "../RouteView";


test("create route view", () => {
    class TestComponent extends React.Component {
        render() {
            return "test";
        }
    }
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView(route, TestComponent);
    expect(rv.component).toBe(TestComponent);
    expect(rv.route).toBe(route);

    class AnotherComponent extends React.Component {
        render() {
            return "test";
        }
    }
    rv.component = AnotherComponent;
    expect(rv.component).toBe(AnotherComponent);
});
