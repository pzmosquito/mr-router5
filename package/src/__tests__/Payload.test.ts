import Payload from "../Payload";


let payload: Payload = null;

beforeEach(() => {
    payload = new Payload();
});

afterEach(() => {
    payload = null;
});

test("set payloadData successful", () => {
    expect(Object.keys(payload.getPayload()).length).toBe(0);
    payload.setPayload("t1", "v1");
    expect(Object.keys(payload.getPayload()).length).toBe(1);
    expect(payload.getPayload("t1")).toBe("v1");

    payload.setPayload({ t1: "v11", t2: "v2" });
    expect(Object.keys(payload.getPayload()).length).toBe(2);
    expect(payload.getPayload("t1")).toBe("v11");
    expect(payload.getPayload("t2")).toBe("v2");
});

test("set payloadData failed", () => {
    expect(() => {
        // @ts-ignore
        payload.setPayload();
    }).toThrow();

    expect(() => {
        // @ts-ignore
        payload.setPayload(123);
    }).toThrow();
});
