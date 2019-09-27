import RoutePayload from "../RoutePayload";


let routePayload: RoutePayload = null;

beforeEach(() => {
    routePayload = new RoutePayload();
});

afterEach(() => {
    routePayload = null;
});

test("preloader", () => {
    expect(() => {
        // @ts-ignore
        routePayload.setPreloader("test");
    }).toThrow();

    expect(routePayload.getPreloader()).toBe(null);
    routePayload.setPreloader(() => "test");
    expect(routePayload.getPreloader()()).toBe("test");
});

test("loader", () => {
    expect(() => {
        // @ts-ignore
        routePayload.setLoader("test");
    }).toThrow();

    expect(routePayload.getLoader()).toBe(null);
    routePayload.setLoader(() => "test");
    expect(routePayload.getLoader()()).toBe("test");
});

test("postloader", () => {
    expect(() => {
        // @ts-ignore
        routePayload.setPostloader("test");
    }).toThrow();

    expect(routePayload.getPostloader()).toBe(null);
    routePayload.setPostloader(() => "test");
    expect(routePayload.getPostloader()()).toBe("test");
});

test("extra", () => {
    expect(Object.keys(routePayload.getExtra()).length).toBe(0);
    expect(() => {
        // @ts-ignore
        routePayload.setExtra(123);
    }).toThrow();
    expect(() => {
        // @ts-ignore
        routePayload.setExtra();
    }).toThrow();

    routePayload.setExtra("k1", "v1");
    expect(Object.keys(routePayload.getExtra()).length).toBe(1);
    expect(routePayload.getExtra("k1")).toBe("v1");

    routePayload.setExtra({
        "k1": "v11",
        "k2": "v2",
        "k3": "v3",
    });
    expect(Object.keys(routePayload.getExtra()).length).toBe(3);
    expect(routePayload.getExtra("k1")).toBe("v11");
    expect(routePayload.getExtra("k2")).toBe("v2");
    expect(routePayload.getExtra("k3")).toBe("v3");
});
