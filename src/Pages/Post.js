import React, { useState, useEffect } from "react";
import {Card, Col,Container,Row,Nav,Navbar,NavDropdown,CardGroup,Dropdown,DropdownButton,Button,Form,Modal,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../Images/Logo.png";
import "./Style.css";

const Post = () => {
  const [comments, setComments] = useState({});
  const [blogArray, setBlogArray] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostData, setEditPostData] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentIndex, setEditedCommentIndex] = useState(-1);
  const [typingComment, setTypingComment] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the API
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const apiPosts = await response.json();
  
        // Get locally stored posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem("blogArray")) || [];
  
        // Combine local posts and API posts
        const combinedPosts = [...storedPosts, ...apiPosts.map(post => {
          return {
            id: post.id,
            title: post.title,
            content: post.body // Include the 'body' field from the API as 'content'
          };
        })];
  
        // Update the state with combined posts
        setBlogArray(combinedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    // Call the fetchPosts function
    fetchPosts();
  
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setComments(storedComments);
  }, []);
  

  const setCurrentUser = (userData) => {
    // Logic to update the current user's state
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const loggedInUserId = JSON.parse(localStorage.getItem("userData"))?.userId;

  const isUserAuthorized = (userId) => {
    return loggedInUserId === userId;
  };

  const isPostOwner = (userId) => {
    return loggedInUserId === userId;
  };

  const isCommentOwner = (userId) => {
    return loggedInUserId === userId;
  };

  const handleAddComment = (postId, comment) => {
    setTypingComment({ ...typingComment, [postId]: "" });

    const userId = loggedInUserId;

    const postComments = comments[postId] || [];

    const newComment = {
      userId,
      comment,
    };

    const updatedComments = {
      ...comments,
      [postId]: [...postComments, newComment],
    };

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const handleEditPost = (postId) => {
    const postToEdit = blogArray.find((post) => post.id === postId);
    if (isPostOwner(postToEdit.userId)) {
      setEditPostData(postToEdit);
      setShowEditModal(true);
    }
  };

  const handleUpdatePost = () => {
    const postId = editPostData?.id;
    const updatedPostData = { ...editPostData };
    handleSaveUpdatedPost(postId, updatedPostData);
  };

  const handleSaveUpdatedPost = (postId, updatedPostData) => {
    const postIndex = blogArray.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      const updatedPosts = [...blogArray];
      updatedPosts[postIndex] = { ...updatedPostData, id: postId };
      setBlogArray(updatedPosts);
      localStorage.setItem("blogArray", JSON.stringify(updatedPosts));
    }
    setShowEditModal(false);
  };

  const handleDeletePost = (postId) => {
    if (isPostOwner(blogArray.find((post) => post.id === postId)?.userId)) {
      const updatedPosts = blogArray.filter((post) => post.id !== postId);
      setBlogArray(updatedPosts);
      localStorage.setItem("blogArray", JSON.stringify(updatedPosts));
    }
  };

  const handleEditComment = (postId, commentIndex) => {
    const editedComment = comments[postId][commentIndex].comment;
    setEditedComment(editedComment);
    setEditedCommentIndex(commentIndex);
  };

  const handleUpdateComment = (postId) => {
    if (editedCommentIndex !== -1) {
      const updatedComments = { ...comments };
      updatedComments[postId][editedCommentIndex].comment = editedComment;
      setComments(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
      setEditedComment("");
      setEditedCommentIndex(-1);
    }
  };

  const handleDeleteComment = (postId, commentIndex) => {
    if (isCommentOwner(comments[postId][commentIndex].userId)) {
      const updatedComments = { ...comments };
      updatedComments[postId].splice(commentIndex, 1);
      setComments(updatedComments);
      localStorage.setItem("comments", JSON.stringify(updatedComments));
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

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
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Blogs</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {blogArray.map((post) => (
          <Row
            key={post.id}
            style={{ marginLeft: "20%", maxWidth: "60%", marginTop: "5%" }}
          >
            <Col>
              <CardGroup>
                <Card className="p-3">
                  <div
                    style={{ border: "1px solid gray", borderRadius: "5px" }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          padding: "2%",
                          backgroundColor: "black",
                          color: "white",
                        }}
                      >
                        {post.title}
                        {isUserAuthorized(post.userId) && (
                          <DropdownButton
                            variant="light"
                            title="Options"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              float: "right",
                            }}
                          >
                            <Dropdown.Item
                              onClick={() => handleEditPost(post.id)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDeletePost(post.id)}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        )}
                      </h4>
                    </div>
                    <Card className="m-2">
                      <div style={{ padding: "2%", fontSize: "20px" }}>
                        {post.content}
                      </div>
                    </Card>
                    <div style={{ padding: "2%" }}>
                      {comments[post.id] && (
                        <div className="card-comments">
                          <h6 style={{ color: "gray" }}>Comments:</h6>
                          {comments[post.id].map((commentObj, index) => (
                            <Card
                              key={index}
                              className="mb-2"
                              style={{
                                fontFamily: "Times New Roman, serif",
                                fontSize: "15px",
                              }}
                            >
                              <Card.Body>
                                {editedCommentIndex === index ? (
                                  <>
                                    <Form.Control
                                      type="text"
                                      value={editedComment}
                                      onChange={(e) =>
                                        setEditedComment(e.target.value)
                                      }
                                    />
                                    <div
                                      className="comment-buttons"
                                      style={{ marginTop: "2%" }}
                                    >
                                      <button
                                        variant="dark"
                                        onClick={() =>
                                          handleUpdateComment(post.id)
                                        }
                                      >
                                        Save
                                      </button>{" "}
                                      |{" "}
                                      <button
                                        variant="dark"
                                        onClick={() =>
                                          setEditedCommentIndex(-1)
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {commentObj.comment}
                                    <div className="comment-buttons">
                                      {isCommentOwner(
                                        comments[post.id][index].userId
                                      ) && (
                                        <>
                                          {editedCommentIndex === index ? (
                                            <>
                                              <button
                                                variant="dark"
                                                onClick={() =>
                                                  handleUpdateComment(post.id)
                                                }
                                              >
                                                Save
                                              </button>{" "}
                                              |{" "}
                                              <button
                                                variant="dark"
                                                onClick={() =>
                                                  setEditedCommentIndex(-1)
                                                }
                                              >
                                                Cancel
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                variant="dark"
                                                onClick={() =>
                                                  handleEditComment(
                                                    post.id,
                                                    index
                                                  )
                                                }
                                              >
                                                Edit
                                              </button>{" "}
                                              |{" "}
                                              <button
                                                variant="dark"
                                                onClick={() =>
                                                  handleDeleteComment(
                                                    post.id,
                                                    index
                                                  )
                                                }
                                              >
                                                Delete
                                              </button>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </>
                                )}
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      )}
                      <div className="row">
                        <div className="col">
                          <Form.Control
                            type="text"
                            placeholder="Write a comment..."
                            value={typingComment[post.id] || ""}
                            onChange={(e) =>
                              setTypingComment({
                                ...typingComment,
                                [post.id]: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-auto">
                          <Button
                            variant="dark"
                            onClick={() =>
                              handleAddComment(
                                post.id,
                                typingComment[post.id] || ""
                              )
                            }
                          >
                            <i className="bi bi-arrow-right"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        ))}
      </Container>

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={editPostData?.content}
            onChange={(e) =>
              setEditPostData({ ...editPostData, content: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="dark" onClick={handleUpdatePost}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;