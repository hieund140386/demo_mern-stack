const serverConstants = require('../commons/constants/server');

const Post = require('../Models/Post');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @access Private
 * @description Create a new post
 */
const createPost = async (req, res) => {
  const { title, description, url, status } = req.body;
  const { userId } = req;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required!'
    })
  }
  try {
  let newPost = await Post.findOne({
    title, 
    user: userId
  })
  if (newPost) {
    return res.status(400).json({
      success: false,
      message: `${title} has already existed.`
    })
  }
  newPost = new Post({
    title,
    description,
    url: url.length > 0 ? (url.startsWith('https://') ? url : `https://${url}`) : '',
    status: status || serverConstants.STATUS_DEFAULT,
    user: userId
  })
    await newPost.save();
    res.status(200).json({
      success: true,
      message: `${title} has been created successfully. Happy learning!`,
      post: newPost
    })
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @access Private
 * @description Get posts list
 */

const getPost = async (req, res) => {
  const { userId } = req;
  try {
    const posts = await Post.find({
      user: userId
    }).populate('user', ['username']);
    if (posts.length == 0) {
      return res.status(200).json({
        success: true,
        message: `There is ${posts.length == 0 && 'no'} any existed posts.`
      })
    }
    res.status(200).json({
      success: true,
      message: posts.length < 2 ? `There is 1 existed post` : `There are ${posts.length} existed posts`,
      posts: posts
    })
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error.'
    })
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @access Private
 * @description Update an existed post
 */
const updatePost = async (req, res) => {
  const { userId } = req;
  const { title, status, description, url } = req.body;
  const { id } = req.params;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'The title is required'
    })
  }
  try {
    const isUpdatedTitleExisted = await Post.findOne({
      title,
      user: userId
    })
    if (isUpdatedTitleExisted) {
      return res.status(400).json({
        success: false,
        message: `${title} already has existed`
      })
    }
    let updatedPost = {
      title,
      description: description || '',
      url: url.length != 0 ? (url.startsWith('https://') ? url : `https://${url}`) : '',
      status: status || serverConstants.STATUS_DEFAULT
    }

    const updateConditions = {
      _id: id,
      user: userId
    }

    updatedPost = await Post
      .findOneAndUpdate(updateConditions, updatedPost, { new: true })
      .populate('user', ['username']);
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or user not authorized'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Updated successfully',
      post: updatedPost
    })
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const postDeleteConditions = {
      _id: id,
      user: userId
    };
    const deletedPost = await Post
      .findOneAndDelete(postDeleteConditions)
      .populate('user', ['username']);
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or User not authorized'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Deleted successfully',
      post: deletedPost
    })
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}
const postService = {
  createPost,
  getPost,
  updatePost,
  deletePost
}

module.exports = postService;