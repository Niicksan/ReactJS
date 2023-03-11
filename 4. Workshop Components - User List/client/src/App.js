import { useState, useEffect } from 'react';

import { getAllUsers, createUser, updateUser, deleteUser } from './services/userService';

import './App.css';

import Header from './components/Header';
import Search from './components/Search';
import UserList from './components/table/UserList';
import Pagination from './components/Pagination';
import Footer from './components/Footer';

// import Loader from './components/Loader';

// import NoResultsFound from './errors/NoResultsFound';
// import FailedToFetch from './errors/FailedToFetch';
// import NoUsers from './errors/NoUsers';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then(setUsers)
            .catch(err => {
                console.log('Error' + err);
            });
    }, []);

    const onUserCreateSubmit = async (e) => {
        // stop automatic form submit
        e.preventDefault();

        // Take form data from DOM tree 
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        // Send ajax request to server
        const createdUser = await createUser(data);

        // If successful add new user to the state
        setUsers(state => [...state, createdUser]);
    }

    const onUserUpdateSubmit = async (e, userId) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const updatedUser = await updateUser(userId, data);

        setUsers(state => state.map(x => x._id === userId ? updatedUser : x));
    }

    const onUserDelete = async (user) => {
        // Delete from server
        await deleteUser(user._id);

        // Delete from state
        setUsers(state => state.filter(x => x._id !== user._id));
    };

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList
                        users={users}
                        onUserCreateSubmit={onUserCreateSubmit}
                        onUserUpdateSubmit={onUserUpdateSubmit}
                        onUserDelete={onUserDelete}
                    />

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>
    );
}

export default App;
