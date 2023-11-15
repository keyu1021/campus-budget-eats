import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar bg='light' data-bs-theme='light'>
      <Container>
        <LinkContainer to='/home'>
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>

        <Nav className='me-auto'>
          <LinkContainer to='/ingredients'>
            <Nav.Link>Ingredients</Nav.Link>
          </LinkContainer>
          <Nav.Link>Find a recipe</Nav.Link>
          <Nav.Link>Favorites</Nav.Link>

          <LinkContainer to='/account'>
            <Nav.Link>Account</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
