import { useMutation } from "@apollo/client";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LOGOUT } from "../../hooks/user/Logout";
import MenuItem from "./MenuItem";
import "./style.css";

function Header(props: any) {
  const me = props.user;
  console.log(me);

  const [logout] = useMutation(LOGOUT);

  const logoutHandler = () => {
    logout();
    window.location.replace("/");
  };

  return (
    <Navbar collapseOnSelect bg="primary" variant="dark" expand="sm">
      <Container>
        <MenuItem to="/">
          <Navbar.Brand>Book Store</Navbar.Brand>
        </MenuItem>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {me ? (
            <>
              <Nav className="me-auto">
                <MenuItem to="/books">Books</MenuItem>
                <MenuItem to="/authors">Autors</MenuItem>
                <MenuItem to="/categories">Categories</MenuItem>
              </Nav>
              <Nav>
                <Navbar.Text style={{ color: "#fff" }}>
                  Hello {me?.firstName} {me?.lastName}
                </Navbar.Text>
                <Nav.Link color="black" onClick={() => logoutHandler()}>
                  Logout
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav>
              <MenuItem to="/login">Login</MenuItem>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
