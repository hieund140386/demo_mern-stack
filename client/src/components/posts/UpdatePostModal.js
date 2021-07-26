
import { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { courseStatus } from '../../context/constants';
import { PostContext } from '../../context/PostContext';

export const UpdatePostModal = () => {
  // use PostContext
  const { postState: {
    post
  }, 
  showUpdatePostModal, 
  setShowUpdatePostModal, 
  updatePost, 
  setShowToast } = useContext(PostContext);
  // init state
  console.log(post)
  const [updatedPost, setUpdatedPost] = useState(post)

  const { title, description, url, status } = updatedPost;

  const handleChangeUpdatedPostFormField = event => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value
    })
  }
  // life cycle
  useEffect(() => {
    setUpdatedPost(post)
  }, [post])

  // handlers
  const handleResetUpdatePostModalField = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  }
  // on click on Cancel button of AddPostModal
  const handleCancelUpdatePostModal = () => {
    handleResetUpdatePostModalField();
  }
  // on click on LearnIt button of AddPostModal
  const handleSubmitUpdatePostModal = async event => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowToast({
      show: true,
      message,
      type: success ? 'success' : 'danger'
    })
    handleResetUpdatePostModalField();
  }
  return (
    <Modal show={showUpdatePostModal}>
      <Modal.Header 
        closeButton={true}
        onHide={handleCancelUpdatePostModal}  
      >
        <Modal.Title>Making progress ?</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmitUpdatePostModal}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              onChange={handleChangeUpdatedPostFormField}
              value={title}
            />
            <Form.Text
              id="title-help"
              muted
            >
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Description"
              row={3}
              name="description"
              required
              as="textarea"
              onChange={handleChangeUpdatedPostFormField}
              value={description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control 
              type="text"
              placeholder="Reference URL"
              name="url"
              onChange={handleChangeUpdatedPostFormField}
              value={url}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control 
              name="status"
              onChange={handleChangeUpdatedPostFormField}
              value={status}
              as="select"
            >
              <option value={courseStatus.ToLearn}>{courseStatus.ToLearn}</option>
              <option value={courseStatus.Learning}>{courseStatus.Learning}</option>
              <option value={courseStatus.Learnt}>{courseStatus.Learnt}</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCancelUpdatePostModal}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}