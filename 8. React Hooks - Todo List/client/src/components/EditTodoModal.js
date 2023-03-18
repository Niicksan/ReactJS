import { Modal, Button, Form } from 'react-bootstrap';

import { useForm } from '../hooks/useForm';

export const EditTodoModal = ({
    title,
    show,
    onTodoEditSubmit,
    onTodoClose,
}) => {
    const { formValues, onChangeHandler, onSubmit } = useForm({ text: '' }, onTodoEditSubmit);

    return (
        <Modal show={show} onEscapeKeyDown={onTodoClose} onHide={onTodoClose}>
            <Modal.Header closeButton onHide={onTodoClose}>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Todo</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Do the dishes" defaultValue={title} onChange={onChangeHandler} />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
                        Edit
                    </Button>

                    <Button variant="secondary" onClick={onTodoClose}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};