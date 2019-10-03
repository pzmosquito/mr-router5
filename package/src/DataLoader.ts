import { State, Router } from "router5";
import RouteTree from "./RouteTree";


type Loader = (arg0: {
    toState: State,
    fromState: State,
    routeTree: RouteTree,
    router: Router,
    carriedData: any,
}) => any;

/**
 * @private
 */
export class MergeDataLoaderTag {}


export default class DataLoader {
    /**
     * @private
     */
    private _loader: Loader = null;

    /**
     * @private
     */
    private _wait: boolean = null;

    /**
     * create a data loader.
     * @param loader - the loader function to call within dataloader-middleware.
     * @param wait - whether dataloader-middleware should wait for the loader to settle.
     */
    constructor(loader: Loader, wait = true) {
        this._loader = loader;
        this._wait = !!wait;
    }

    /**
     * retrieve the loader function.
     */
    get loader() {
        return this._loader;
    }

    /**
     * retrieve the wait flag.
     */
    get wait() {
        return this._wait;
    }
}
