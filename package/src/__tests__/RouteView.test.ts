import React from "react";
import { shallow } from "enzyme";
import RouteView from "../RouteView";


test("create route view", () => {
    const TestComponent = () => React.createElement("<div>Test Element</div>");
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView(route, TestComponent);
    expect(rv.component).toBe(TestComponent);
    expect(rv.route).toBe(route);

    const AnotherComponent = () => React.createElement("<div>Another Element</div>");
    rv.component = AnotherComponent;
    expect(rv.component).toBe(AnotherComponent);
});

test("create route view with props", () => {
    const TestComponent = ({ name }: { name: string }) => React.createElement(`<div>Test Element: ${name}</div>`);
    const route = {name: "r1", path: "/r1"};
    const rv = new RouteView(route, TestComponent, { name: "pzmosquito" });
    expect(rv.component).toBe(TestComponent);
    expect(rv.route).toBe(route);
    expect(rv.props.name).toBe("pzmosquito");

    const AnotherComponent = () => React.createElement("<div>Another Element</div>");
    rv.component = AnotherComponent;
    rv.props = { name: "router" };
    expect(rv.component).toBe(AnotherComponent);
    expect(rv.props.name).toBe("router");
});
