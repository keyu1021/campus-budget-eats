import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#">Ingredients</Nav.Link>
        <Nav.Link href="#">Find a recipe</Nav.Link>
        <Nav.Link href="#">Favorites</Nav.Link>
        <Nav.Link href="#">Account</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
}

export default Navigation;