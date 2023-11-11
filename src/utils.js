import { makeObservable, action, observable } from "mobx";

export default class Updatable {
    updatable = new Map();

    constructor() {
        makeObservable(this, {
            data: observable.shallow,
            create: action.bound,
            set: action.bound,
        });
    }

    create(name, data) {
        this.updatable.set(name, data);
    }

    set(name, key, val) {
        const data = this.updatable.get(name);

        if (Object.prototype.toString.call(obj) === "[object Object]") {
            data[key] = val;
        }
        else if (data instanceof Map) {
            data.set(key, val);
        }
    }
}
