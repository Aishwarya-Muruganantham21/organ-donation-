import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6} className="mb-3">
            <h5>LifeGift Organs</h5>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
              We register and facilitate organ donations to help save lives.
              Your single decision can give hope to up to 8 individuals in need.
            </p>
          </Col>
          <Col md={3} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted text-decoration-none">Home</a></li>
              <li><a href="/login" className="text-muted text-decoration-none">Login</a></li>
              <li><a href="/signup" className="text-muted text-decoration-none">Sign Up</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-3">
            <h5>Contact Details</h5>
            <ul className="list-unstyled text-muted">
              <li>Phone: +1 800-123-4567</li>
              <li>Email: contact@lifegift.org</li>
              <li>Address: Health City, Block 4</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center text-muted">
            <small>&copy; {new Date().getFullYear()} LifeGift Organs. All Rights Reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
