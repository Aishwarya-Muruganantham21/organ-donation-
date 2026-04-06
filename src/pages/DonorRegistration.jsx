/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { registerDonor, getDonorByUserId, updateDonor } from '../utils/mockDb';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const DonorRegistration = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [existingId, setExistingId] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    age: '',
    gender: '',
    bloodGroup: '',
    organs: {
      Heart: false,
      Kidney: false,
      Liver: false,
      Lungs: false,
      Pancreas: false,
      Eyes: false,
      Tissue: false
    },
    medicalConditions: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (currentUser) {
      const donorData = getDonorByUserId(currentUser.id);
      if (donorData) {
        setExistingId(donorData.id);
        const parsedOrgans = typeof donorData.organs === 'string' ? JSON.parse(donorData.organs) : donorData.organs;
        setFormData({
          fullName: donorData.fullName,
          age: donorData.age,
          gender: donorData.gender,
          bloodGroup: donorData.bloodGroup,
          organs: parsedOrgans,
          medicalConditions: donorData.medicalConditions || ''
        });
      }
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      organs: { ...formData.organs, [e.target.name]: e.target.checked }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const dataToSave = {
        userId: currentUser.id,
        userEmail: currentUser.email, // save email for easy admin table access
        ...formData,
        organs: JSON.stringify(formData.organs) // Save as JSON string or object
      };

      if (existingId) {
        updateDonor(existingId, dataToSave);
        setMessage({ type: 'success', text: 'Donor registration updated successfully.' });
      } else {
        const newD = registerDonor(dataToSave);
        setExistingId(newD.id);
        setMessage({ type: 'success', text: 'Thank you for registering as a donor. Your information is saved.' });
      }
      
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setMessage({ type: 'danger', text: err.message || 'An error occurred' });
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="glass-card p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <FileText color="#21b2a6" size={48} className="mb-2" />
                <h2 className="fw-bold">{existingId ? 'Update Registration' : 'Donor Registration'}</h2>
                <p className="text-muted">Fill out the details to pledge your organs.</p>
              </div>

              {message.text && <Alert variant={message.type}>{message.text}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" value={formData.fullName} required onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control type="number" name="age" value={formData.age} required onChange={handleInputChange} min="18" max="100" />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select name="gender" value={formData.gender} required onChange={handleInputChange}>
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-4">
                      <Form.Label>Blood Group (Optional)</Form.Label>
                      <Form.Select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                        <option value="">Select Blood Group...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="fw-bold mb-3 border-bottom pb-2">Organs you are willing to donate:</h5>
                <Row className="mb-4">
                  {Object.keys(formData.organs).map((organ) => (
                    <Col md={4} key={organ}>
                      <Form.Check 
                        type="checkbox"
                        id={`organ-${organ}`}
                        label={organ}
                        name={organ}
                        checked={formData.organs[organ]}
                        onChange={handleCheckboxChange}
                        className="mb-2"
                      />
                    </Col>
                  ))}
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Medical Conditions (Optional)</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="medicalConditions" 
                    value={formData.medicalConditions}
                    placeholder="List any major medical history, e.g., diabetes, hypertension..."
                    onChange={handleInputChange} 
                  />
                </Form.Group>

                <Button type="submit" className="w-100 btn-primary-custom btn-lg">
                  {existingId ? 'Update Details' : 'Submit Registration'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DonorRegistration;
