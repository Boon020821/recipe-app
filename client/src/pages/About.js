// src/pages/About.js
import React from 'react';
import { Container, Typography, Grid, Avatar, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import './About.css';

// Team member data
const teamMembers = [
  {
    name: 'Michael Chen',
    role: 'Executive Chef & Founder',
    bio: '15 years of international culinary experience, formerly worked at Michelin 3-star restaurants, specializes in East-West fusion cuisine',
    img: '/images/team/chef.jpg'
  },
  {
    name: 'Sarah Li',
    role: 'Lead Nutritionist',
    bio: 'Registered dietitian focused on healthy meal planning and scientific dietary solutions',
    img: '/images/team/nutritionist.jpg'
  },
  {
    name: 'David Wang',
    role: 'CTO',
    bio: 'Full-stack developer and food tech innovator, leads platform architecture development',
    img: '/images/team/developer.jpg'
  }
];

const About = () => {
  return (
    <Container maxWidth="lg" className="about-container">
      {/* Header */}
      <Typography variant="h2" gutterBottom className="section-title">
        About Recipe
      </Typography>

      {/* Mission Statement */}
      <Paper elevation={3} className="mission-section">
        <Typography variant="h5" component="blockquote">
          {"Bringing cooking back to its essence, connecting people through food"}
        </Typography>
        <Typography variant="body1">
          {"Since 2015, we've been committed to breaking down barriers between professional kitchens and home cooking."} 
          {"Our recipe analysis system transforms complex culinary techniques into approachable steps for everyone."}
        </Typography>
      </Paper>

      {/* Core Values */}
      <div className="values-section">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className="value-card">
              <div className="value-icon">🍳</div>
              <Typography variant="h6">Smart Adaptation</Typography>
              <Typography>Recipe recommendations based on kitchen tools, ingredients, and time</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="value-card">
              <div className="value-icon">📊</div>
              <Typography variant="h6">Scientific Analysis</Typography>
              <Typography>Detailed nutritional data and allergen information for every recipe</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <Typography variant="h6">Cultural Heritage</Typography>
              <Typography>Preserving traditional recipes from 23 countries</Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Team Section */}
      <Typography variant="h4" className="section-title">
        Leadership Team
      </Typography>
      <Grid container spacing={6} className="team-section">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} className="member-card">
              <Avatar
                alt={member.name}
                src={member.img}
                sx={{ width: 200, height: 200, margin: '0 auto' }}
              />
              <Typography variant="h6" className="member-name">
                {member.name}
              </Typography>
              <Typography color="textSecondary">{member.role}</Typography>
              <Typography variant="body2" className="member-bio">
                {member.bio}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Milestones */}
      <Typography variant="h4" className="section-title">
        Our Journey
      </Typography>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-date">Aug 2015</div>
          <div className="timeline-content">
            <h3>Project Launch</h3>
            <p>Initial beta version with 200 basic recipes</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">Mar 2018</div>
          <div className="timeline-content">
            <h3>Mobile Launch</h3>
            <p>50K+ downloads in first week across iOS/Android</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-date">Jan 2023</div>
          <div className="timeline-content">
            <h3>AI Kitchen Assistant</h3>
            <p>Integrated voice-guided cooking and real-time analysis</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <Link to="/contact" className="contact-link">
          Join Our Food Community →
        </Link>
      </div>
    </Container>
  );
};

export default About;