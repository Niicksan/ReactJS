const baseUrl = 'http://localhost:3030/jsonstore/todos';

const getAllTodos = async () => {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return Object.values(result);
}

const geTodoById = async (todoId) => {
    const response = await fetch(`${baseUrl}/${todoId}`);
    const result = await response.json();

    return result;
};

const createTodo = async (todoData) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ ...todoData, isCompleted: false })
    });

    const todo = await response.json();

    return todo;
};

const checkTodo = async (todoId, todo) => {
    const response = await fetch(`${baseUrl}/${todoId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            ...todo,
            isCompleted: !todo.isCompleted
        })
    });

    const result = await response.json();

    return result;
};

const editTodo = async (todoData, formData) => {
    todoData.title = formData.title;

    const response = await fetch(`${baseUrl}/${todoData._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(todoData)
    });

    const result = await response.json();

    return result;
};

const deleteTodo = async (todoId) => {
    const response = await fetch(`${baseUrl}/${todoId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    });

    const result = await response.json();

    return result;
};

export {
    getAllTodos,
    geTodoById,
    createTodo,
    checkTodo,
    editTodo,
    deleteTodo
}