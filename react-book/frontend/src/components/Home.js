import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import './Home.css';
import ItemType from '../types/item';

function Home({ items }) {
  const navigate = useNavigate();

  return (
    <div className="home-content">
      <div className="welcome-banner">
        <h1 className="welcome-message">Welcome to Pathfinder</h1>
        <h2 className="welcome-subtitle">Empowering Your Professional Journey</h2>
        <Link to="/Quiz" className="cta-button">
          Start Career Assessment →
        </Link>
      </div>

      <div className="courses-section">
        <h2 className="section-title">Featured Courses</h2>
        <div className="home-component">
          {items.map((item) => (
            <Thumbnail
              key={item.itemId}
              itemId={item.itemId}
              image={itemImages[item.imageId]}
              title={item.title}
              shortDescription={item.shortDescription}
            />
          ))}
        </div>
      </div>

      <div className="appointment-section">
        <h2 className="section-title">Mentorship Sessions</h2>
        <div className="appointment-links">
          <div className="appointment-actions">
            <a href="/schedule-appointment" className="appointment-link">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
              Schedule Appointment
            </a>
            <a href="/manage-appointment" className="appointment-link">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
              </svg>
              Manage Appointments
            </a>
          </div>
        </div>
      </div>

      <div className="roadmap-section">
        <h2 className="section-title">Career Path Exploration</h2>
        <button
          type="button"
          className="roadmap-btn"
          onClick={() => navigate('/Roadmap')}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          View Career Roadmaps
        </button>
      </div>

      <div className="job-sites-section">
        <h2 className="section-title">Job Search Resources</h2>
        <div className="job-sites-grid">
          <a href="https://www.linkedin.com/jobs" target="_blank" rel="noopener noreferrer" className="job-site-card">
            <div className="job-site-logo">
              <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" alt="LinkedIn" width="120" />
            </div>
            <p>Professional networking and job opportunities</p>
          </a>
          <a href="https://www.indeed.com" target="_blank" rel="noopener noreferrer" className="job-site-card">
            <div className="job-site-logo">
              <img src="https://1000logos.net/wp-content/uploads/2023/01/Indeed-logo.png" alt="Indeed" width="120" />
            </div>
            <p>Millions of jobs from all over the web</p>
          </a>
          <a href="https://www.glassdoor.com" target="_blank" rel="noopener noreferrer" className="job-site-card">
            <div className="job-site-logo">
              <img src="https://1000logos.net/wp-content/uploads/2023/07/glassdoor-logo.webp" alt="Glassdoor" width="120" />
            </div>
            <p>Jobs with company reviews and salaries</p>
          </a>
          <a href="https://www.monster.com" target="_blank" rel="noopener noreferrer" className="job-site-card">
            <div className="job-site-logo">
              <img src="https://1000logos.net/wp-content/uploads/2024/04/Monster-Logo.png" alt="Monster" width="120" />
            </div>
            <p>Find jobs and career resources</p>
          </a>
          <a href="https://www.careerbuilder.com" target="_blank" rel="noopener noreferrer" className="job-site-card">
            <div className="job-site-logo">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/CareerBuilder_Logo.svg/2560px-CareerBuilder_Logo.svg.png" alt="CareerBuilder" width="120" />
            </div>
            <p>Job search and recruitment platform</p>
          </a>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Home;
