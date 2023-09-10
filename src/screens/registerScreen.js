import { React, useState } from "react";
import { Button, Row, Col, Container, ListGroup, Badge, Form } from "react-bootstrap";
import { Icon } from '@iconify/react';
import '../dist/css/global.css'

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup';
import userServices from "../services/userServices.js";

import Header from "../components/header/index.js";

const RegisterScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [status, setStatus] = useState('');


    const HandleRegister = async (values) => {
        const username = values.username;
        const password = values.password;

        const response = await userServices.registerUser(username, password);
        if (!response) {
            setStatus('User already exists');

            setTimeout(() => {
                setStatus('');
            }, 5000);
            return;
        }

        const token = await userServices.loginUser(username, password);

        dispatch({
            type: 'SET_CURRENT_USER',
            payload: token,
        });

        // Redirect to tasks page
        navigate('/tasks');
    }

    // Setup formik yup for validation
    const formik = {
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Username must be at least 3 characters')
                .max(16, 'Username must be 16 characters or less')
                .required('Username is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .max(32, 'Password must be 32 characters or less')
                .required('Password is required'),
        }),
        onSubmit: values => {
            HandleRegister(values);
        }
    }


    return (
        <>
            <Header />
            <Container className="mt-5 pt-5">
                <Row className="text-center">
                    <Col>
                        <h1>Sign up</h1>

                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col sm="5">
                        <hr />

                        <Formik
                            {...formik}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                errors,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="pb-2" controlId="formUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Enter username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                            isValid={touched.username && !errors.username}
                                            isInvalid={touched.username && !!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="pt-2 pb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && !!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="pb-3" controlId="formBasicCheckbox">
                                        <Form.Text className="text-muted">
                                            When you click "Sign up", you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Sign up
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <p className="pt-3 text-muted">

                            {status === 'User already exists' && <span className="text-danger">{status}.</span>}

                        </p>
                        <p className="text-muted">
                            Already have an account? <Link to="/login">Log in</Link>
                        </p>
                    </Col>
                </Row>
            </Container>

        </>
    )
}


export default RegisterScreen 
