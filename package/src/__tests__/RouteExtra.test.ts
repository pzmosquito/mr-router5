import RouteExtra from "../RouteExtra";


let extra: RouteExtra = null;

beforeEach(() => {
    extra = new RouteExtra();
});

afterEach(() => {
    extra = null;
});

test("set extra successful", () => {
    expect(Object.keys(extra.getPayload()).length).toBe(0);
    extra.setPayload("t1", "v1");
    expect(Object.keys(extra.getPayload()).length).toBe(1);
    expect(extra.getPayload("t1")).toBe("v1");

    extra.setPayload({ t1: "v11", t2: "v2" });
    expect(Object.keys(extra.getPayload()).length).toBe(2);
    expect(extra.getPayload("t1")).toBe("v11");
    expect(extra.getPayload("t2")).toBe("v2");
});

test("set extra failed", () => {
    expect(() => {
        // @ts-ignore
        extra.setPayload();
    }).toThrow();

    expect(() => {
        // @ts-ignore
        extra.setPayload(123);
    }).toThrow();
});
