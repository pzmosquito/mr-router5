import * as React from "react";
import {routerStore} from "../../../../package/dist";
import userStore from "../../stores";


export default () => {
    console.log("rendering UserView");

    const userList = () => {
        routerStore.router.navigate("users.list");
    };

    const nextUser = () => {
        const randomUserIndex = Math.floor(Math.random() * userStore.users.length);
        routerStore.router.navigate("users.view", {id: userStore.users[randomUserIndex].id});
    };

    const user = userStore.users.find(user => user.id === parseInt(routerStore.route.params.id));

    return (
        <div>
            <h3>{user ? user.name : "Player Not Found"}</h3>
            <p>{user ? user.description : ""}</p>
            <hr />
            <button type="button" onClick={userList}>Go Back to List</button>
            <button type="button" onClick={nextUser}>View Random Player</button>
        </div>
    );
};
