import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import logo from "../Images/Logo.png";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const setCurrentUser = (userData) => {
    // Logic to update the current user's state
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    setCurrentUser(null);
  };
  const routes = {
    home: "/Home",
    post: "/Post",
    services: "/Service",
    about: "/About",
    logout: "/",
    // Define other routes here
  };

  const handleNavbar = (route) => {
    navigate(route);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => handleNavbar(routes.home)}>
          <img src={logo} alt="Logo" className="img-fluid mb-1 nav-image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavbar(routes.home)}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavbar(routes.post)}>Posts</Nav.Link>
            <Nav.Link onClick={() => handleNavbar(routes.services)} disabled>
              Services
            </Nav.Link>
            <Nav.Link onClick={() => handleNavbar(routes.about)} disabled>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="collapsible-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Blogs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  handleLogout();
                  handleNavbar(routes.logout);
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
