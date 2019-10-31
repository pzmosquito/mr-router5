import RoutePayload from "../RoutePayload";


let payload: RoutePayload = null;

beforeEach(() => {
    payload = new RoutePayload();
});

afterEach(() => {
    payload = null;
});

test("extra data", () => {
    const extra = payload.extra;

    extra.set("t1", "v1");
    expect(extra.get("t1")).toBe("v1");
    expect(payload.getExtra("t1")).toBe("v1");
    expect(payload.getExtra("t2", "v2")).toBe("v2");
    expect(payload.getExtra("t2")).toBe(undefined);
});

test("dataLoader data", () => {
    const dataLoader = payload.dataLoader;

    dataLoader.set("t1", "v1");
    expect(dataLoader.get("t1")).toBe("v1");
    expect(payload.getDataLoader("t1")).toBe("v1");
    expect(payload.getDataLoader("t2", "v2")).toBe("v2");
    expect(payload.getDataLoader("t2")).toBe(undefined);
});
