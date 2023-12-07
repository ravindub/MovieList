import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  // State to store input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle register button click
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Make a registration request to backend API
      const response = await api.post('/api/v1/users/register', {
        username,
        password
      });

      //redirect the user to the login page
      navigate('/login');
    } catch (error) {
      // Handle registration failure
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5 ">
        <Col xs={12} md={6} lg={3}>
          <h2 className="mb-4">Register</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicUsername" className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
