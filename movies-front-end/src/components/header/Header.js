// Importing necessary dependencies and components

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Header = ({ username, updateUsername }) => {
  // State to hold the username

  // Effect to run when the component mounts to retrieve the username from sessionStorage
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      updateUsername(storedUsername);
    }
  }, [updateUsername]);

  // Function to handle logout
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('username');
    // Update the username state
    updateUsername('');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: 'gold' }}>
          Movies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </Nav>
          {username ? (
            <>
              <div>Username: {username} </div>
              <Button
                type="button"
                className="btn btn-info m-1"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-info me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-info">
                Register
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
