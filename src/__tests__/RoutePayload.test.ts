import RoutePayload from "../RoutePayload";


let payload: RoutePayload = null;

beforeEach(() => {
    payload = new RoutePayload();
});

afterEach(() => {
    payload = null;
});

test("set data", () => {
    const { setExtra, setDataLoader } = payload;

    expect(setExtra("t1", "v1")).toBe(payload);
    expect(payload.extra.get("t1")).toBe("v1");

    expect(setDataLoader("t1", "v1")).toBe(payload);
    expect(payload.dataLoader.get("t1")).toBe("v1");
});

test("get data", () => {
    const { extra, dataLoader, getExtra, getDataLoader } = payload;

    extra.set("t1", "v1");
    expect(extra.get("t1")).toBe("v1");
    expect(getExtra("t1")).toBe("v1");
    expect(getExtra("t2", "v2")).toBe("v2");
    expect(getExtra("t2")).toBe(undefined);

    dataLoader.set("t1", "v1");
    expect(dataLoader.get("t1")).toBe("v1");
    expect(getDataLoader("t1")).toBe("v1");
    expect(getDataLoader("t2", "v2")).toBe("v2");
    expect(getDataLoader("t2")).toBe(undefined);
});
