export declare type RouteLoader = Function;

export declare type RouteExtra = { [key: string]: any };


export default class RoutePayload {
    /**
     * called when route transition starts.
     * route transition and other lifecycle methods will not wait for it to finish if the function returns a Promise.
     */
    private preloader: RouteLoader = null;

    /**
     * called after preloader.
     * route transition will wait for it to finish.
     */
    private loader: RouteLoader = null;

    /**
     * called after route transition is done.
     */
    private postloader: RouteLoader = null;

    /**
     * extra payload.
     */
    private extra: RouteExtra = {};

    // preloader
    setPreloader(preloader: RouteLoader) {
        if (typeof preloader !== "function") {
            throw new Error("preloader must be an function");
        }
        this.preloader = preloader;
        return this;
    }

    getPreloader() {
        return this.preloader;
    }

    // loader
    setLoader(loader: RouteLoader) {
        if (typeof loader !== "function") {
            throw new Error("loader must be an function");
        }
        this.loader = loader;
        return this;
    }

    getLoader() {
        return this.loader;
    }

    // postloader
    setPostloader(postloader: RouteLoader) {
        if (typeof postloader !== "function") {
            throw new Error("postloader must be an function");
        }
        this.postloader = postloader;
        return this;
    }

    getPostloader() {
        return this.postloader;
    }

    // extra
    setExtra(name: string | object, data?: any) {
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

    getExtra(name?: string) {
        if (name) {
            return this.extra[name];
        }
        return this.extra;
    }
}
