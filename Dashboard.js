import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProjectForm from './ProjectForm';
import Table from 'react-bootstrap/Table';
import data from './mock-data.json'
import UpdateForm from './UpdateForm';


function Dashboard({ projects }) {
    const [entries, setEntries] = useState(data);
    const [show, setShow] = useState(false);
    const [complete, setComplete] = useState(false);

    const [Object, setObject] = useState('');
    const [update, setUpdate] = useState(false);
    const [projectId, setprojectID] = useState(null);

    const childToParent = (childdata) => {
        setObject(childdata);
        const newEntries = { ...entries, Object }
        setEntries(newEntries)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleIsUpdate = () => {
        setUpdate(true)
    };
    const handleCloseUpdate = () => setUpdate(false);
    const isFinished = (isComplete) => setComplete(isComplete);

    return (
        <>
            <Card>
                <Card.Header className="text-center bg-primary text-white">
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-md-11'>
                                FRAMEWORKS
                            </div>
                            <div className='col-md-1'>
                                <Button variant="info" onClick={handleShow}>
                                    ADD
                                </Button>
                                {{ show } && <ProjectForm show={show} close={handleClose}
                                    childToParent={childToParent} entries={entries}
                                    onEntryChange={setEntries} />}
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className='app-container'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Deadline</th>
                                    <th>Priority</th>
                                    <th>Is Complete</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.map((entry) => (
                                    <tr>
                                        <th>{entry.projectTitle}</th>
                                        <th>{entry.projectDescription}</th>
                                        <th>{entry.projectDeadline}</th>
                                        <th>
                                            <input type="checkbox" />
                                        </th>
                                        <th>{entry.priority}</th>
                                        <th>
                                            <Button variant="primary" onClick={handleIsUpdate}> UPDATE</Button>
                                            <Button variant="danger">DELETE</Button>
                                        </th>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default Dashboard;