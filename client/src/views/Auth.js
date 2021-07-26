import React, { useContext } from 'react'
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Auth = ({ authRoute }) => {
  const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext);
  let body;
  if (authLoading) {
    body = (
      <div className='d-flex justify-content-center mt-2'>
        <Spinner animation='border' variant='info'/>
      </div>
    )
  } 
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  } else {
    body = (
      <>
        { authRoute === 'login' && <LoginForm /> }
        { authRoute === 'signup' && <SignupForm />}
      </>
    )
  }
  return (
    <div className="landing">
      <div className="dark-verlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth