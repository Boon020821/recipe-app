// src/components/Nav.js
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Link } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  return (
    <>
    {/* 底部导航栏 */}
    <footer className="bottom-container">
      {/* 浅紫色区域 */}
      <div className="bottom-nav">
        <div className="nav-left">
          <div className="logo-section">
            <img src="/images/logo.png" alt="Logo" className="footer-logo" />
          </div>
          
          <div className="social-section">
            <p>Follow Us:</p>
            <div className='bottom-social'>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="social-icon" />
              </a>
              <a href="https://weibo.com" target="_blank" rel="noopener noreferrer">
                <PinterestIcon className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-column">
          <Link to="/">HOME</Link>
          <Link to="/categories">CATEGORY</Link>
          <Link to="/ingredients">INGREDIENT</Link>
          </div>
          <div className="nav-column">
            <a href="/budget">Budget</a>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="nav-column">
            <a href="/mobile">Mobile</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
        
      </div>

      {/* 白色区域 */}
      <div className="copyright-section">
        <p>© {new Date().getFullYear()} Recipe. All Rights Reserved</p>
      </div>
    </footer>
    </>
  );
};

export default BottomNav;