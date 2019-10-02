/**
 * @class
 */
export default class DataLoader {
    private _loader: Function = null;

    private _wait: boolean = true;

    constructor(loader: Function, wait = true) {
        this._loader = loader;
        this._wait = wait;
    }

    get loader() {
        return this._loader;
    }

    get wait() {
        return this._wait;
    }
}
