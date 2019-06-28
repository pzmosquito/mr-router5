import * as React from "react";
import {routerStore} from "../../../../package/dist";
import userStore from "../../stores";


export default () => {
    console.log("rendering UserList");

    return (
        <table border="1" cellPadding="3" cellSpacing="0" width="300">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {userStore.users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><a href="javascript:void(0)" onClick={() => routerStore.router.navigate("users.view", {id: user.id})}>{user.name}</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
 };
