import * as React from "react";
import {observer} from "mobx-react-lite";
import {routerStore} from "../../../../package/dist";
import userStore from "../../stores";


export default observer(() => {
    console.log("rendering UserView");

    const userList = () => {
        routerStore.router.navigate("users.list");
    };

    return (
        <div>
            <div style={{height: "150px"}}>
                {userStore.currentUser ? (
                    <div>
                        <h3>{userStore.currentUser.name || "Player Not Found"}</h3>
                        <p style={{height: "100px"}}>{userStore.currentUser.description}</p>
                    </div>
                ) : (
                    <h3>
                        Loading user...
                    </h3>
                )}
            </div>
            <hr />
            <button type="button" onClick={userList}>Go Back to List</button>
            <button type="button" onClick={userStore.getRandomUser}>View Random Player</button>
        </div>
    );
});
