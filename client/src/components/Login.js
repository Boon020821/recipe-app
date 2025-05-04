import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Grid, Link, Typography, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 邮箱密码登录
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // Google登录
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleEmailLogin}>
        <TextField
          fullWidth
          label="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button 
          fullWidth 
          type="submit" 
          variant="contained" 
          color="primary"
          style={{ marginTop: '1rem' }}
        >
          login
        </Button>
      </form>

      <Divider style={{ margin: '2rem 0' }}>or</Divider>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
      >
        Google Account
      </Button>

      <Grid container justifyContent="flex-end" style={{ marginTop: '1rem' }}>
        <Grid item>
          <Link href="/register" variant="body2">
            not account? please register first
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;