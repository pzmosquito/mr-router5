export declare type RouteLoader = Function;

export declare type RouteExtra = { [key: string]: any };


/**
 * @class
 */
export default class RoutePayload {
    /**
     * called when route transition starts.
     * route transition and other lifecycle methods will not wait for it to finish if the function returns a Promise.
     * @member {RouteLoader}
     * @private
     */
    private preloader: RouteLoader = null;

    /**
     * called after preloader.
     * route transition will wait for it to finish.
     * @member {RouteLoader}
     * @private
     */
    private loader: RouteLoader = null;

    /**
     * called after route transition is done.
     * @member {RouteLoader}
     * @private
     */
    private postloader: RouteLoader = null;

    /**
     * extra payload.
     * @member {RouteExtra}
     * @private
     */
    private extra: RouteExtra = {};

    /**
     * set preloader.
     * @param {RouteLoader} loderFn - loader function to set.
     */
    setPreloader(loderFn: RouteLoader) {
        if (typeof loderFn !== "function") {
            throw new Error("preloader must be an function");
        }
        this.preloader = loderFn;
        return this;
    }

    /**
     * retrieve preloader.
     * @return {RouteLoader} the preloader function.
     */
    getPreloader() {
        return this.preloader;
    }

    /**
     * set loader.
     * @param {RouteLoader} loderFn - loader function to set.
     */
    setLoader(loderFn: RouteLoader) {
        if (typeof loderFn !== "function") {
            throw new Error("loader must be an function");
        }
        this.loader = loderFn;
        return this;
    }

    /**
     * retrieve loader.
     * @return {RouteLoader} the loader function.
     */
    getLoader() {
        return this.loader;
    }

    /**
     * set postloader.
     * @param {RouteLoader} loderFn - loader function to set.
     */
    setPostloader(loderFn: RouteLoader) {
        if (typeof loderFn !== "function") {
            throw new Error("postloader must be an function");
        }
        this.postloader = loderFn;
        return this;
    }

    /**
     * retrieve postloader.
     * @return {RouteLoader} the postloader function.
     */
    getPostloader() {
        return this.postloader;
    }

    /**
     * set extra.
     * @param {(string | Object)} name - name of the extra of Object to set.
     * @param {*} [data] - the data of the extra if 'name' param is string.
     */
    setExtra(name: string | Object, data?: any) {
        if (!name) {
            throw new Error("'name' param is required.");
        }
        if (typeof name === "string") {
            this.extra[name] = data;
        }
        else if (name.constructor === Object) {
            Object.assign(this.extra, name);
        }
        else {
            throw new Error("invalid extra format");
        }
        return this;
    }

    /**
     * retrieve extra by name.
     * @param {string} name - name of the extra.
     * @return {*} data of the extra.
     */
    getExtra(name?: string) {
        if (name) {
            return this.extra[name];
        }
        return this.extra;
    }
}
