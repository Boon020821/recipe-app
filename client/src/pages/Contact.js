// src/pages/Contact.js
import React from 'react';
import { 
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Link,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Container maxWidth="xl" className="contact-container">
      <Grid container spacing={6}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" gutterBottom className="section-title">
              Get in Touch
            </Typography>
            
            <form className="contact-form">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={6}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </motion.div>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          <Box className="contact-info-card">
            <Typography variant="h3" gutterBottom className="info-title">
              Contact Information
            </Typography>

            <div className="info-item">
              <LocationOn className="info-icon" />
              <div>
                <Typography variant="h6">Headquarters</Typography>
                <Typography>
                  123 Foodie Street<br/>
                  Culinary City, CA 98765<br/>
                  United States
                </Typography>
              </div>
            </div>

            <div className="info-item">
              <Phone className="info-icon" />
              <div>
                <Typography variant="h6">Phone</Typography>
                <Typography>
                  +1 (555) 123-4567<br/>
                  Mon-Fri: 9am - 5pm PST
                </Typography>
              </div>
            </div>

            <div className="info-item">
              <Email className="info-icon" />
              <div>
                <Typography variant="h6">Email</Typography>
                <Link href="mailto:contact@flavorjourney.com">
                  contact@flavorjourney.com
                </Link>
              </div>
            </div>

            <div className="social-links">
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
          </Box>
        </Grid>
      </Grid>

      {/* Embedded Map */}
      {!isMobile && (
        <Box className="map-container">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52860.78632670272!2d-118.45636952167968!3d34.08375000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6f149cf%3A0x4408978d7476f257!2sBeverly%20Hills%2C%20CA%2090210%2C%20USA!5e0!3m2!1sen!2sca!4v1689876448103!5m2!1sen!2sca"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Box>
      )}
    </Container>
  );
};

export default Contact;