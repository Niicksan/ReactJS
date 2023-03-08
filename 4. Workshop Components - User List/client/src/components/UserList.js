import { useState } from "react";

import { getUserById } from '../services/userService';

import AddUser from "./user/AddUser";
import EditUser from "./user/EditUser";
import DeleteUser from "./user/DeleteUser";
import UserDetails from "./user/UserDetails";
import TableHead from "./TableHead";
import UserRow from "./UserRow";

const UserList = ({ users }) => {
    const [showAddUser, setShowAddUser] = useState(false);
    const [editSelectedUser, setEditSelectedUser] = useState(null);
    const [deleteSelectedUser, setDeleteSelectedUser] = useState(null);
    const [infoSelectedUser, setInfoSelectedUser] = useState(null);

    const onEditClick = async (userId) => {
        const user = await getUserById(userId);

        if (user) {
            setEditSelectedUser(user);
        }
    };

    const onDeleteClick = async (userId) => {
        const user = await getUserById(userId);

        if (user) {
            setDeleteSelectedUser(user);
        }
    };

    const onInfoClick = async (userId) => {
        const user = await getUserById(userId);

        if (user) {
            setInfoSelectedUser(user);
        }
    };

    const onAddUserClick = async () => {
        setShowAddUser(true);
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
            {showAddUser && <AddUser {...showAddUser} onClose={onClose} />}
            {editSelectedUser && <EditUser {...editSelectedUser} onClose={onClose} />}
            {deleteSelectedUser && <DeleteUser {...deleteSelectedUser} onClose={onClose} />}
            {infoSelectedUser && <UserDetails {...infoSelectedUser} onClose={onClose} />}

            <div className="table-wrapper">
                <table className="table">
                    <TableHead />
                    <tbody>
                        {users.map(user => <UserRow key={user._id} {...user} onInfoClick={onInfoClick} onDeleteClick={onDeleteClick} onEditClick={onEditClick} />)}
                    </tbody>
                </table>
            </div>

            <button className="btn-add btn" onClick={onAddUserClick}>Add new user</button>
        </>
    );
};

export default UserList;
