export default class RouteView {
    /**
     * the router5 route object.
     */
    #route = null;

    /**
     * the element to render.
     */
    #element = null;

    /**
     * extra data.
     */
    #extra = new Map();

    /**
     * data loader.
     */
    #dataLoader = new Map();

    /**
     * create a route view.
     * @param route - router5 route object.
     * @param element - the element to render.
     */
    constructor(route, element) {
        this.#route = route;
        this.#element = element;

        this.setExtra = this.setExtra.bind(this);
        this.setDataLoader = this.setDataLoader.bind(this);
        this.getExtra = this.getExtra.bind(this);
        this.getDataLoader = this.getDataLoader.bind(this);
    }

    /**
     * retrieve router5 route object.
     * @return the router5 route object.
     */
    get route() {
        return this.#route;
    }

    /**
     * retrieve element to render.
     * @return the element to render.
     */
    get element() {
        return this.#element;
    }

    /**
     * helper function to set extra for chaining purpose.
     * @param key - key of the extra.
     * @param value - value of the extra.
     * @return this.
     */
    setExtra(key, value) {
        this.#extra.set(key, value);
        return this;
    }

    /**
     * retrieve extra data with optional default value.
     * @param key - key of the extra.
     * @param defaultValue - default value.
     * @return extra data.
     */
    getExtra(key, defaultValue) {
        return this.#extra.get(key) ?? defaultValue;
    }

    /**
     * helper function to set dataLoader for chaining purpose.
     * @param key - key of the dataLoader.
     * @param value - value of the dataLoader.
     * @return this.
     */
    setDataLoader(key, value) {
        this.#dataLoader.set(key, value);
        return this;
    }

    /**
     * retrieve dataLoader data with optional default value.
     * @param key - key of the dataLoader.
     * @param defaultValue - default value.
     * @return dataLoader data.
     */
    getDataLoader(key, defaultValue) {
        return this.#dataLoader.get(key) ?? defaultValue;
    }
}
