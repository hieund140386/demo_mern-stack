import React, { useContext, useEffect } from 'react'
import { PostContext } from '../context/PostContext'
import { AuthContext } from '../context/AuthContext';
import { Post } from '../components/posts/Post';
import { AddPostModal } from '../components/posts/AddPostModal';
import addIcon from '../assets/images/plus-circle-fill.svg';
import { OverlayTrigger, Card, Button, Row, Col, Spinner, Tooltip, Toast } from 'react-bootstrap';
import { UpdatePostModal } from '../components/posts/UpdatePostModal';

const Dashboard = () => {
  // AuthContext
  const { authState: {user: {username}}} = useContext(AuthContext);
  // PostContext
  const { postState: {
    post,
    posts,
    postLoading
  }, getPost, setShowAddPostModal, showToast: {
    show,
    message,
    type
  }, setShowToast } = useContext(PostContext)
  // lifecycle: get all posts
  useEffect(() => {
    getPost()
  }, [])
  const handleSetShowAddPostModal = () => {
    setShowAddPostModal(true);
  }
  // body
  let body;
  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  } else if (!posts) {
    body = (
      <>
        <Card 
          className="text-center mx-5 my-5"
        >
          <Card.Header
            as='h1'
          >
            Hi {username}
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Welcome to LearnIt
            </Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button 
              variant="primary"
              onClick={handleSetShowAddPostModal}
            >
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {
            posts.map(post => (
              <Col key={post._id} className="my-2">
                <Post post={post} />
              </Col>
            ))
          }
        </Row>
        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={
            <Tooltip>Add a new thing to learn</Tooltip>
          }
        >
          <Button
            className="btn-floating"
            onClick={handleSetShowAddPostModal}
          >
            <img 
              src={addIcon}
              alt="add-post-modal-icon"
              width={60}
              height={60}
            />
          </Button>
        </OverlayTrigger>
      </>
    )
  }
  return (
    <>
      {body}
      <AddPostModal />
      {post && <UpdatePostModal />}
      {/* Show Toast after adding new post */}
      <Toast 
        show={show}
        style={{position: 'fixed', top: '20%', right: '10px'}}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {show: false, message: '', type: null})}
        delay="3000"
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  )
}

export default Dashboard
