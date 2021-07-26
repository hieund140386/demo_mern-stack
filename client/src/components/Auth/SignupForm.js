import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AlertMessage } from '../layout/AlertMessage';
import { AuthContext } from '../../context/AuthContext';

const SignupForm = () => {
  console.warn("signup Form")
  // context
  const { registerUser } = useContext(AuthContext);

  // signup form state
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  // alert state
  const [alert, setAlert] = useState(null);

  // onChange signupForm input
  const onChangeSignupForm = event => {
    setSignupForm({
      ...signupForm,
      [event.target.name]: event.target.value
    })
  }
  
  const { username, password, confirmPassword } = signupForm;
  
  // submit handler of signupForm
  const register = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        type: 'danger',
        message: 'Password do not match'
      })
      setTimeout(() => {
        setAlert(null)
      }, 5000);
      return;
    }
    try {
      const signupUser = {
        username: signupForm.username,
        password: signupForm.password
      }
      const registerData = await registerUser(signupUser)
      if (!registerData.success) {
        setAlert({
          type: 'danger',
          message: registerData.message
        })
        setTimeout(() => setAlert(null), 2000);
      }
    } catch (error) {
      console.log("error: ", error)
    }
  }
  return (
    <>
      <Form className='my-4' onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeSignupForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeSignupForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeSignupForm}
          />
        </Form.Group>
        <Button variant="success" type="submit" onSubmit={register}>
          Signup
        </Button>
      </Form>
      <p>
        Already have an account ?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default SignupForm;
