// src/components/Dashboard.js
import React , { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // 添加导航钩子

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout Fail:', error);
      alert('Logout Fail, Please try again');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3">Welcom，{user?.email}</Typography>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleLogout}
        disabled={isLoggingOut}
        style={{ marginTop: '2rem' }}
      >
        {isLoggingOut ? 'Still Logout...' : 'Logout'}
      </Button>
    </Container>
  );
};

export default Dashboard;