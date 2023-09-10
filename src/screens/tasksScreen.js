import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, ListGroup, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from '@iconify/react';
import { Formik } from "formik";
import * as Yup from 'yup';
import '../dist/css/global.css'

import Task from "../components/task/task";
import Header from "../components/header/index.js";
import { useNavigate } from "react-router-dom";
import taskServices from "../services/tasksServices";

const TasksScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(rootReducer => rootReducer.userReducer);

    useEffect(() => {
        if (!user.currentUser) {
            navigate('/');
        }
    }, [user]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await taskServices.getTasks(user.currentUser);

                if (response === 429) {
                    dispatch({
                        type: 'SET_TASKS',
                        payload: { error: 429 }
                    });
                    setLoading(false);
                    return;
                }

                if (response && response.tasks.length > 0) {
                    dispatch({
                        type: 'SET_TASKS',
                        payload: { tasks: response.tasks }
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setLoading(false);
            }
        }
        getTasks();
    }, []);

    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [taskEditPayload, setTaskEditPayload] = useState({
        title: '',
        description: '',
        completed: '',
        id: ''
    });
    const [taskPayload, setTaskPayload] = useState({
        title: '',
        description: ''
    });

    const formik = {
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(5, "Title must be at least 5 characters long")
                .max(64, "Title must be at most 64 characters long")
                .required("Title is required"),
            description: Yup.string()
                .min(10, "Description must be at least 10 characters long")
                .max(110, "Description must be at most 110 characters long")
        }),
        onSubmit: values => {
            HandleAddTask(values);
        }
    }

    const formikEdit = {
        initialValues: {
            title: '',
            description: '',
            completed: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(5, "Title must be at least 5 characters long")
                .max(64, "Title must be at most 64 characters long")
                .required("Title is required"),
            description: Yup.string()
                .min(10, "Description must be at least 10 characters long")
                .max(110, "Description must be at most 110 characters long")
                .required("Description is required")
        }),
        onSubmit: values => {
            HandleEditTask(values);
        }
    }

    const HandleEditTask = async (values) => {
        const { title, description, completed } = values;
        const id = taskEditPayload.id;

        const response = await taskServices.updateTask({ title, description, completed }, id, user.currentUser);

        dispatch({
            type: 'UPDATE_TASK',
            payload: {
                title: response.updatedTask.title,
                description: response.updatedTask.description,
                completed: response.updatedTask.completed,
                id: response.updatedTask._id
            }
        });

        setShowEdit(!showEdit);
    }

    const HandleAddTask = async (values) => {
        const { title, description } = values;

        const response = await taskServices.createTask({ title, description }, user.currentUser);

        dispatch({
            type: 'ADD_TASK',
            payload: response.task
        });

        setShowAdd(!showAdd);
    }



    return (
        <>
            <Header />
            <Container>
                <Row className="justify-content-center text-center mt-5">
                    <Col>
                        <h1>Tasks</h1>
                    </Col>
                </Row>
                <hr />
                <Row className="text-end mb-4">
                    <Col>
                        <Button onClick={() => setShowAdd(!showAdd)} variant="primary">Adicionar</Button>
                    </Col>
                </Row>

                <Row className="align-items-center text-center">
                    <Col sm="10">
                        <Row className="align-items-center text-center">
                            <Col sm="3">
                                <span className="ps-sm-4">Title</span>
                            </Col>
                            <Col sm="5">
                                <span className="text-muted">Description</span>
                            </Col>
                            <Col sm="4">
                                <span className="pe-sm-3">Status</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr />
                <Row className="mt-3">
                    <Col>
                        {loading ? (
                            // showAdd loading icon if loading is true
                            <div className="text-center">
                                <Icon icon="line-md:loading-twotone-loop" color="#9b9b9b" width="44" height="44" />
                            </div>
                        ) : (
                            <ListGroup>

                                {user.tasks === 429 ? (
                                    <div className="text-center">
                                        <p className="text-muted">You are going too fast!</p>
                                    </div>
                                ) : (

                                    user.tasks.map((task, index) => (
                                        <Task key={index} token={task._id} title={task.title} desc={task.description} completed={task.completed}
                                            // pass the state of the modal to the task component
                                            setShowEdit={setShowEdit}
                                            // set the state of the taskEditPayload to the current task
                                            setTaskEditPayload={setTaskEditPayload}
                                            taskEditPayload={taskEditPayload}
                                        />
                                    ))
                                )}

                            </ListGroup>
                        )}
                    </Col>
                </Row>

            </Container>

            <Modal show={showAdd} onHide={() => setShowAdd(!showAdd)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a task</Modal.Title>
                </Modal.Header>

                <Formik
                    {...formik}
                    initialValues={taskPayload}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                        isValid,
                        isSubmitting,
                        isInvalid
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Enter task title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        isValid={touched.title && !errors.title}
                                        isInvalid={touched.title && !!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        placeholder="Enter task description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={touched.description && !!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Create task
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>




            </Modal>
            <Modal show={showEdit} onHide={() => setShowEdit(!showEdit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit: <span className="text-muted">{taskEditPayload.title}</span></Modal.Title>
                </Modal.Header>
                <Formik
                    {...formikEdit}
                    initialValues={taskEditPayload}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        errors,
                        isValid,
                        isSubmitting,
                        isInvalid
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Enter task title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                        isValid={touched.title && !errors.title}
                                        isInvalid={touched.title && !!errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.title}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        placeholder="Enter task description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        isValid={touched.description && !errors.description}
                                        isInvalid={touched.description && !!errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check
                                        value={values.completed} 
                                        type="checkbox"
                                        label="Completed"
                                        name="completed"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Edit task
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>


            </Modal>
        </>
    )
}


export default TasksScreen 
