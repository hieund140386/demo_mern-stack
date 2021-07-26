const argon2 = require('argon2');
const User = require('../Models/User');
const { accessTokenSecret } = require('../configs/config');
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description Check if accessToken is valid or not
 */
const checkAccessToken = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'User not found'
      })
      return;
    }
    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description handler for route POST api/auth/signup
 * 
 */
const handleSignup = async (req, res) => {
  const { username, password } = req.body;
  console.log(username)
  if ( !username || !password) {
    return res
    .status(400)
    .json({
      success: false,
      message: 'Missing username or password!'
    })
  }
  try {
    // check if a new user has existed username or not
    const user = await User.findOne({
      username
    });
    // in the case of existing a username, that means, this username is invalid
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Username has already existed!'
      })
    }
    // in the case of non existing username, that means, this new username is valid
    // and encrypt password using argon2's hash method
    const hashPassword = await argon2.hash(password);

    // create a new user which comply to User Schema
    const newUser = new User({
      username,
      password: hashPassword
    })
    // then, write this user into database
    await newUser.save();
    // return a token for the next login
    const accessToken = jwt.sign({
      userId: newUser._id
    }, accessTokenSecret)

    return res.status(200).json({
      success: true,
      message: 'Successfully signed up!',
      accessToken
    });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description handler for route POST api/auth/login
 */

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  // in the case of no have username and/or password, terminal here
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and/or password is missing!'
    })
  }
  try {
    // check if username is existed or not
    const user = await User.findOne({
      username
    });
    // in the case of no have a such username, terminal here
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect username!'
      })
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect password!'
      })
    }
    const accessToken = jwt.sign({
      userId: user._id
    }, accessTokenSecret);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      accessToken,
    })
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
} 


const authenService = {
  login: handleLogin,
  signup: handleSignup,
  checkToken: checkAccessToken
};

module.exports = authenService;