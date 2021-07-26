import Button from 'react-bootstrap/Button';
import playIcon from '../../assets/images/play-btn.svg';
import editIcon from '../../assets/images/pencil.svg';
import deleteIcon from '../../assets/images/trash.svg';
import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';


export const ActionButtons = ({ url, _id }) => {
  // PostContext
  const { deletePost, setShowToast, updatePost, findPost, setShowUpdatePostModal } = useContext(PostContext);
  // handlers
  const handleDeletePost = async () => {
    const { success, message } = await deletePost(_id);
    if (success) {
      setShowToast({
        show: true,
        message,
        type: success ? 'success' : 'danger'
      })
    }
  }
  const handleEditPost =  () => {
    findPost(_id);
    setShowUpdatePostModal(true);
  }
  return (
    <>
      <Button
        className="post-button"
        href={url}
        target="_blank"
      >
        <img
          src={playIcon}
          alt="play"
          width="32"
          height="32"
        />
      </Button>
      <Button
        className="post-button"
        onClick={handleEditPost}
      >
        <img
          src={editIcon}
          alt="edit"
          width="24"
          height="24"
        />
      </Button>
      <Button
        className="post-button"
        onClick={handleDeletePost}
      >
        <img
          src={deleteIcon}
          alt="delete"
          width="24"
          height="24"
        />
      </Button>
    </>
  );
}