// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextField, Button, Grid, Link, Typography } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 修复：将事件处理逻辑包裹在函数中
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('邮箱和密码不能为空');
      return;
    }
    if (password.length < 6) {
      setError('密码至少需要6位');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // 注册成功后导航
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>注册新账号</Typography>
      
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}> {/* 正确绑定提交事件 */}
        <TextField
          fullWidth
          label="邮箱"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="密码（至少6位）"
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
          注册
        </Button>
      </form>

      <Grid container justifyContent="flex-end" style={{ marginTop: '1rem' }}>
        <Grid item>
          <Link href="/login" variant="body2">
            已有账号？立即登录
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;