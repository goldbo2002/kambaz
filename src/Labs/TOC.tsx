import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function TOC() {
  return (
    <Nav variant="pills" className="mb-3">
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab1">Lab 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Labs/Lab2">Lab 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz">Kambaz</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
