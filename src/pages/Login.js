import { Button, Col, Form, Row, Card, Spinner } from "react-bootstrap"
import { React, useState, useEffect, useContext  } from 'react';
import { useHistory } from 'react-router-dom';

import { signIn } from '../apis';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../contexts/AuthContext';

// Login page — redirects to /places if the user already has a session
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const auth = useContext(AuthContext);

  // Skip login screen when user is already authenticated
  useEffect(() => {
    if (auth.token) {
      history.replace('/places');
    }
  });

  const onClick = () => {
    auth.signIn(username, password, () => history.replace("/places"));
  };

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginTop: '40px' }}>
        <Col lg={5} md={7}>
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 900, color: '#1a1a2e' }}>Welcome back</h2>
            <p style={{ color: '#6c757d' }}>Sign in to manage your menus</p>
          </div>
          <Card>
            <Card.Body style={{ padding: '32px' }}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="standard" block onClick={onClick} disabled={auth.loading} className="mt-4">
                {
                  auth.loading ? (
                    <Spinner
                      variant="standard"
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Sign In"
                  )
                }
              </Button>
            </Card.Body>
          </Card>
          <p className="text-center mt-3" style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Don't have an account? <a href="/register" style={{ color: '#ff3366', fontWeight: 600 }}>Sign up</a>
          </p>
        </Col>
      </Row>
    </MainLayout>
  )
}


export default Login;
