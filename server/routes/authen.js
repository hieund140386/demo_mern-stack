// const { router } = require('../configs/config');
const verifyToken = require('../middlewares/auth');
const authenService = require('../services/authenService');
const express = require('express')
const router = express.Router();
/**
 * @route : GET /api/auth
 * @description : Check if accessToken is valid or not
 * @access : public
 */
router.get('/', verifyToken, authenService.checkToken);

/**
 * @route : POST /api/auth/signup
 * @description : a new user signup
 * @access : public
 */
router.post('/signup', authenService.signup);


/**
 * @route : POST /api/auth/login
 * @description : a signed up user login
 * @access : public
 */
router.post('/login', authenService.login);

module.exports = router;