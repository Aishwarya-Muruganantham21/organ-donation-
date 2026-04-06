import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heart, Eye, Users, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Heart color="white" size={64} className="mb-3" />
          <h1>Be a Hero. Save a Life.</h1>
          <p>
            One organ donor can save up to 8 lives. Join the lifesavers community and pledge your organs today.
            Your legacy is another's lifetime.
          </p>
          <div className="mt-4">
            <Link to="/register-donor" className="btn btn-light btn-lg text-primary fw-bold px-4 me-3 rounded-pill shadow-sm">
              Register as Donor
            </Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg px-4 rounded-pill">
              Join Community
            </Link>
          </div>
        </Container>
      </section>

      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Why Organ Donation?</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Thousands of patients die every day waiting for a lifesaving organ transplant. 
            Donating your organs is a noble gesture that gives a second chance at life to people suffering from terminal failures.
          </p>
        </div>

        <Row className="g-4 mb-5 text-center">
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm dashboard-stats-card p-4">
              <Activity className="mx-auto text-primary mb-3" size={48} />
              <h4 className="fw-bold">8 Lives</h4>
              <p className="text-muted small">One donor can save up to 8 lives through organ donation.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm dashboard-stats-card p-4" style={{borderLeftColor: 'var(--secondary-color)'}}>
              <Eye className="mx-auto text-info mb-3" size={48} />
              <h4 className="fw-bold">75+ Lives</h4>
              <p className="text-muted small">Tissue donation can enhance the lives of more than 75 people.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm dashboard-stats-card p-4" style={{borderLeftColor: 'var(--accent-color)'}}>
              <Heart className="mx-auto text-danger mb-3" size={48} />
              <h4 className="fw-bold">Heart & Blood</h4>
              <p className="text-muted small">Anyone can donate blood or register to donate organs regardless of age.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm dashboard-stats-card p-4" style={{borderLeftColor: '#f1c40f'}}>
              <Users className="mx-auto text-warning mb-3" size={48} />
              <h4 className="fw-bold">Global Need</h4>
              <p className="text-muted small">Over 100,000 men, women, and children are on the national transplant waiting list.</p>
            </Card>
          </Col>
        </Row>

        {/* Success Stories */}
        <div className="my-5 pt-4">
          <h2 className="fw-bold text-center mb-4">Success Stories</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="glass-card h-100 border-0">
                <Card.Body>
                  <Card.Text className="fst-italic text-muted">
                    "After waiting 3 years for a kidney, my life changed overnight thanks to an anonymous donor. 
                    I can now watch my children grow up. I'll forever be grateful."
                  </Card.Text>
                  <h6 className="fw-bold mt-3 text-primary">- Sarah Jenkins</h6>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="glass-card h-100 border-0">
                <Card.Body>
                  <Card.Text className="fst-italic text-muted">
                    "My son's heart failed when he was only 5. A generous family decided to donate their child's heart in their darkest hour. 
                    They are our everyday heroes."
                  </Card.Text>
                  <h6 className="fw-bold mt-3 text-primary">- Mark & Lisa Taylor</h6>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* FAQs */}
        <div className="my-5 pt-4">
          <h2 className="fw-bold text-center mb-4">Frequently Asked Questions</h2>
          <Accordion defaultActiveKey="0" className="shadow-sm">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Does my religion support organ donation?</Accordion.Header>
              <Accordion.Body>
                All major religions (including Christianity, Islam, Judaism, Hinduism, and Buddhism) support organ donation and view it as a final act of love and generosity toward others.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Does registering as a donor change my patient care?</Accordion.Header>
              <Accordion.Body>
                No. If you are admitted to the hospital, the number one priority is to save your life. Organ donation is only considered after all lifesaving efforts have been exhausted and death has been legally declared.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Will donation disfigure my body?</Accordion.Header>
              <Accordion.Body>
                No. Organs and tissues are removed surgically with great care and respect. Donation does not interfere with having an open-casket viewing.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Can I choose which organs to donate?</Accordion.Header>
              <Accordion.Body>
                Yes. When you register, you can specify exactly which organs and tissues you are willing to donate.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default Home;
