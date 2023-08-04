import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Form,
  NavDropdown,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Formik, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import logo from "../Images/Logo.png";
import CardHeader from "react-bootstrap/esm/CardHeader";
const Home = () => {
  const initialValues = {
    title: "",
    content: "",
  };
  // Initialize the array with the data from local storage, if available
  const storedArray = JSON.parse(localStorage.getItem("blogArray")) || [];
  const [blogArray, setblogArray] = useState(storedArray);
  const [newPost, setNewPost] = useState(null);

  const validateForm = (values) => {
    const errors = {};
    if (!values.title.trim()) {
      errors.title = "Blog must have Title";
    }
    if (!values.content.trim()) {
      errors.content = "Blog must have some content";
    }
    return errors;
  };
  const handlePost = (values, { resetForm }) => {
    const newPostData = {
      id: uuidv4(),
      userId: JSON.parse(localStorage.getItem("userData"))?.userId,
      title: values.title,
      content: values.content,
    };
    resetForm();
    setNewPost(newPostData);
    setblogArray((prevArray) => [...prevArray, newPostData]);
  };
  const handleWriteAnotherPost = () => {
    setNewPost(null);
  };

  // Save the array to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("blogArray", JSON.stringify(blogArray));
  }, [blogArray]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/Home">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid mb-1"
              style={{ maxWidth: "100px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/Post">Posts</Nav.Link>
              <Nav.Link href="/services" disabled>
                Services
              </Nav.Link>
              <Nav.Link href="/about" disabled>
                About
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Blogs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <Link to="/" style={{ textDecoration: "none", color: "red" }}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row style={{ marginLeft: "25%", maxWidth: "50%", marginTop: "5%" }}>
          <Col>
            <div className={`flip-card ${newPost ? "flipped" : ""}`}>
              <div className="flip-card-inner">
                {!newPost ? (
                  <div className="flip-card-front">
                    <Card>
                      <CardHeader className="blog-header">
                        <h4>Let us read your thoughts</h4>
                      </CardHeader>

                      <div className="p-4">
                        <Formik
                          initialValues={initialValues}
                          onSubmit={handlePost}
                          validate={validateForm} // Add the validation function
                        >
                          {({ handleSubmit, isValid, errors }) => (
                            <Form onSubmit={handleSubmit}>
                              <div className="form-group mb-3">
                                <Form.Label>Title:</Form.Label>
                                <Field
                                  type="text"
                                  name="title"
                                  className="form-control"
                                />
                                {errors.title && (
                                  <div className="text-danger">
                                    {errors.title}
                                  </div>
                                )}
                              </div>
                              <div className="form-group mb-3">
                                <Form.Label>Blog Content:</Form.Label>
                                <Field
                                  as="textarea"
                                  name="content"
                                  className="form-control"
                                  placeholder="What's on your mind..."
                                />
                                {errors.content && (
                                  <div className="text-danger">
                                    {errors.content}
                                  </div>
                                )}
                              </div>
                              <Button
                                variant="dark"
                                type="submit"
                                disabled={!isValid} // Disable the button if the form is invalid
                              >
                                Post
                              </Button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <div className="flip-card-back">
                    <Card className="p-4">
                      <h4
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          padding: "3%",
                          textAlign: "center",
                          borderRadius: "10px",
                          marginTop: "5%",
                        }}
                      >
                        Post has been posted.
                      </h4>
                      <div style={{ textAlign: "right", marginTop: "20%" }}>
                        <Link
                          to="/Post"
                          style={{
                            marginRight: "10px",
                            textDecoration: "none",
                          }}
                        >
                          View Posts
                        </Link>
                        <Link
                          to="/Home"
                          onClick={handleWriteAnotherPost}
                          style={{ textDecoration: "none" }}
                        >
                          Write another post
                        </Link>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
