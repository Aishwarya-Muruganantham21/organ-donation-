/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { getDonors, deleteDonor, getUsers } from '../utils/mockDb';
import { Trash2, Search, Users, TrendingUp } from 'lucide-react'; // Wait, HeartPulse in lucide map usually Heart, Activity etc. Let's stick to simple ones.
// Used Heart heartbeat might not exist so fallback to Heart 

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrgan, setFilterOrgan] = useState('');

  const loadData = () => {
    const allDonors = getDonors().map(d => {
      d.organsObj = typeof d.organs === 'string' ? JSON.parse(d.organs) : d.organs;
      return d;
    });
    setDonors(allDonors);
    setUsersCount(getUsers().length);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this donor record?')) {
      deleteDonor(id);
      loadData();
    }
  };

  const filteredDonors = donors.filter(d => {
    const matchSearch = d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      (d.bloodGroup && d.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by organ
    if (filterOrgan) {
      if (!d.organsObj[filterOrgan]) return false;
    }
    
    return matchSearch;
  });

  return (
    <Container fluid className="px-5 my-5">
      <div className="mb-4">
        <h2>Admin Dashboard</h2>
        <p className="text-muted">Manage system users and donor records.</p>
      </div>

      {/* KPI Cards */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="glass-card border-0 h-100 p-3 dashboard-stats-card">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                <Users size={32} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total Users</h6>
                <h3 className="mb-0 fw-bold">{usersCount}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="glass-card border-0 h-100 p-3 dashboard-stats-card" style={{borderLeftColor: 'var(--secondary-color)'}}>
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                <TrendingUp size={32} />
              </div>
              <div>
                <h6 className="text-muted mb-1">Registered Donors</h6>
                <h3 className="mb-0 fw-bold">{donors.length}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Donors Table Area */}
      <Card className="glass-card border-0 p-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <h4 className="mb-0">Donor Directory</h4>
            
            <div className="d-flex gap-3">
              <InputGroup style={{ maxWidth: '300px' }}>
                <InputGroup.Text className="bg-white"><Search size={18} className="text-muted" /></InputGroup.Text>
                <Form.Control 
                  placeholder="Search name or blood group..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <Form.Select style={{ width: '200px' }} value={filterOrgan} onChange={e => setFilterOrgan(e.target.value)}>
                <option value="">All Organs</option>
                <option value="Heart">Heart</option>
                <option value="Kidney">Kidney</option>
                <option value="Liver">Liver</option>
                <option value="Eyes">Eyes</option>
                <option value="Lungs">Lungs</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="table-custom align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age / Gender</th>
                  <th>Blood Group</th>
                  <th>Pledged Organs</th>
                  <th>Contact Email</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.length > 0 ? (
                  filteredDonors.map(donor => (
                    <tr key={donor.id} className="bg-white">
                      <td className="fw-bold">{donor.fullName}</td>
                      <td>{donor.age} ({donor.gender})</td>
                      <td>
                        {donor.bloodGroup ? (
                          <Badge bg="danger">{donor.bloodGroup}</Badge>
                        ) : (
                          <span className="text-muted small">N/A</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {Object.keys(donor.organsObj).map(organ => 
                            donor.organsObj[organ] && (
                              <Badge key={organ} bg="info" className="text-dark bg-opacity-25" style={{border: '1px solid #17a2b8'}}>
                                {organ}
                              </Badge>
                            )
                          )}
                        </div>
                      </td>
                      <td>{donor.userEmail}</td>
                      <td className="text-end">
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(donor.id)}>
                          <Trash2 size={16} /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No donor records found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
