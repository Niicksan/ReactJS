import { useContext } from 'react';
import { ListGroup, Button } from 'react-bootstrap';

import { TodoContext } from '../contexts/TodoContext';

export const TodoItem = ({
    _id,
    title,
    isCompleted
}) => {
    const { onTodoClick, onTodoEditClick, onTodoDeleteClick } = useContext(TodoContext);

    return (
        <ListGroup.Item action style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div onClick={() => onTodoClick(_id)}>
                <p style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>{title}</p>
            </div>
            <div>
                <Button variant="dark" onClick={() => onTodoEditClick(_id)} style={{ 'marginRight': '10px' }}>Edit</Button>
                <Button variant="dark" onClick={() => onTodoDeleteClick(_id)}>X</Button>
            </div>
        </ListGroup.Item>
    );
};