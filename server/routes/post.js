const { router } = require('../configs/config');
const verifyToken = require('../middlewares/auth');
const postService = require('../services/postService');

/**
 * @route POST api/posts
 * @description Create post
 * @access Private
 */
router.post('/', verifyToken, postService.createPost);


/**
 * @route GET api/posts
 * @description Get post
 * @access Private
 */
router.get('/', verifyToken, postService.getPost)

/**
 * @route PUT api/posts/:id
 * @description Update post
 * @access Private
 */
router.put('/:id', verifyToken, postService.updatePost)

/**
 * @route DELETE api/posts/:id
 * @description Delete an existed post
 * @access Private
 */
router.delete('/:id', verifyToken, postService.deletePost)

module.exports = router;
