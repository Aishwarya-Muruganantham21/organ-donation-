/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { getDonorByUserId } from '../utils/mockDb';
import { Link } from 'react-router-dom';
import { User, Activity, Edit3, HeartPulse } from 'lucide-react';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [donorData, setDonorData] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const data = getDonorByUserId(currentUser.id);
      if (data) {
        data.organs = typeof data.organs === 'string' ? JSON.parse(data.organs) : data.organs;
        setDonorData(data);
      }
    }
  }, [currentUser]);

  return (
    <Container className="my-5">
      <div className="mb-4">
        <h2>My Dashboard</h2>
        <p className="text-muted">Manage your profile and donor registration details.</p>
      </div>

      <Row className="g-4">
        {/* Profile Info */}
        <Col md={4}>
          <Card className="glass-card h-100 p-3 text-center border-0">
            <Card.Body>
              <div className="mb-4 rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto" style={{width: '100px', height: '100px'}}>
                <User size={48} className="text-secondary" />
              </div>
              <h4>{currentUser?.name}</h4>
              <p className="text-muted mb-1">{currentUser?.email}</p>
              <p className="text-muted mb-4">{currentUser?.phone}</p>
              <Badge bg="primary" className="p-2 fs-6 mb-3">Registered User</Badge>
            </Card.Body>
          </Card>
        </Col>

        {/* Donor Status */}
        <Col md={8}>
          <Card className="glass-card h-100 p-3 border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <Activity size={28} className="text-danger" />
                  <h4 className="mb-0">Donor Status</h4>
                </div>
                {donorData && (
                  <Link to="/register-donor" className="btn btn-outline-primary btn-sm">
                    <Edit3 size={16} className="me-1" /> Edit Details
                  </Link>
                )}
              </div>

              {donorData ? (
                <div>
                  <Alert variant="success" className="mb-4">
                    <h5 className="alert-heading">You are a registered organ donor!</h5>
                    <p className="mb-0">Thank you for your life-saving pledge. Your details are securely recorded.</p>
                  </Alert>

                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold text-muted">Full Name</Col>
                    <Col sm={8}>{donorData.fullName}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold text-muted">Age / Gender</Col>
                    <Col sm={8}>{donorData.age} / {donorData.gender}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={4} className="fw-bold text-muted">Blood Group</Col>
                    <Col sm={8}>{donorData.bloodGroup || 'Not specified'}</Col>
                  </Row>
                  
                  <div className="mt-4">
                    <h5 className="fw-bold fs-6 text-muted mb-3">Pledged Organs:</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {Object.keys(donorData.organs).map((organ) => 
                        donorData.organs[organ] ? (
                          <Badge key={organ} bg="danger" pill className="p-2 px-3 fw-normal">
                            {organ}
                          </Badge>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-5">
                  <HeartPulse size={48} className="text-secondary mb-3 opacity-50" />
                  <h5>You have not registered as a donor yet.</h5>
                  <p className="text-muted mb-4">You have the power to save lives. Take a step and pledge your organs.</p>
                  <Link to="/register-donor" className="btn btn-primary-custom">
                    Register as Donor Now
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
