import { Modal, Button, Form } from 'react-bootstrap';

import { useForm } from '../hooks/useForm';

export const AddTodoModal = ({
    show,
    onTodoAddSubmit,
    onTodoClose,
}) => {
    const { formValues, onChangeHandler, onSubmit } = useForm({ title: '' }, onTodoAddSubmit);

    return (
        <Modal show={show} onEscapeKeyDown={onTodoClose} onHide={onTodoClose}>
            <Modal.Header closeButton onHide={onTodoClose}>
                <Modal.Title>Add Todo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Todo</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Do the dishes" value={formValues.name} onChange={onChangeHandler} />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
                        Add
                    </Button>

                    <Button variant="secondary" onClick={onTodoClose}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};