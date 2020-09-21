/**
 * @private
 */
export default class RoutePayload {
    constructor() {
        this.setExtra = this.setExtra.bind(this);
        this.setDataLoader = this.setDataLoader.bind(this);
        this.getExtra = this.getExtra.bind(this);
        this.getDataLoader = this.getDataLoader.bind(this);
    }

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
     * helper function to set extra for chaining purpose.
     * @param key - key of the extra.
     * @param value - value of the extra.
     */
    setExtra(key: any, value: any) {
        this._extra.set(key, value);
        return this;
    }

    /**
     * retrieve extra data with optional default value.
     * @param key - key of the extra.
     * @param defaultValue - default value.
     */
    getExtra(key: any, defaultValue?: any) {
        // return this.get(this._extra, key, defaultValue);
        return this._extra.has(key) ? this._extra.get(key) : defaultValue;
    }

    /**
     * helper function to set dataLoader for chaining purpose.
     * @param key - key of the dataLoader.
     * @param value - value of the dataLoader.
     */
    setDataLoader(key: any, value: any) {
        this._dataLoader.set(key, value);
        return this;
    }

    /**
     * retrieve dataLoader data with optional default value.
     * @param key - key of the dataLoader.
     * @param defaultValue - default value.
     */
    getDataLoader(key: any, defaultValue?: any) {
        // return this.get(this._dataLoader, key, defaultValue);
        return this._dataLoader.has(key) ? this._dataLoader.get(key) : defaultValue;
    }
}
