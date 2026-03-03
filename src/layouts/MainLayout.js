import { Navbar, Nav, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

// Shared layout — top navbar with auth-aware links, plus a centered content container
const MainLayout = ({ children }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onSignIn = () => {
    history.replace("/login");
  }

  const onRegister = () => {
    history.replace("/register");
  }

  const onSignOut = () => {
    auth.signOut();
    history.push("/login");
  }

  const goToPlaces = () => {
    history.push("/places");
  }

  return (
    <>
      <Navbar variant="light" sticky="top" className="mb-4">
        <Navbar.Brand href="/">QR Menu</Navbar.Brand>

        <Nav>
          <Nav.Link onClick={goToPlaces}>Places</Nav.Link>
        </Nav>

        {/* Show Logout when signed in, Login/Register when signed out */}
        <Nav className="flex-grow-1 justify-content-end">
          {auth.token ? (
            <Nav.Link onClick={onSignOut}>Log Out</Nav.Link>
          ) : (
            [
              <Nav.Link key={1} onClick={onSignIn}>Log In</Nav.Link>,
              <Nav.Link key={2} onClick={onRegister}>Sign Up</Nav.Link>
            ]
          )}

        </Nav>
      </Navbar>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default MainLayout;
