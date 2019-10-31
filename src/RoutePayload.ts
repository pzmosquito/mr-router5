/**
 * @private
 */
export default class RoutePayload {
    /**
     * hold extra data.
     * @private
     */
    private _extra = new Map();

    /**
     * hold data loaders.
     * @private
     */
    private _dataLoader = new Map();


    /**
     * getter of extra data.
     */
    get extra() {
        return this._extra;
    }

    /**
     * getter of data loader.
     */
    get dataLoader() {
        return this._dataLoader;
    }

    /**
     * retrieve value of the data with default value.
     * @param data - which data to use.
     * @param key - key of the data.
     * @param defaultValue - default value.
     * @return value of the key, or default value if key doesn't exist.
     */
    private get(data: any, key: any, defaultValue: any) {
        if (data.has(key)) {
            return data.get(key);
        }
        return defaultValue;
    }

    /**
     * retrieve extra data with optional default value.
     * @param key - key of the extra.
     * @param defaultValue - default value.
     */
    getExtra(key: any, defaultValue?: any) {
        return this.get(this._extra, key, defaultValue);
    }

    /**
     * retrieve dataLoader data with optional default value.
     * @param key - key of the dataLoader.
     * @param defaultValue - default value.
     */
    getDataLoader(key: any, defaultValue?: any) {
        return this.get(this._dataLoader, key, defaultValue);
    }
}
