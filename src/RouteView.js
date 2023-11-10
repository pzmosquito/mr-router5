export default class RouteView {
    /**
     * the router5 route object.
     * @private
     */
    #route = null;

    /**
     * the component to render.
     */
    component = null;

    /**
     * the props for the component.
     */
    props = null;

    #extra = new Map();
    #dataLoader = new Map();

    /**
     * create a route view.
     * @param route - router5 route object.
     * @param component - the React component to render.
     * @param props - the props of the React component.
     */
    constructor(route, component, props = {}) {
        this.#route = route;
        this.component = component;
        this.props = props;

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
     * helper function to set extra for chaining purpose.
     * @param key - key of the extra.
     * @param value - value of the extra.
     */
    setExtra(key, value) {
        this.#extra.set(key, value);
        return this;
    }

    /**
     * retrieve extra data with optional default value.
     * @param key - key of the extra.
     * @param defaultValue - default value.
     */
    getExtra(key, defaultValue) {
        return this.#extra.get(key) ?? defaultValue;
    }

    /**
     * helper function to set dataLoader for chaining purpose.
     * @param key - key of the dataLoader.
     * @param value - value of the dataLoader.
     */
    setDataLoader(key, value) {
        this.#dataLoader.set(key, value);
        return this;
    }

    /**
     * retrieve dataLoader data with optional default value.
     * @param key - key of the dataLoader.
     * @param defaultValue - default value.
     */
    getDataLoader(key, defaultValue) {
        return this.#dataLoader.get(key) ?? defaultValue;
    }
}
