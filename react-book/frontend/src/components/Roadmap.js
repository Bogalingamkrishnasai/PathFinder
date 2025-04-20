import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Roadmap.css';

function CareerRoadmap() {
  const [activeCareer, setActiveCareer] = useState(null);

  const careers = [
    {
      text: 'Building user interfaces and applications',
      career: 'fullStack',
      color: '#6366F1',
      icon: '💻',
    },
    {
      text: 'Analyzing data and trends',
      career: 'businessAnalyst',
      color: '#10B981',
      icon: '📊',
    },
    {
      text: 'Working with machine learning models',
      career: 'dataScientist',
      color: '#3B82F6',
      icon: '🔬',
    },
    {
      text: 'Managing cloud infrastructure',
      career: 'cloudEngineer',
      color: '#F59E0B',
      icon: '☁️',
    },
    {
      text: 'Securing systems and networks',
      career: 'cybersecurityAnalyst',
      color: '#EF4444',
      icon: '🔒',
    },
    {
      text: 'Automating deployment processes',
      career: 'devOpsEngineer',
      color: '#8B5CF6',
      icon: '🔄',
    },
    {
      text: 'Developing intelligent systems',
      career: 'aiEngineer',
      color: '#EC4899',
      icon: '🧠',
    },
  ];

  const careerDetails = {
    fullStack: {
      title: 'Full Stack Developer',
      path: [
        'Learn HTML/CSS/JavaScript',
        'Master a frontend framework (React, Vue, Angular)',
        'Learn backend development (Node.js, Python, Ruby)',
        'Understand databases (SQL & NoSQL)',
        'Build portfolio projects',
        'Apply for junior positions',
      ],
      salary: '$75k - $120k',
    },
    businessAnalyst: {
      title: 'Business Analyst',
      path: [
        'Develop analytical skills',
        'Learn SQL and data visualization',
        'Understand business processes',
        'Gain domain knowledge',
        'Master tools like Excel, Tableau',
        'Obtain relevant certifications',
      ],
      salary: '$65k - $110k',
    },
    dataScientist: {
      title: 'Data Scientist',
      path: [
        'Learn Python/R',
        'Study statistics and linear algebra',
        'Master machine learning basics',
        'Learn data wrangling and visualization',
        'Work on Kaggle projects',
        'Build a strong portfolio',
      ],
      salary: '$90k - $150k',
    },
    cloudEngineer: {
      title: 'Cloud Engineer',
      path: [
        'Learn Linux and networking basics',
        'Understand virtualization concepts',
        'Master a cloud platform (AWS, Azure, GCP)',
        'Learn infrastructure as code (Terraform)',
        'Get cloud certifications',
        'Gain hands-on experience',
      ],
      salary: '$85k - $140k',
    },
    cybersecurityAnalyst: {
      title: 'Cybersecurity Analyst',
      path: [
        'Learn networking fundamentals',
        'Understand operating systems',
        'Study security concepts and tools',
        'Get familiar with compliance standards',
        'Obtain security certifications',
        'Participate in CTF challenges',
      ],
      salary: '$80k - $130k',
    },
    devOpsEngineer: {
      title: 'DevOps Engineer',
      path: [
        'Learn Linux and scripting',
        'Understand CI/CD pipelines',
        'Master containerization (Docker, Kubernetes)',
        'Learn monitoring and logging',
        'Understand infrastructure as code',
        'Gain cloud platform knowledge',
      ],
      salary: '$90k - $150k',
    },
    aiEngineer: {
      title: 'AI Engineer',
      path: [
        'Strong math foundation',
        'Learn Python and ML libraries',
        'Understand neural networks',
        'Study NLP/Computer Vision',
        'Work on research projects',
        'Stay updated with latest papers',
      ],
      salary: '$100k - $180k',
    },
  };

  return (
    <div className="roadmap-container">
      <h2 className="roadmap-title">Explore Your Tech Career Path</h2>
      <p className="roadmap-subtitle">Click on a career to see the roadmap</p>
      <AnimatePresence>
        {activeCareer && (
          <motion.div
            className="roadmap-details"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="detail-title">{careerDetails[activeCareer].title}</h3>
            <div className="salary-badge">
              <span>Average Salary: </span>
              <span>{careerDetails[activeCareer].salary}</span>
            </div>
            <div className="path-container">
              {careerDetails[activeCareer].path.map((step) => (
                <motion.div
                  key={`${activeCareer}-${step.substring(0, 20)}`}
                  className="path-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: careerDetails[activeCareer].path.indexOf(step) * 0.1 }}
                >
                  <div className="step-number">
                    {careerDetails[activeCareer].path.indexOf(step) + 1}
                  </div>
                  <div className="step-text">{step}</div>
                </motion.div>
              ))}
            </div>
            <motion.button
              className="close-button"
              onClick={() => setActiveCareer(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close Roadmap
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="careers-grid">
        {careers.map((item) => (
          <motion.div
            key={item.career}
            className={`career-card ${activeCareer === item.career ? 'active' : ''}`}
            onClick={() => setActiveCareer(activeCareer === item.career ? null : item.career)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: item.color }}
            layout
          >
            <div className="career-icon">{item.icon}</div>
            <motion.div className="career-text">
              {item.text}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <div className="background-elements">
        {[...Array(10)].map(() => {
          const career = careers[Math.floor(Math.random() * careers.length)];
          return (
            <motion.div
              key={`bg-${career.career}-${Math.random().toString(36).substring(7)}`}
              className="bg-circle"
              initial={{
                y: Math.random() * 100,
                x: Math.random() * 100,
                opacity: 0.2,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * 50 - 25],
                x: [null, Math.random() * 50 - 25],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              style={{
                backgroundColor: career.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CareerRoadmap;
