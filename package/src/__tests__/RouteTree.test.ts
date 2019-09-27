import RouteTree from "../RouteTree";


const routeViews = [
    RouteTree.createRouteView({name: "r1", path: "/r1"}, null),
    RouteTree.createRouteView({name: "r2", path: "/r2"}, null),
];


test("getRouteView - constructor()", () => {
    const routeTree = new RouteTree(routeViews);

    expect(() => {
        routeTree.getRouteView("r3")
    }).toThrow();
    expect(routeTree.getRouteView("r1")).toBe(routeViews[0]);
    expect(routeTree.getRouteView("r2")).toBe(routeViews[1]);
});

test("getRouteView - add()", () => {
    const routeTree = new RouteTree();
    routeTree.add(...routeViews);

    expect(() => {
        routeTree.getRouteView("r3")
    }).toThrow();
    expect(routeTree.getRouteView("r1")).toBe(routeViews[0]);
    expect(routeTree.getRouteView("r2")).toBe(routeViews[1]);
});

test("getRoutes", () => {
    const routeTree = new RouteTree(routeViews);
    const routes = routeTree.getRoutes();

    expect(routes.length).toBe(2);
    expect(routes[0].name).toBe("r1");
    expect(routes[1].name).toBe("r2");
})

test("extends RoutePayload", () => {
    const routeTree = new RouteTree();

    expect(Object.keys(routeTree.getExtra()).length).toBe(0);
    expect(routeTree.getPreloader()).toBe(null);
})