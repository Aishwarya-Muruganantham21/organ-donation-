// Mock Database utilities using localStorage
import { v4 as uuidv4 } from 'uuid';

const USERS_KEY = 'organ_app_users';
const DONORS_KEY = 'organ_app_donors';

// Initialize with admin account if empty
export const initDb = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    const defaultAdmin = [{
      id: uuidv4(),
      name: 'Admin User',
      email: 'admin@organdonation.com',
      phone: '0000000000',
      password: 'password123',
      role: 'admin'
    }];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultAdmin));
  }
  
  if (!localStorage.getItem(DONORS_KEY)) {
    localStorage.setItem(DONORS_KEY, JSON.stringify([]));
  }
};

// --- Users API ---
export const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];

export const registerUser = (userData) => {
  const users = getUsers();
  // Check if email exists
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already registered');
  }
  
  const newUser = {
    id: uuidv4(),
    ...userData,
    role: 'user', // Default role
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  return user;
};

// --- Donors API ---
export const getDonors = () => JSON.parse(localStorage.getItem(DONORS_KEY)) || [];

export const registerDonor = (donorData) => {
  const donors = getDonors();
  const newDonor = {
    id: uuidv4(),
    registrationDate: new Date().toISOString(),
    ...donorData
  };
  donors.push(newDonor);
  localStorage.setItem(DONORS_KEY, JSON.stringify(donors));
  return newDonor;
};

export const updateDonor = (id, updatedData) => {
  const donors = getDonors();
  const index = donors.findIndex(d => d.id === id);
  if (index !== -1) {
    donors[index] = { ...donors[index], ...updatedData };
    localStorage.setItem(DONORS_KEY, JSON.stringify(donors));
    return donors[index];
  }
  throw new Error('Donor not found');
};

export const deleteDonor = (id) => {
  let donors = getDonors();
  donors = donors.filter(d => d.id !== id);
  localStorage.setItem(DONORS_KEY, JSON.stringify(donors));
};

export const getDonorByUserId = (userId) => {
  return getDonors().find(d => d.userId === userId) || null;
};
