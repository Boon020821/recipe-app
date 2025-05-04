// src/components/TopNav.js
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import './TopNav.css';

const TopNav = () => {
    return (
        <>
    <nav className="top-nav">
      {/* Logo */}
      <img 
        src="/images/logo.png"
        alt="App Logo"
        className="nav-logo"
      />

      {/* 社交媒体 */}
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FacebookIcon 
                className="social-icon"
                style={{
                fontSize: '3.5rem',
                color: '#333',
                transition: 'all 0.3s ease'
                }}
            />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon 
                className="social-icon"
                style={{
                fontSize: '3.5rem',
                color: '#333',
                transition: 'all 0.3s ease'
                }}
            />
        </a>
        <a href="https://weibo.com" target="_blank" rel="noopener noreferrer">
            <PinterestIcon 
                className="social-icon"
                style={{
                fontSize: '3.5rem',
                color: '#333',
                transition: 'all 0.3s ease'
                }}
            />
        </a>
      </div>

      {/* 用户系统 */}
      <div className="user-section">
        <Link to="/profile" aria-label="用户资料">
            <AccountCircleIcon 
                className="profile-icon"
                style={{
                fontSize: '2.5rem',
                color: '#333',
                transition: 'all 0.3s ease'
                }}
            />
        </Link>
        <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
      </div>

      {/* 更多食材图片 */}
      <div className="ingredient-strip">
        <img src="/images/crab.png" alt="Crab" />
        <img src="/images/garlic.png" alt="Garlic" />
        <img src="/images/soy_sauce.png" alt="Soy-sauce" />
        <img src="/images/leg.png" alt="Chicken" />
        <img src="/images/rice.png" alt="Rice" />
        <img src="/images/carrot.png" alt="Carrot" />
        <img src="/images/meat.png" alt="Meat" />
        <img src="/images/sandwich.png" alt="Sandwich" />
        <img src="/images/tomato.png" alt="Tomato" />
        <img src="/images/noodle.png" alt="Noodle" />
        <img src="/images/fish.png" alt="Fish" />
        <img src="/images/cabbage.png" alt="Cabbage" />
        <img src="/images/vegetable.png" alt="Vegetable" />
        <img src="/images/hotpot.png" alt="Hotpot" />
        <img src="/images/shrimp.png" alt="Shrimp" />
        <img src="/images/eggplant.png" alt="Eggplant" />
        <img src="/images/egg.png" alt="Egg" />
        <img src="/images/chilli.png" alt="Chilli" />
        <img src="/images/cheese.png" alt="Cheese" />
        <img src="/images/carob.png" alt="Carob" />
        <img src="/images/bitter_gourd.png" alt="Bitter guard" />
        <img src="/images/dessert.png" alt="Dessert" />
        <img src="/images/drinks.png" alt="Drinks" />
        <img src="/images/mushroom.png" alt="Mushroom" />
        <img src="/images/pork.png" alt="Pork" />
      </div>
      
      {/* src/components/Nav.js 新增部分 */}
      <div className="main-navigation">
        <div className="nav-links">
          <div className="nav-item">
          <Link to="/">HOME</Link>
          </div>
          <div className="nav-item">
          <Link to="/categories">CATEGORY</Link>
          </div>
          <div className="nav-item">
          <Link to="/ingredients">INGREDIENT</Link>
          </div>
          <div className="nav-item">
            <a href="/budget">BUDGET</a>
          </div>
          <div className="nav-item">
          <Link to="/about">About Us</Link>
          </div>
        </div>
      </div>
    </nav>
    
    </>
  );
};

export default TopNav;