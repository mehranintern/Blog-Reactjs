import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Form,
} from "react-bootstrap";
import { Formik, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import CardHeader from "react-bootstrap/esm/CardHeader";
import initialValues from "../Constants/HomeConstants";

const HomeForm = () => {
  const storedArray = JSON.parse(localStorage.getItem("blogArray")) || [];
  const [blogArray, setBlogArray] = useState(storedArray);
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
    setBlogArray((prevArray) => [...prevArray, newPostData]);
  };

  const handleWriteAnotherPost = () => {
    setNewPost(null);
  };

  useEffect(() => {
    localStorage.setItem("blogArray", JSON.stringify(blogArray));
  }, [blogArray]);

  return (
    <>
      <Container>
        <Row className="blog-card">
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
                          validate={validateForm}
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
                                disabled={!isValid}
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
                    <Card className="p-4 post-card">
                      <h4>Post has been posted.</h4>
                      <div className="post-links">
                        <Link className="post-link" to="/Post">
                          View Posts
                        </Link>
                        <Link
                          className="post-link"
                          to="/Home"
                          onClick={handleWriteAnotherPost}
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

export default HomeForm;
