import { ResumeData } from '../types/portfolio';

export const resumeData: ResumeData = {
  name: 'K V SANTHOSH',
  title: 'Software Engineer / Full-Stack Developer / AI & ML Engineer',
  tagline: 'Specializing in high-throughput backend architectures, autonomous AI agents, and enterprise full-stack systems.',
  location: 'Chennai, India',
  email: 'santhoshvedakrishnan@gmail.com',
  phone: '+91-9361888416',
  linkedin: 'linkedin.com/in/santhosh-vedakrishnan',
  linkedinUrl: 'https://linkedin.com/in/santhosh-vedakrishnan',
  github: 'github.com/santhoshkv24',
  githubUrl: 'https://github.com/santhoshkv24',
  profileSummary:
    'Computer Science Engineering student specializing in AI & ML, with experience building full-stack enterprise applications and AI-powered developer solutions. Interested in software engineering, backend systems, AI agents, intelligent applications, and solving complex problems through clean system design. Currently pursuing a B.Tech in Computer Science Engineering (AI & ML) at SRM University AP with a CGPA of 9.29/10.',
  experience: [
    {
      id: 'bny-mellon',
      company: 'Bank of New York Mellon (BNY)',
      role: 'SDE Intern',
      period: 'Jun 2026 – Aug 2026',
      location: 'Chennai, Tamil Nadu',
      highlights: [
        "Built AI agents on BNY's internal Eliza platform using LLMs, GraphQL, and prompt engineering, replacing manual static reporting workflows with conversational, on-demand data access across internal datasets.",
        'Developed a natural-language chat agent with GraphQL-based data retrieval, allowing users to query specific data points in plain English instead of manually searching raw tables across multiple datasets.',
        'Engineered a dynamic dashboard-generation agent that interprets user intent and automatically visualizes multi-dataset results on demand, removing the need for manually built dashboards and reducing time-to-insight for stakeholders.',
      ],
      technologies: ['LLMs', 'AI Agents', 'GraphQL', 'Prompt Engineering'],
    },
    {
      id: 'c2c-advanced-systems',
      company: 'C2C Advanced Systems Chennai Ltd.',
      role: 'Web Developer Intern',
      period: 'May 2025 – Jul 2025',
      location: 'Chennai, Tamil Nadu',
      highlights: [
        'Built a full-stack enterprise collaboration platform, Organica Ops, from scratch using React 19, MUI v7, Node.js, Express, and MySQL.',
        'Developed functionality covering project tracking, dual-track task management for internal and customer work, meeting scheduling, and reporting.',
        'Designed and implemented a 5-role RBAC system covering Admin, Manager, Team Lead, Employee, and Customer.',
        'Implemented JWT authentication, bcrypt password hashing, Helmet.js security headers, rate limiting, and CORS policies across API routes.',
        'Engineered 8+ backend modules with RESTful APIs, MySQL stored procedures, and Multer file uploads.',
        'Integrated Nodemailer for meeting invitations and task notifications.',
      ],
      technologies: ['React 19', 'MUI v7', 'Node.js', 'Express', 'MySQL', 'JWT', 'REST APIs'],
    },
  ],
  education: [
    {
      institution: 'SRM University AP',
      degree: 'B.Tech — Computer Science Engineering (AI & ML)',
      period: 'Jul 2023 – May 2027 (Expected)',
      location: 'Guntur, Andhra Pradesh',
      cgpa: '9.29/10',
      details: 'Specialization in Artificial Intelligence & Machine Learning',
    },
    {
      institution: 'Kendriya Vidyalaya HVF, Avadi',
      degree: '12th CBSE — Science Stream',
      period: 'Mar 2023',
      location: 'Chennai, Tamil Nadu',
      score: '87%',
      details: 'Senior Secondary Education (CBSE)',
    },
    {
      institution: 'Kendriya Vidyalaya HVF, Avadi',
      degree: '10th CBSE',
      period: 'Mar 2021',
      location: 'Chennai, Tamil Nadu',
      score: '91.4%',
      details: 'Secondary School Examination (CBSE)',
    },
  ],
  certifications: [
    {
      title: 'Oracle Certified Professional: Java SE 17 Developer',
      issuer: 'Oracle',
      link: 'https://www.oracle.com',
      date: '2024',
    },
    {
      title: 'MongoDB Certified Associate Developer',
      issuer: 'MongoDB',
      link: 'https://www.mongodb.com',
      date: '2024',
    },
    {
      title: 'SAP Certified: Generative AI Developer',
      issuer: 'SAP',
      link: 'https://www.sap.com',
      date: '2024',
    },
  ],
  skills: [
    {
      category: 'Languages',
      skills: ['Java', 'C', 'C++', 'Python', 'JavaScript', 'SQL'],
    },
    {
      category: 'Frameworks & Technologies',
      skills: ['Spring Boot', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'Docker', 'GCP', 'Postman', 'Linux'],
    },
    {
      category: 'Core Competencies',
      skills: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'System Design',
        'RESTful APIs',
      ],
    },
  ],
};
