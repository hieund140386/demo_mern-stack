import { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { PostContext } from '../../context/PostContext';

export const AddPostModal = () => {
  // use PostContext
  const { showAddPostModal, setShowAddPostModal, addNewPost, setShowToast } = useContext(PostContext);
  // init state
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'To Learn'
  })

  const { title, description, url } = newPost;

  const handleChangeNewPostFormField = event => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value
    })
  }

  // handlers
  const handleResetAddPostModalField = () => {
    setNewPost({
      title: '',
      description: '',
      url: '',
      status: 'To Learn'
    });
    setShowAddPostModal(false);
  }
  // on click on Cancel button of AddPostModal
  const handleCancelAddPostModal = () => {
    handleResetAddPostModalField();
  }
  // on click on LearnIt button of AddPostModal
  const handleSubmitAddPostModal = async event => {
    event.preventDefault();
    const { success, message } = await addNewPost(newPost);
    if (success) {
      setShowToast({
        show: true,
        message,
        type: success ? 'success' : 'danger'
      })
    }
    handleResetAddPostModalField();
  }
  return (
    <Modal show={showAddPostModal}>
      <Modal.Header 
        closeButton={true}
        onHide={handleCancelAddPostModal}  
      >
        <Modal.Title>What do you want to learn ?</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={handleSubmitAddPostModal}
      >
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              onChange={handleChangeNewPostFormField}
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
              onChange={handleChangeNewPostFormField}
              value={description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control 
              type="text"
              placeholder="Reference URL"
              name="url"
              onChange={handleChangeNewPostFormField}
              value={url}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCancelAddPostModal}
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