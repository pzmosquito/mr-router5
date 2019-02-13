import {observer} from "mobx-react-lite";


const RouteNode = observer(({name, routerStore, children}) => {
    if (name === "" || routerStore.toState.name.split(".").pop().join(".") === name) {
        return children;
    }
    return null;
});

export {
    RouteNode
};
