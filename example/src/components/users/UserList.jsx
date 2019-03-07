import * as React from "react";
import {routerStore} from "../../../../package/dist";


const users = [
    {"id": 1, "name": "John Doe", "isActive": true},
    {"id": 2, "name": "Jane Doe", "isActive": true},
    {"id": 3, "name": "John Roe", "isActive": true},
    {"id": 4, "name": "Jane Roe", "isActive": false}
];

export {users};

export default () => {
    console.log("rendering UserList");

    return (
        <table border="1" cellPadding="3" cellSpacing="0" width="300">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td><a href="javascript:void(0)" onClick={() => routerStore.router.navigate("users.view.detail", {id: user.id})}>{user.name}</a></td>
                        <td>{user.isActive ? "Active" : "Inactive"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
 };
