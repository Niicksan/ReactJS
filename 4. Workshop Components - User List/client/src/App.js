import { useState, useEffect } from 'react';

import { getAllUsers } from './services/userService';

import './App.css';

import Header from './components/Header';
import Search from './components/Search';
import UserList from './components/UserList';
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

    return (
        <>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />

                    <UserList users={users} />

                    <Pagination />
                </section>
            </main>

            <Footer />
        </>
    );
}

export default App;
