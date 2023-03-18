import { useState, useEffect } from 'react';

import { getAllTodos, geTodoById, createTodo, checkTodo, editTodo, deleteTodo } from './services/todoService';
import { TodoContext } from './contexts/TodoContext';

import { Header } from "./components/Header"
import { TodoList } from "./components/TodoList";
import { EditTodoModal } from "./components/EditTodoModal";
import { AddTodoModal } from "./components/AddTodoModal";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [showEditTodo, setShowEditTodo] = useState(false);
    const [selectEditTodo, setSelectEditTodo] = useState(null);

    useEffect(() => {
        getAllTodos()
            .then((results) => {
                if (results.status === 204) {
                    setTodos([])
                }
                else {
                    setTodos(results);
                }
            })
            .catch(err => {
                console.log('Error: ' + err);
            });
    }, []);

    const onTodoAddSubmit = async (values) => {
        const todo = await createTodo(values);

        if (todo) {
            setShowAddTodo(false);
            setTodos(state => [...state, todo])
        }
    };

    const onTodoEditSubmit = async (values) => {
        const todo = await editTodo(selectEditTodo, values);

        if (todo !== undefined) {
            setShowEditTodo(false);
            setTodos(state => state.map(x => x._id === selectEditTodo._id ? selectEditTodo : x));
            setSelectEditTodo(null);
        }
    };

    const onTodoAddClick = () => {
        setShowAddTodo(true);
    };

    const onTodoEditClick = (todoId) => {
        const todo = todos.find(x => x._id === todoId);
        setSelectEditTodo(todo);

        setShowEditTodo(true)
    };

    const onTodoClose = () => {
        setShowAddTodo(false);
        setShowEditTodo(false);
    };


    const onTodoClick = async (todoId) => {
        const todo = todos.find(x => x._id === todoId);

        const checkedToto = await checkTodo(todoId, todo);

        if (checkedToto) {
            setTodos(state => state.map(x => x._id === todoId ? checkedToto : x));
        }
    };

    const onTodoDeleteClick = async (todoId) => {
        const checkedToto = await deleteTodo(todoId);

        if (checkedToto) {
            setTodos(state => state.filter(x => x._id !== todoId));
        }
    };

    const contextValue = {
        onTodoClick,
        onTodoEditClick,
        onTodoDeleteClick
    };

    return (
        <TodoContext.Provider value={contextValue}>
            <Header />

            <TodoList
                todos={todos}
                onTodoAddClick={onTodoAddClick}
            />

            <EditTodoModal show={showEditTodo} {...selectEditTodo} onTodoEditSubmit={onTodoEditSubmit} onTodoClose={onTodoClose} />
            <AddTodoModal show={showAddTodo} onTodoAddSubmit={onTodoAddSubmit} onTodoClose={onTodoClose} />
        </TodoContext.Provider>
    );
}

export default App;
