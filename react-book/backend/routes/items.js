const { Router } = require('express');

const itemRoutes = Router();

itemRoutes.get('/', (req, res) => {
  setTimeout(
    () => res.json([
      {
        itemId: 'ProgFund',
        imageId: 'ProgFund',
        title: 'Programming Fundamentals',
        price: 100,
        description: 'This course is designed for beginners who want to build a strong foundation in coding. It covers essential programming concepts such as variables, data types, control flow (loops and conditionals), functions, and object-oriented programming (OOP). Learners will get hands-on experience with Python and JavaScript, two of the most popular languages in the industry. By the end of the course, students will be able to write simple programs, debug code, and understand core programming logic that applies to all languages.',
        salePrice: 49.99,
      },
      {
        itemId: 'WebDev',
        imageId: 'WebDev',
        title: 'Web Development',
        price: 150,
        description: 'It can be used to grind coffee beansThis comprehensive course covers everything needed to become a full-stack web developer. The frontend section focuses on building responsive, interactive websites using HTML, CSS, JavaScript, React, and Bootstrap. The backend section introduces Node.js, Express, REST APIs, and databases (SQL & MongoDB), teaching how to handle server-side logic, authentication, and data storage. Students will work on real-world projects, including an e-commerce site and a blog platform.',
        salePrice: 74.99,
      },
      {
        itemId: 'Dsa',
        imageId: 'Dsa',
        title: 'Data Structures and Algorithms',
        price: 89.99,
        description: 'A must-have for aspiring software engineers and competitive programmers, this course focuses on problem-solving techniques using arrays, linked lists, stacks, queues, trees, graphs, sorting & searching algorithms, dynamic programming, and recursion. Learners will practice implementing these concepts in Python, Java, and C++, preparing for technical interviews at top tech companies.',
      },
      {
        itemId: 'DevOps',
        imageId: 'DevOps',
        title: 'Cloud Computing and DevOps',
        price: 99.99,
        description: 'This course provides an introduction to cloud platforms like AWS, Microsoft Azure, and Google Cloud. Students will learn how to deploy applications in the cloud, manage virtual machines, and optimize cloud storage solutions. The DevOps section covers Docker, Kubernetes, Terraform, CI/CD pipelines (Jenkins, GitHub Actions), and Infrastructure as Code (IaC), ensuring seamless development and deployment. Ideal for those pursuing cloud architecture, system administration, or site reliability engineering (SRE).',
      },
      {
        itemId: 'CybFund',
        imageId: 'CybFund',
        title: 'Cybersecurity Fundamentals',
        price: 74.99,
        description: 'This course covers key cybersecurity concepts such as network security, ethical hacking, penetration testing, cryptography, risk management, and incident response. Students will learn how to identify vulnerabilities, perform security assessments, and protect digital systems from cyber threats. The course includes practical exercises using **Wireshark, Metasploit, Kali Linux, and SIEM tools**. Ideal for those interested in ethical hacking, information security, or cybersecurity analysis.',
      },
      {
        itemId: 'AiMach',
        imageId: 'AiMach',
        title: 'AI and Machine Learning',
        price: 124.99,
        description: 'This course dives into the fundamentals of AI, machine learning (ML), deep learning, and natural language processing (NLP). Students will learn how to build and train models using Python, TensorFlow, PyTorch, and Scikit-Learn. Topics include supervised and unsupervised learning, neural networks, reinforcement learning, and AI ethics. The course includes hands-on projects such as chatbots, recommendation systems, and image classification.',
      },
    ]),
    
    500,
  );
});

module.exports = itemRoutes;
