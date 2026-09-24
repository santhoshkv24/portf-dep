import { ResumeData } from '../types/portfolio';

export const resumeData: ResumeData = {
  name: 'K V SANTHOSH',
  title: 'Software Engineer / Systems & Applied AI',
  tagline: 'Specializing in backend architectures, autonomous AI agents, and enterprise full-stack systems.',
  location: 'Chennai, India',
  email: 'santhoshvedakrishnan@gmail.com',
  phone: '+91-9361888416',
  linkedin: 'linkedin.com/in/santhosh-vedakrishnan',
  linkedinUrl: 'https://www.linkedin.com/in/santhosh-vedakrishnan/',
  github: 'github.com/santhoshkv24',
  githubUrl: 'https://github.com/santhoshkv24',
  profileSummary:
    'Computer Science Engineering student specializing in AI & ML, with experience building full-stack enterprise applications and AI-powered developer solutions. Interested in software engineering, backend systems, AI agents, intelligent applications, and solving complex problems through clean system design. Currently pursuing a B.Tech in Computer Science Engineering (AI & ML) with a Minor in Marketing at SRM University AP with a CGPA of 9.29/10.',
  experience: [
    {
      id: 'bny-mellon',
      company: 'Bank of New York Mellon (BNY)',
      role: 'SDE Intern',
      period: 'Jun 2026 – Aug 2026',
      location: 'Chennai, Tamil Nadu',
      highlights: [
        "Built a chat agent on BNY's internal Eliza platform that converts natural language queries into GraphQL requests and retrieves data through the internal Query Service of the Custody platform.",
        "Built a dashboard agent that interprets broad user queries and dynamically generates dashboards with relevant cards, charts, and other visualizations based on user intent.",
        "Worked with Python-based serverless functions and LLM API's that connect the agents with internal Custody services, handle query execution, and control the flow of requests.",
      ],
      technologies: ['Python', 'Serverless', 'LLMs', 'AI Agents', 'GraphQL', 'Prompt Engineering'],
    },
    {
      id: 'c2c-advanced-systems',
      company: 'C2C Advanced Systems Chennai Ltd.',
      role: 'Web Developer Intern',
      period: 'May 2025 – Jul 2025',
      location: 'Chennai, Tamil Nadu',
      highlights: [
        'Built Organica Ops, a full-stack enterprise collaboration platform using React, Node.js, Express, and MySQL for project tracking, task management, meetings, and reporting.',
        'Implemented a 5-role RBAC system for Admin, Manager, Team Lead, Employee, and Customer using JWT authentication and role-based API access.',
        'Developed 8+ backend modules with RESTful APIs, MySQL stored procedures, file uploads using Multer, and automated meeting invites and task notifications using Nodemailer.',
      ],
      technologies: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'REST APIs', 'Multer', 'Nodemailer'],
    },
  ],
  education: [
    {
      institution: 'SRM University AP',
      degree: 'B.Tech — Computer Science Engineering (AI & ML)',
      period: 'Jul 2023 – May 2027 (Expected)',
      location: 'Guntur, Andhra Pradesh',
      cgpa: '9.29/10',
      field: 'Minor in Marketing',
      details: 'B.Tech CSE (AI & ML), Minor in Marketing | CGPA: 9.29/10',
    },
    {
      institution: 'Kendriya Vidyalaya HVF, Avadi',
      degree: '12th CBSE — Science Stream',
      period: 'Mar 2023',
      location: 'Chennai, Tamil Nadu',
      score: '87%',
      details: 'Senior Secondary Education (CBSE) | 87%',
    },
    {
      institution: 'Kendriya Vidyalaya HVF, Avadi',
      degree: '10th CBSE',
      period: 'Mar 2021',
      location: 'Chennai, Tamil Nadu',
      score: '91.4%',
      details: 'Secondary School Examination (CBSE) | 91.4%',
    },
  ],
  certifications: [
    {
      title: 'Oracle Certified Professional: Java SE 17 Developer',
      issuer: 'Oracle',
      link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=6AD92DA59CA02AD98CAC83F45AF902B0F741B4FB76B346560946DB2372F71CF3',
    },
    {
      title: 'MongoDB Certified Associate Developer',
      issuer: 'MongoDB',
      link: 'https://www.credly.com/badges/635addc7-e5bc-46e4-8161-23c823e52f7c/linked_in_profile',
    },
    {
      title: 'SAP Certified: SAP Generative AI Developer',
      issuer: 'SAP',
      link: 'https://www.credly.com/badges/af4e43e0-196b-42de-980e-8c63033d9cb8/linked_in_profile',
    },
  ],
  skills: [
    {
      category: 'Languages',
      skills: ['Java', 'C/C++', 'Python', 'JavaScript', 'SQL'],
    },
    {
      category: 'Frameworks & Technologies',
      skills: ['Spring Boot', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL', 'GraphQL'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'Jira', 'Postman', 'Linux'],
    },
    {
      category: 'Core Competencies',
      skills: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'System Design',
        'RESTful APIs',
        'Generative AI / LLMs',
        'Prompt Engineering',
      ],
    },
  ],
};
