import React, { useState } from 'react';
import './Quiz.css';

function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({
    fullStack: 0,
    businessAnalyst: 0,
    dataScientist: 0,
    cloudEngineer: 0,
    cybersecurityAnalyst: 0,
    devOpsEngineer: 0,
    aiEngineer: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: 'What do you enjoy most?',
      options: [
        { text: 'Building user interfaces and applications', career: 'fullStack' },
        { text: 'Analyzing data and trends', career: 'businessAnalyst' },
        { text: 'Working with machine learning models', career: 'dataScientist' },
        { text: 'Managing cloud infrastructure', career: 'cloudEngineer' },
        { text: 'Securing systems and networks', career: 'cybersecurityAnalyst' },
        { text: 'Automating deployment processes', career: 'devOpsEngineer' },
        { text: 'Developing intelligent systems', career: 'aiEngineer' },
      ],
    },
    {
      question: 'What is your preferred work environment?',
      options: [
        { text: 'Collaborative team projects', career: 'fullStack' },
        { text: 'Working with stakeholders to solve problems', career: 'businessAnalyst' },
        { text: 'Research and development labs', career: 'dataScientist' },
        { text: 'Cloud platforms and services', career: 'cloudEngineer' },
        { text: 'Security operations centers', career: 'cybersecurityAnalyst' },
        { text: 'Continuous integration/continuous deployment pipelines', career: 'devOpsEngineer' },
        { text: 'AI research labs', career: 'aiEngineer' },
      ],
    },
    {
      question: 'Which skill do you excel at?',
      options: [
        { text: 'Frontend and backend development', career: 'fullStack' },
        { text: 'Data analysis and visualization', career: 'businessAnalyst' },
        { text: 'Statistics and programming', career: 'dataScientist' },
        { text: 'Cloud computing and virtualization', career: 'cloudEngineer' },
        { text: 'Network security and encryption', career: 'cybersecurityAnalyst' },
        { text: 'Scripting and automation', career: 'devOpsEngineer' },
        { text: 'Machine learning and neural networks', career: 'aiEngineer' },
      ],
    },
    {
      question: 'What type of projects excite you?',
      options: [
        { text: 'Building web applications', career: 'fullStack' },
        { text: 'Optimizing business processes', career: 'businessAnalyst' },
        { text: 'Predictive modeling and data analysis', career: 'dataScientist' },
        { text: 'Migrating systems to the cloud', career: 'cloudEngineer' },
        { text: 'Penetration testing and vulnerability assessment', career: 'cybersecurityAnalyst' },
        { text: 'Setting up CI/CD pipelines', career: 'devOpsEngineer' },
        { text: 'Creating AI-powered applications', career: 'aiEngineer' },
      ],
    },
    {
      question: 'What tools do you prefer working with?',
      options: [
        { text: 'React, Node.js, and databases', career: 'fullStack' },
        { text: 'Excel, Tableau, and SQL', career: 'businessAnalyst' },
        { text: 'Python, R, and TensorFlow', career: 'dataScientist' },
        { text: 'AWS, Azure, and Kubernetes', career: 'cloudEngineer' },
        { text: 'Firewalls, SIEM tools, and encryption software', career: 'cybersecurityAnalyst' },
        { text: 'Docker, Jenkins, and Terraform', career: 'devOpsEngineer' },
        { text: 'PyTorch, OpenAI, and NLP tools', career: 'aiEngineer' },
      ],
    },
    {
      question: 'How do you approach problem-solving?',
      options: [
        { text: 'By building scalable solutions', career: 'fullStack' },
        { text: 'By analyzing data and making recommendations', career: 'businessAnalyst' },
        { text: 'By applying statistical models', career: 'dataScientist' },
        { text: 'By leveraging cloud resources', career: 'cloudEngineer' },
        { text: 'By identifying and mitigating risks', career: 'cybersecurityAnalyst' },
        { text: 'By automating repetitive tasks', career: 'devOpsEngineer' },
        { text: 'By designing intelligent algorithms', career: 'aiEngineer' },
      ],
    },
    {
      question: 'What is your favorite part of the development lifecycle?',
      options: [
        { text: 'Designing user interfaces', career: 'fullStack' },
        { text: 'Gathering and analyzing requirements', career: 'businessAnalyst' },
        { text: 'Training and testing models', career: 'dataScientist' },
        { text: 'Deploying and scaling applications', career: 'cloudEngineer' },
        { text: 'Identifying and fixing vulnerabilities', career: 'cybersecurityAnalyst' },
        { text: 'Automating deployment pipelines', career: 'devOpsEngineer' },
        { text: 'Building AI models', career: 'aiEngineer' },
      ],
    },
    {
      question: 'What is your preferred programming language?',
      options: [
        { text: 'JavaScript', career: 'fullStack' },
        { text: 'SQL', career: 'businessAnalyst' },
        { text: 'Python', career: 'dataScientist' },
        { text: 'Go or Java', career: 'cloudEngineer' },
        { text: 'Bash or PowerShell', career: 'cybersecurityAnalyst' },
        { text: 'Python or Ruby', career: 'devOpsEngineer' },
        { text: 'Python or R', career: 'aiEngineer' },
      ],
    },
    {
      question: 'What is your ideal workday like?',
      options: [
        { text: 'Coding and debugging applications', career: 'fullStack' },
        { text: 'Meeting with stakeholders and analyzing data', career: 'businessAnalyst' },
        { text: 'Experimenting with datasets and models', career: 'dataScientist' },
        { text: 'Configuring cloud services', career: 'cloudEngineer' },
        { text: 'Monitoring and securing networks', career: 'cybersecurityAnalyst' },
        { text: 'Automating workflows', career: 'devOpsEngineer' },
        { text: 'Researching and implementing AI solutions', career: 'aiEngineer' },
      ],
    },
    {
      question: 'What motivates you the most?',
      options: [
        { text: 'Building user-friendly applications', career: 'fullStack' },
        { text: 'Driving business decisions with data', career: 'businessAnalyst' },
        { text: 'Solving complex problems with data', career: 'dataScientist' },
        { text: 'Optimizing cloud infrastructure', career: 'cloudEngineer' },
        { text: 'Protecting systems from threats', career: 'cybersecurityAnalyst' },
        { text: 'Streamlining development processes', career: 'devOpsEngineer' },
        { text: 'Creating intelligent systems', career: 'aiEngineer' },
      ],
    },
  ];

  const handleAnswer = (career) => {
    setScore((prevScore) => ({
      ...prevScore,
      [career]: prevScore[career] + 1,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getCareerRecommendation = () => {
    const careerScores = Object.entries(score);
    const recommendedCareer = careerScores.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
    return recommendedCareer
      .split(/(?=[A-Z])/)
      .join(' ')
      .toUpperCase();
  };

  return (
    <div className="career-quiz">
      {showResult ? (
        <div className="result">
          <h2>Your Recommended Career:</h2>
          <h1>{getCareerRecommendation()}</h1>
          <button type="button" onClick={() => window.location.reload()}>
            Retake Quiz
          </button>
          <button type="button" className="home-button" onClick={() => { window.location.href = '/'; }}>
            Home
          </button>
        </div>
      ) : (
        <div className="question-container">
          <h2>
            Question
            {' '}
            {currentQuestion + 1}
          </h2>
          <p>{questions[currentQuestion].question}</p>
          <div className="options">
            {questions[currentQuestion].options.map((option) => (
              <button
                type="button"
                key={option.career}
                onClick={() => handleAnswer(option.career)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerQuiz;
