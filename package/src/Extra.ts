import DataLoader from "./DataLoader";


/**
 * @class
 */
export default class Extra {
    /**
     * payload data.
     * @member {object}
     * @private
     */
    private payload: { [key: string]: any } = {};

    /**
     * hold data loaders.
     * @member
     */
    dataLoaders: DataLoader[] = [];


    /**
     * set payload.
     * @param {(string | { [key: string]: any })} name - name of the payload of Object to set.
     * @param {*} [data] - the data of the payload if 'name' param is string.
     */
    setPayload(name: string | { [key: string]: any }, data?: any) {
        if (!name) {
            throw new Error("'name' param is required.");
        }
        if (typeof name === "string") {
            this.payload[name] = data;
        }
        else if (name.constructor === Object) {
            Object.assign(this.payload, name);
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
            return this.payload[name];
        }
        return this.payload;
    }
}
