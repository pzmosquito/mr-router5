import RouteTree from "../RouteTree";
import RouteView from "../RouteView";
import createRouter from "router5";


const routeViews = [
    new RouteView({name: "r1", path: "/r1"}, null),
    new RouteView({name: "r2", path: "/r2"}, null),
];


test("getRouteView - constructor()", () => {
    const routeTree = new RouteTree(routeViews);

    expect(() => {
        routeTree.getRouteView("r3")
    }).toThrow();
    expect(routeTree.getRouteView("r1")).toBe(routeViews[0]);
    expect(routeTree.getRouteView("r2")).toBe(routeViews[1]);
});

test("getRouteView - addRouteViews()", () => {
    const router = createRouter();
    const routeTree = new RouteTree();
    routeTree.setRouter(router);
    routeTree.addRouteViews(routeViews);
    router.start("/r1");

    expect(() => {
        routeTree.getRouteView("r3");
    }).toThrow();
    expect(routeTree.getRouteView("r1")).toBe(routeViews[0]);
    expect(routeTree.getRouteView("r2")).toBe(routeViews[1]);
    expect(router.getState().path).toBe("/r1");
});

test("getRoutes", () => {
    const routeTree = new RouteTree(routeViews);
    const routes = routeTree.getRoutes();

    expect(routes.length).toBe(2);
    expect(routes[0].name).toBe("r1");
    expect(routes[1].name).toBe("r2");
});

// test("extends RoutePayload", () => {
//     const routeTree = new RouteTree();

//     expect(Object.keys(routeTree.getExtra()).length).toBe(0);
//     expect(routeTree.getPreloader()).toBe(null);
// })
