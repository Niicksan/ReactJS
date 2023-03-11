import { useState } from "react";

import { getUserById } from '../../services/userService';

import AddUser from "../user/AddUser";
import EditUser from "../user/EditUser";
import DeleteUser from "../user/DeleteUser";
import UserDetails from "../user/UserDetails";
import TableHead from "./TableHead";
import UserRow from "./UserRow";

const UserList = ({
    users,
    onUserCreateSubmit,
    onUserDelete,
    onUserUpdateSubmit,
}) => {
    const [showAddUser, setShowAddUser] = useState(false);
    const [editSelectedUser, setEditSelectedUser] = useState(null);
    const [deleteSelectedUser, setDeleteSelectedUser] = useState(null);
    const [infoSelectedUser, setInfoSelectedUser] = useState(null);

    // Create
    const onAddUserClick = () => {
        setShowAddUser(true);
    };

    const onUserCreateSubmitHandler = (e) => {
        onUserCreateSubmit(e);
        setShowAddUser(false);
    };

    // Edit
    const onEditClick = async (userId) => {
        const user = await getUserById(userId);

        if (user) {
            setEditSelectedUser(user);
        }
    };

    const onUserUpdateSubmitHandler = (e, userId) => {
        onUserUpdateSubmit(e, userId);
        setEditSelectedUser(null);
        onClose();
    };

    // Delete
    const onDeleteClick = async (userId) => {
        const user = await getUserById(userId);

        if (user) {
            setDeleteSelectedUser(user);
        }
    };

    const onDeleteHandler = () => {
        onUserDelete(deleteSelectedUser);
        onClose();
    };

    // Info
    const onInfoClick = async (userId) => {
        const user = await getUserById(userId);

        if (user) {
            setInfoSelectedUser(user);
        }
    };

    const onClose = () => {
        if (editSelectedUser) {
            setEditSelectedUser(null);
        } else if (deleteSelectedUser) {
            setDeleteSelectedUser(null);
        } else if (infoSelectedUser) {
            setInfoSelectedUser(null);
        } else if (showAddUser) {
            setShowAddUser(false);
        }
    }

    return (
        <>
            {showAddUser && <AddUser onClose={onClose} onUserCreateSubmit={onUserCreateSubmitHandler} />}
            {editSelectedUser && <EditUser {...editSelectedUser} onClose={onClose} onUserUpdateSubmit={onUserUpdateSubmitHandler} />}
            {deleteSelectedUser && <DeleteUser onClose={onClose} onDelete={onDeleteHandler} />}
            {infoSelectedUser && <UserDetails {...infoSelectedUser} onClose={onClose} />}

            <div className="table-wrapper">
                <table className="table">
                    <TableHead />
                    <tbody>
                        {users.map(user =>
                            <UserRow
                                key={user._id}
                                {...user}
                                onInfoClick={onInfoClick}
                                onDeleteClick={onDeleteClick}
                                onEditClick={onEditClick} />
                        )}
                    </tbody>
                </table>
            </div>

            <button className="btn-add btn" onClick={onAddUserClick}>Add new user</button>
        </>
    );
};

export default UserList;
