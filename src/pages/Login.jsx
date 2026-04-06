import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError('');
      const user = login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card className="glass-card p-4">
          <Card.Body>
            <div className="text-center mb-4">
              <HeartPulse color="#007bb5" size={48} className="mb-2" />
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted">Login to your donor account</p>
            </div>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              
              <Form.Group className="mb-4" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              
              <Button type="submit" className="w-100 btn-primary-custom">
                Login
              </Button>
            </Form>
            
            <div className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
