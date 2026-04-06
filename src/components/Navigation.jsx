import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HeartPulse } from 'lucide-react';

const Navigation = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom sticky-top py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <HeartPulse color="#e74c3c" size={28} />
          <span>LifeGift Organs</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home / Awareness</Nav.Link>
            {currentUser && !isAdmin && (
              <>
                <Nav.Link as={Link} to="/register-donor">Become a Donor</Nav.Link>
                <Nav.Link as={Link} to="/dashboard">My Dashboard</Nav.Link>
              </>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted">Hello, {currentUser.name}</span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-primary">Login</Link>
                <Link to="/signup" className="btn btn-primary btn-primary-custom">Sign Up</Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
