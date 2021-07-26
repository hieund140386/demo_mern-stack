import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/AuthContext";
import { AlertMessage } from "../layout/AlertMessage";

const LoginForm = () => {
  // history
  const history = useHistory();
  // context
  const { loginUser } =  useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [alert, setAlert] = useState(null);

  const onChangeLoginForm = event => setLoginForm({
    ...loginForm,
    [event.target.name]: event.target.value
  })

  const login = async event => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        //history.push('/dashboard')
        setAlert({
          type: 'danger',
          message: loginData.message
        })
        setTimeout(() => {
          setAlert(null)
        }, 1000);
      }
    } catch (error) {
      console.log("error: ", error)
    }
  }
  const { username, password } = loginForm;
  return (
    <>
      <Form className='my-4' onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account ?
        <Link to="/signup">
          <Button variant="info" size="sm" className="ml-2">
            Signup
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
