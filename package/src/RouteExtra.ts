import DataLoader, { MergeDataLoaderTag } from "./DataLoader";


/**
 * @class
 */
export default class RouteExtra {
    /**
     * payload data.
     * @member
     * @private
     */
    private payload: { [key: string]: any } = {};

    /**
     * hold data loaders.
     * @member
     * @private
     */
    private dataLoaders: (DataLoader | MergeDataLoaderTag)[] = [];


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

    /**
     * add data loaders.
     * @param {(DataLoader | MergeDataLoaderTag )[]} dataLoaders - data loaders to add.
     */
    addDataLoaders(...dataLoaders: (DataLoader | MergeDataLoaderTag )[]) {
        this.dataLoaders.push(...dataLoaders);
        return this;
    }

    /**
     * get all data loaders.
     */
    getDataLoaders() {
        return this.dataLoaders;
    }

    /**
     * create a mergeDataLoaderTag placeholder for merging global data loaders.
     * @return {MergeDataLoaderTag}
     */
    protected static createMergeDataLoaderTag() {
        return new MergeDataLoaderTag();
    }
}