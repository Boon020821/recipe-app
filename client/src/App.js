// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './ErrorBoundary';

import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Category from './pages/Categories.js';
import RecipeDetail from './pages/RecipeDetail.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';


// 创建独立的路由组件
const AppRoutes = () => {
  const { user } = useAuth(); // 正确在 AuthProvider 的子组件中使用

  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        

        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
      <BottomNav />
    </Router>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;