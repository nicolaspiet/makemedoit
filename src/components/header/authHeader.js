import { Navbar, Container, Nav, NavDropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
    const dispatch = useDispatch();

    // Create a function that resets the current user in the redux store and remove from user from local storage
    const HandleSignOut = (e) => {
        e.preventDefault();
        dispatch({
            type: "SET_CURRENT_USER",
            payload: null,
        });
        dispatch({
            type: "SET_TASKS",
            payload: {
                tasks: []
            }
        });
    }

    


    return (
            <>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                    <Link className='redirect-button-link'  to="/">
                        <Navbar.Brand className='user-select-none'>makemedoit</Navbar.Brand>
                    </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link className={`redirect-button-link`} to="/">
                                    <Nav.Link className={`${window.location.pathname !== '/' ? 'text-muted' : 'text-white'}`} as="span">Home</Nav.Link>
                                </Link>
                                <Link className={`redirect-button-link`} to="/tasks">
                                    <Nav.Link className={`${window.location.pathname !== '/tasks' ? 'text-muted' : 'text-white'}`} as="span">Tasks</Nav.Link>
                                </Link>
                            </Nav>
                            <ButtonGroup>
                                <Button onClick={(e) => HandleSignOut(e)} variant="outline-primary">Sign out</Button>
                            </ButtonGroup>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }

    export default AuthHeader;