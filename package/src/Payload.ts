/**
 * @class
 */
export default class Payload {
    /**
     * payload data.
     * @member {RouteExtra}
     * @private
     */
    private payloadData: { [key: string]: any } = {};


    /**
     * set payload.
     * @param {(string | Object)} name - name of the payload of Object to set.
     * @param {*} [data] - the data of the payload if 'name' param is string.
     */
    setPayload(name: string | Object, data?: any) {
        if (!name) {
            throw new Error("'name' param is required.");
        }
        if (typeof name === "string") {
            this.payloadData[name] = data;
        }
        else if (name.constructor === Object) {
            Object.assign(this.payloadData, name);
        }
        else {
            throw new Error("invalid payload format.");
        }
        return this;
    }

    /**
     * retrieve payload by name or all payload if name is not provided.
     * @param {string} [name] - name of the payload.
     * @return {*} data of the payload.
     */
    getPayload(name?: string) {
        if (name) {
            return this.payloadData[name];
        }
        return this.payloadData;
    }
}
