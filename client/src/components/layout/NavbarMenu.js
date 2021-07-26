import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { LogoIcon, LogoutIcon } from '../../assets/images/svgIcons';
import { Link } from 'react-router-dom';
import logoLearnIt from '../../assets/images/logo.svg';
import logoutIcon from '../../assets/images/logout.svg';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'

export const NavbarMenu = props => {
  const { authState: {user: {username}}, logoutUser} = useContext(AuthContext)
  const logout = () => {
    logoutUser()
  }
  return (
    <Navbar 
      expand='lg' 
      bg='primary' 
      variant='dark' 
      className='shadow'
    >
      <Navbar.Brand 
        className='font-weight-bolder text-white'
      >
        <img 
          src={logoLearnIt} 
          width='32' 
          height='32' 
          className='mr-2' 
        />
        LearnIt
      </Navbar.Brand>
      <Navbar.Toggle 
        aria-controls='basic-navbar-nav' 
      />
      <Navbar.Collapse
        id='basic-navbar-nav'
      >
        <Nav
          className='mr-auto'
        >
          <Nav.Link 
            className='font-weight-bolder text-white'
            to='/dashboard'
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link 
            className='font-weight-bolder text-white'
            to='/about'
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            className='font-weight-bolder text-white'
            disabled
          >
            Welcome {username}
          </Nav.Link>
          <Button
            className='font-weight-bolder text-white'
            variant='secondary'
            onClick={logout}
          >
            <img
              src={logoutIcon}
              alt='logoutIcon'
              width='32'
              height='32'
              className='mr-2'

            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}