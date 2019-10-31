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
}
