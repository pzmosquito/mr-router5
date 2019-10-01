import { RouteTree, RouteView } from "../../../package/dist";
import Home from "../components/home/Home";
import UserNode from "../components/route-nodes/UserNode";
import UserList from "../components/users/UserList";
import UserView from "../components/users/UserView";

import userStore from "../stores";


export default new RouteTree([
    new RouteView({name: "home", path: "/"}, Home),
    new RouteView({name: "users", path: "/users"}, UserNode),
    new RouteView({name: "users.list", path: "/list"}, UserList).setLoader(userStore.getUsers),
    new RouteView({name: "users.view", path: "/view/:id<\\d+>"}, UserView).setPreloader(userStore.getUser),
]);
