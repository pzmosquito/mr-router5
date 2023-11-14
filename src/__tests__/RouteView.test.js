import React from "react";
import RouteView from "../RouteView";

const TestComponent = () => React.createElement("div", null, "Test Element");
const AnotherComponent = () => React.createElement("div", null, "Another Element");

test("create route view", () => {
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView(route, TestComponent);
    expect(rv.component).toBe(TestComponent);
    expect(rv.route).toBe(route);

    rv.component = AnotherComponent;
    expect(rv.component).toBe(AnotherComponent);
});

test("create route view with props", () => {
    const TestComponentWithProps = ({ name }) => React.createElement("div", null, `Test Element: ${name}`);
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView(route, TestComponentWithProps, { name: "pzmosquito" });
    expect(rv.component).toBe(TestComponentWithProps);
    expect(rv.route).toBe(route);
    expect(rv.props.name).toBe("pzmosquito");

    rv.component = AnotherComponent;
    rv.props = { name: "router" };
    expect(rv.component).toBe(AnotherComponent);
    expect(rv.props.name).toBe("router");
});

test("extra", () => {
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView(route, TestComponent).setExtra("t1", "v1");

    expect(rv.getExtra("t1")).toBe("v1");
    expect(rv.getExtra("t2", "v2")).toBe("v2");
    expect(rv.getExtra("t2")).toBe(undefined);
});

test("dataloader", () => {
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView(route, TestComponent).setDataLoader("t1", "v1");

    expect(rv.getDataLoader("t1")).toBe("v1");
    expect(rv.getDataLoader("t2", "v2")).toBe("v2");
    expect(rv.getDataLoader("t2")).toBe(undefined);
});
