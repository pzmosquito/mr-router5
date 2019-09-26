import { RouteTree } from "../../../package/dist";
import Home from "../components/home/Home";
import UserNode from "../components/route-nodes/UserNode";
import UserList from "../components/users/UserList";
import UserView from "../components/users/UserView";

import userStore from "../stores";


export default new RouteTree([
    RouteTree.createRouteView({name: "home", path: "/"}, Home),
    RouteTree.createRouteView({name: "users", path: "/users"}, UserNode),
    RouteTree.createRouteView({name: "users.list", path: "/list"}, UserList).setLoader(userStore.getUsers),
    RouteTree.createRouteView({name: "users.view", path: "/view/:id<\\d+>"}, UserView).setPreloader(userStore.getUser),
]);
