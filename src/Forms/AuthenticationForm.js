import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../Images/Logo.png"
import {
  SignUpInitialValues,
  LoginInitialValues,
  SignUpValidationSchema,
  LoginValidationSchema,
} from "../Constants/AuthenticationConstants";

const AuthenticationForm = () => {
  const navigate = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const handleSignUpSubmit = (values) => {
    const { name, email, password } = values;
    const userId = uuidv4();
    const userData = {
      userId,
      name,
      email,
      password,
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Retrieve the list of all users from localStorage
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    // Add the new user data to the list of all users
    usersData[userId] = userData;

    // Save the updated list of users back to localStorage
    localStorage.setItem("usersData", JSON.stringify(usersData));
    navigate(routes.home);
    // Redirect to Home page after successful sign-up
   
  };

  const handleLoginSubmit = (values) => {
    const { email, password } = values;

    // Retrieve the list of all users from localStorage
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

    // Check if the entered email and password match any user's data
    const loggedInUser = Object.values(usersData).find(
      (user) => user.email === email && user.password === password
    );

    if (loggedInUser) {
      // Save the logged-in user's data to localStorage
      localStorage.setItem("userData", JSON.stringify(loggedInUser));

      // Redirect to Home page after successful login
      navigate(routes.home);
    } else {
      alert("Invalid email or password. Please try again.");
      // Do something here, like showing an error message
    }
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  const handleLoginClick = () => {
    setShowSignUpForm(false);
  };
  const routes = {
    home: "/Home",
    // Define other routes here
  };



  return (
    <Container>
      <Row className="justify-content-center">
        <div
          className={`flip-card auth-form ${showSignUpForm ? "flipped" : ""}`}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Card className="p-4">
                <Row>
                  <Col md="auto" className="border-end pe-3">
                    <img
                      src={logo}
                      alt="Logo"
                      className="img-fluid mb-4 image-1"
                    />
                  </Col>
                  <Col>
                    <Formik
                      initialValues={SignUpInitialValues}
                      validationSchema={SignUpValidationSchema}
                      onSubmit={handleSignUpSubmit}
                    >
                      <Form>
                        <h3>Sign-up Form</h3>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name:
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email:
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password:
                          </label>
                          <Field
                            type="password"
                            name="password"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="signUp">
                          <Button type="submit" className="btn btn-dark">
                            Sign up
                          </Button>
                          <span>
                            Already have an account?{" "}
                            <a href="#!" onClick={handleSignUpClick}>
                              Login
                            </a>
                          </span>
                        </div>
                      </Form>
                    </Formik>
                  </Col>
                </Row>
              </Card>
            </div>
            <div className="flip-card-back">
              <Card className="p-4">
                <Row>
                  <Col>
                    <Formik
                      initialValues={LoginInitialValues}
                      validationSchema={LoginValidationSchema}
                      onSubmit={handleLoginSubmit}
                    >
                      <Form>
                        <h3>Sign-in Form</h3>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email:
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password:
                          </label>
                          <Field
                            type="password"
                            name="password"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="logIn">
                          <Button type="submit" className="btn btn-dark">
                            Log in
                          </Button>
                          <span>
                            New here?
                            <a href="#!" onClick={handleLoginClick}>
                              Sign Up
                            </a>
                          </span>
                        </div>
                      </Form>
                    </Formik>
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default AuthenticationForm;
