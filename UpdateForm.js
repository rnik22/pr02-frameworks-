import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { nanoid } from 'nanoid'

export default function UpdateForm({ show, close, childToParent,
    entries, onEntryChange, isUpdate, entryid }) {

    const onChange = (props, value, id) => {
        const obj = entries.find(x => x.id === id);
        if (obj) {
            obj[props] = value;
        }
    }

    const [addFormData, setAddFormData] = useState({
        projectTitle: '',
        projectDescription: '',
        projectDeadline: '',
        isComplete: false,
        priority: ''
    })

    const handleAddFormChange = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData }
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData);
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else if (isUpdate) {
            const newEntries = onChange("projectTitle", "addFormData.projectTitle", entryid);
            onEntryChange(newEntries)
            close()
        }
        else {
            event.preventDefault();
            const newEntry = {
                id: nanoid(),
                projectTitle: addFormData.projectTitle,
                projectDescription: addFormData.projectDescription,
                projectDeadline: addFormData.projectDeadline,
                isComplete: false,
                priority: addFormData.priority
            }

            const newEntries = [...entries, newEntry]
            onEntryChange(newEntries)
            close()

        }
        setValidated(true);
    };
    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header className="bg-primary text-white">
                    <Modal.Title >Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} id="update-form" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formProjectTitle2">
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                name="projectTitle"
                                onChange={handleAddFormChange}
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please choose a project title.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="projectDescription2">
                            <Form.Control
                                type="text"
                                placeholder="Modal 2 Description"
                                name="projectDescription"
                                required
                                onChange={handleAddFormChange} />
                            <Form.Control.Feedback type="invalid">
                                Please write a project description.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="projectDeadline2">
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                name="projectDeadline"
                                onChange={handleAddFormChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox2">
                            <Form.Label>Priority</Form.Label>
                            <div key={`inline-radio-1`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Low"
                                    name="priority"
                                    type='radio'
                                    id={`inline-radio-1`}
                                    value='Low'
                                    onChange={handleAddFormChange}
                                />
                                <Form.Check
                                    inline
                                    label="Med"
                                    name="priority"
                                    type='radio'
                                    id={`inline-radio-2`}
                                    value='Med'
                                    onChange={handleAddFormChange}
                                />
                                <Form.Check
                                    inline
                                    label="High"
                                    name="priority"
                                    type='radio'
                                    id={`inline-radio-3`}
                                    value='High'
                                    onChange={handleAddFormChange}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button form="update-form" variant="primary" type="submit">
                        Add
                    </Button>
                    <Button variant="danger" onClick={close}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
