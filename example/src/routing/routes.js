import Home from "../components/home/Home";
import UserNode from "../components/route-nodes/UserNode";
import UserList from "../components/users/UserList";
import UserView from "../components/users/UserView";


export default [
    {name: "home", path: "/", component: Home},
    {name: "users", path: "/users", component: UserNode, children: [
        {name: "list", path: "/list", component: UserList},
        {name: "view", path: "/view/:id<\\d+>", component: UserView}
    ]}
];
