import Home from "./components/Home";
import PkgRouteNode from "./components/PkgRouteNode";
import PkgReact from "./components/PkgReact";
import PkgMobx from "./components/PkgMobx";


export default [
    {name: "home", path: "/", component: Home},
    {name: "pkg", path: "/pkg", component: PkgRouteNode, children: [
        {name: "react", path: "/react", component: PkgReact},
        {name: "mobx", path: "/mobx", component: PkgMobx}
    ]}
];