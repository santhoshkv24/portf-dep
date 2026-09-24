import { ProjectCaseStudy } from '../types/portfolio';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'bny-eliza',
    index: '01',
    title: 'BNY Mellon (Eliza AI Agent Platform)',
    subtitle: 'Enterprise AI Agents & Dynamic Dashboard Generation',
    category: 'FLAGSHIP PRODUCTION',
    role: 'SDE Intern',
    period: 'Jun 2026 – Aug 2026',
    problem:
      'Enterprise financial data retrieval across Custody platform services required manual tabular queries, delayed static reporting workflows, and rigid visualizations that could not adapt to ad-hoc inquiries.',
    solution:
      "Engineered conversational chat and dynamic dashboard agents on BNY's internal Eliza platform, converting natural language into GraphQL requests via Python serverless functions to query Custody services and synthesize visual dashboards on demand.",
    highlights: [
      "Built a chat agent on BNY's internal Eliza platform that converts natural language queries into GraphQL requests and retrieves data through the internal Query Service of the Custody platform.",
      'Built a dashboard agent that interprets broad user queries and dynamically generates dashboards with relevant cards, charts, and other visualizations based on user intent.',
      "Worked with Python-based serverless functions and LLM API's that connect the agents with internal Custody services, handle query execution, and control the flow of requests.",
    ],
    technologies: [
      'Python',
      'Serverless Functions',
      'LLMs',
      'AI Agents',
      'GraphQL',
      'Prompt Engineering',
      'Dynamic Dashboards',
    ],
    metrics: [
      { label: 'Query Interface', value: 'NL to GraphQL' },
      { label: 'Custody Integration', value: 'Eliza Platform' },
      { label: 'Visualization', value: 'Dynamic Dashboards' },
    ],
  },
  {
    id: 'urban-resolve',
    index: '02',
    title: 'UrbanResolve',
    subtitle: 'AI-Powered Civic Issue Management Platform',
    category: 'FULL-STACK SYSTEM',
    problem:
      'Civic issue reporting systems suffered from manual triage delays, redundant duplicate submissions for the same incident across neighborhoods, and lack of proactive escalation alerts before SLA deadlines.',
    solution:
      'Architected a full-stack civic reporting platform supporting Web and Telegram bot intake, Google Gemini AI photo and location classification, PostgreSQL spatial duplicate detection, and automated SLA tracking with escalation alerts.',
    highlights: [
      'Built a civic issue reporting platform that accepts reports from a web application and Telegram bot, using Google Gemini to classify photo and location-based submissions and route them to the relevant department.',
      'Implemented spatial duplicate detection using PostgreSQL queries and added SLA tracking with alerts before the expected resolution time.',
      'Implemented a 4-role RBAC system for Citizen, Field Worker, Officer, and Admin using Spring Security and JWT authentication, with separate access for public issue information.',
    ],
    technologies: [
      'Spring Boot',
      'React',
      'PostgreSQL',
      'Google Gemini API',
      'Java 17',
      'Spring Security',
      'JWT',
      'Telegram Bot API',
    ],
    githubUrl: 'https://github.com/santhoshkv24/urban-resolve',
    metrics: [
      { label: 'Ingestion Channels', value: 'Web & Telegram Bot' },
      { label: 'Triage Engine', value: 'Google Gemini API' },
      { label: 'Spatial Filter', value: 'PostgreSQL Spatial' },
    ],
  },
  {
    id: 'hire-matrix',
    index: '03',
    title: 'HireMatrix',
    subtitle: 'Recruitment Management Platform & AI Resume Scoring',
    category: 'ENTERPRISE PLATFORM',
    problem:
      'Fragmented hiring workflows across resume screening, unstandardized interviewer evaluation feedback, manual meeting scheduling, and lack of clear candidate pipeline progression.',
    solution:
      'Centralized hiring platform featuring a 5-stage drag-and-drop Kanban pipeline, Google Gemini AI resume scoring against job requirements, 5-role RBAC, and automated Google Calendar/Meet interview scheduling.',
    highlights: [
      'Built a recruitment management platform using MongoDB, Node.js/Express, and React for job posting, candidate tracking, and a drag-and-drop hiring pipeline with 5 stages.',
      'Integrated Google Gemini to evaluate resumes against job requirements and added Google Calendar and Meet integration for interview scheduling.',
      'Implemented a 5-role RBAC system for admin, recruiter, hiring manager, interviewer, and applicant with JWT and refresh-token authentication, interview feedback, and CSV reporting.',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Google Gemini API',
      'Google Calendar',
      'Google Meet',
      'JWT',
    ],
    githubUrl: 'https://github.com/santhoshkv24/Hire-Matrix',
    metrics: [
      { label: 'Pipeline Stages', value: '5-Stage Kanban' },
      { label: 'Resume Scoring', value: 'Google Gemini API' },
      { label: 'Access Control', value: '5-Role RBAC' },
    ],
  },
  {
    id: 'organica-ops',
    index: '04',
    title: 'Organica Ops (C2C Advanced Systems)',
    subtitle: 'Enterprise Collaboration Platform & RBAC Core',
    category: 'ENTERPRISE CORE',
    role: 'Web Developer Intern',
    period: 'May 2025 – Jul 2025',
    problem:
      'Enterprise project tracking, dual-track internal and customer tasking, and meeting coordination required strict segregation of duty, reliable stored procedures, and automated notifications.',
    solution:
      'Architected 8+ backend REST modules, MySQL stored procedures, and a granular 5-role RBAC matrix with JWT authentication, Multer file uploads, and automated Nodemailer task/meeting notifications.',
    highlights: [
      'Built Organica Ops, a full-stack enterprise collaboration platform using React, Node.js, Express, and MySQL for project tracking, task management, meetings, and reporting.',
      'Implemented a 5-role RBAC system for Admin, Manager, Team Lead, Employee, and Customer using JWT authentication and role-based API access.',
      'Developed 8+ backend modules with RESTful APIs, MySQL stored procedures, file uploads using Multer, and automated meeting invites and task notifications using Nodemailer.',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MySQL',
      'JWT',
      'REST APIs',
      'Multer',
      'Nodemailer',
    ],
    metrics: [
      { label: 'Backend Modules', value: '8+ Modules' },
      { label: 'Access System', value: '5-Role RBAC' },
      { label: 'Notifications', value: 'Nodemailer Alerts' },
    ],
  },
];
