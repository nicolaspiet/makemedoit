import { Navbar, Container, Nav, NavDropdown, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PublicHeader = () => {


  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className='redirect-button-link'  to="/">
          <Navbar.Brand className='user-select-none'>makemedoit</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='text-center p-3 p-sm-0' id="basic-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>
          <ButtonGroup>
            <Link className="redirect-button-link mx-1 my-1 my-md-1" to="/login">
            <Button variant="outline-primary">Sign in</Button>
            </Link>
            <Link className="redirect-button-link mx-1 my-1 my-md-1" to="/register">
            <Button variant="outline-primary">Sign up</Button>
            </Link>
          </ButtonGroup>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default PublicHeader;