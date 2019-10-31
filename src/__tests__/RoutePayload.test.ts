import RoutePayload from "../RoutePayload";


let payload: RoutePayload = null;

beforeEach(() => {
    payload = new RoutePayload();
});

afterEach(() => {
    payload = null;
});

test("extra data", () => {
    expect(payload.extra instanceof Map);
});

test("dataLoader data", () => {
    expect(payload.dataLoader instanceof Map);
});
