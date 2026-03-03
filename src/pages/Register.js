import { Button, Col, Form, Row, Card, Spinner } from "react-bootstrap"
import { React, useState, useEffect, useContext  } from 'react';
import { useHistory } from 'react-router-dom';

import { signIn } from '../apis';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../contexts/AuthContext';

// Registration page — new users create an account here
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const auth = useContext(AuthContext);

  // Redirect away if they're already logged in
  useEffect(() => {
    if (auth.token) {
      history.replace('/places');
    }
  });

  const onClick = () => {
    auth.register(username, password, () => history.replace("/places"));
  };

  return (
    <MainLayout>
      <Row className="justify-content-center" style={{ marginTop: '40px' }}>
        <Col lg={5} md={7}>
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 900, color: '#1a1a2e' }}>Create your account</h2>
            <p style={{ color: '#6c757d' }}>Start building your digital menu in minutes</p>
          </div>
          <Card>
            <Card.Body style={{ padding: '32px' }}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pick a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Choose a password"
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
                    "Sign Up"
                  )
                }
              </Button>
            </Card.Body>
          </Card>
          <p className="text-center mt-3" style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            Already have an account? <a href="/login" style={{ color: '#ff3366', fontWeight: 600 }}>Log in</a>
          </p>
        </Col>
      </Row>
    </MainLayout>
  )
}


export default Register;
