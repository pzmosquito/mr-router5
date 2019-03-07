import * as React from "react";
import {routerStore} from "../../../../package/dist";
import {users} from "./UserList";


export default () => {
    console.log("rendering UserView");

    const userList = () => {
        routerStore.router.navigate("users.list");
    };

    const nextUser = () => {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        routerStore.router.navigate("users.view.detail", {id: users[randomUserIndex].id});
    };

    const user = users.find(user => user.id === parseInt(routerStore.route.params.id));

    return (
        <div>
            <h3>{user ? user.name : "User Not Found"}</h3>
            <p>
                John Doe" (for males) and "Jane Doe" (for females) are multiple-use names
                that are used when the true name of a person is unknown or is being intentionally
                concealed. In the context of law enforcement in the United States, such
                names are often used to refer to a corpse whose identity is unknown or unconfirmed.
                Secondly, such names are also often used to refer to a hypothetical "everyman"
                in other contexts, in a manner similar to "John Q. Public" or "Joe Public".
                There are many variants to the above names, including "John Roe",
                "Richard Roe", "Jane Roe" and "Baby Doe", "Janie Doe" or "Johnny Doe" (for children).
            </p>
            <hr />
            <button type="button" onClick={userList}>Go Back to List</button>
            <button type="button" onClick={nextUser}>View Random User</button>
        </div>
    );
};
