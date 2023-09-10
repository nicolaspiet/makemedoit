import { Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { Icon } from '@iconify/react';

import { useDispatch, useSelector } from 'react-redux';
import tasksService from '../../services/tasksServices.js';

const Task = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(rootReducer => rootReducer.userReducer);


    return (
        <>
            <ListGroup.Item id={props.token}>
                <Row className="align-items-center">
                    <Col md="10">
                        <Row className="align-items-center text-center">
                            <Col md="3">
                                <div>
                                    <span>{props.title}</span>
                                </div>
                            </Col>
                            <Col md="5">
                                <span className="text-muted">{props.desc}</span>
                            </Col>
                            {props.completed ? (
                                <Col md="4">
                                    <Badge bg="success">COMPLETED</Badge>
                                </Col>
                            ) : (
                                <Col md="4">
                                    <Badge bg="warning">PENDING</Badge>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <hr className="my-2 d-md-none" />
                    <Col md="2" className="">
                        <Row className="text-center">
                            <Col>
                                <a onClick={() => {
                                    // set the state modal to true and the state of the taskEdit to the current task
                                    props.setShowEdit(true);
                                    props.setTaskEditPayload({
                                        title: props.title,
                                        description: props.desc,
                                        completed: props.completed,
                                        id: props.token
                                    });
                                }}>
                                    <Icon type="button" className="icon-tasks" icon="tabler:edit" color="#9b9b9b" width="22" height="22" />
                                </a>
                            </Col>
                            <Col>
                                <a onClick={async () => {
                                    const taskId = props.token;
                                    const response = await tasksService.deleteTask(taskId, user.currentUser);
                                
                                    dispatch({
                                        type: 'DELETE_TASK',
                                        payload: taskId
                                    });
                                }}>
                                    <Icon type="button" className="icon-tasks" icon="ion:trash-sharp" color="#A10000" width="22" height="22" />
                                </a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    );
}

export default Task;