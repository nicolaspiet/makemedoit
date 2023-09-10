import { React, useState } from "react";
import { Button, Row, Col, Container, ListGroup, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import '../dist/css/global.css'

import { useSelector, useDispatch } from "react-redux";
import Header from "../components/header/index.js";

const HomeScreen = () => {
    const user = useSelector(rootReducer => rootReducer.userReducer);
    return (
        <>
            <Header />
            <Container className="mt-5 pt-5">
                <Row className="text-center">
                    <Col>
                        <h1 className="display-1 fw-bold">makemedoit</h1>
                    </Col>
                </Row>
                <hr />
                <Row className="text-center">
                    <Col>
                        <p>makemedoit is a simple task manager made to help you with your tasks.</p>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        {
                            user.currentUser ? (
                                <Link className="redirect-button-link mx-1 my-1 my-md-1" to="/tasks">
                                    <Button variant="outline-primary">See my tasks</Button>
                                </Link>
                            ) : (
                                <Link className="redirect-button-link mx-1 my-1 my-md-1" to="/login">
                                    <Button variant="outline-primary">Get Started</Button>
                                </Link>
                            )
                        }


                    </Col>
                </Row>


            </Container>

        </>
    )
}


export default HomeScreen 
