import { React, useState, useEffect } from "react";
import { Button, Row, Col, Container, ListGroup, Badge, Form } from "react-bootstrap";
import { Icon } from '@iconify/react';
import '../dist/css/global.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userServices";
import Header from "../components/header/index.js";
import { Formik } from "formik";
import * as Yup from 'yup';

const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userGlobalState = useSelector(rootReducer => rootReducer.userReducer);

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    // when user logins, redirect to tasks page using useNavigate()
    useEffect(() => {
        if (userGlobalState.currentUser) {
            navigate('/tasks');
        }
    }
        , [userGlobalState]);


    const HandleRegister = async (values) => {
        const username = values.username;
        const password = values.password;
        const token = await userServices.loginUser(username, password);

        dispatch({
            type: 'SET_CURRENT_USER',
            payload: token,
        });

    }

    // Setup formik for validation
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
        },
    };

    return (
        <>
            <Header />
            <Container className="mt-5 pt-5">
                <Row className="text-center">
                    <Col>
                        <h1>Sign in</h1>

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
                                    <Form.Group className="pb-2" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.username && !errors.username}
                                            isInvalid={touched.username && !!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="pt-2 pb-4" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && !!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Log in
                                    </Button>
                                </Form>
                            )}
                        </Formik>

                    </Col>
                </Row>
            </Container>

        </>
    )
}


export default LoginScreen 
