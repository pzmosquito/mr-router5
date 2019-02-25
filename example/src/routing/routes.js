import Home from "../components/Home";
import PkgRouteNode from "../components/pkg/RouteNode";
import PkgReact from "../components/pkg/React";
import PkgMobx from "../components/pkg/MobX";


export default [
    {name: "home", path: "/", component: Home},
    {name: "pkg", path: "/pkg", component: PkgRouteNode, children: [
        {name: "react", path: "/react", component: PkgReact},
        {name: "mobx", path: "/mobx", component: PkgMobx}
    ]}
];
