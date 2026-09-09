import { describe, it, expect } from 'vitest';
import { resumeData } from '../src/data/resumeData';
import { projectsData } from '../src/data/projectsData';

describe('Strict Resume Ingestion', () => {
  describe('Profile & Contact Details', () => {
    it('contains verified personal contact and profile details', () => {
      expect(resumeData.name).toBe('K V SANTHOSH');
      expect(resumeData.email).toBe('santhoshvedakrishnan@gmail.com');
      expect(resumeData.phone).toBe('+91-9361888416');
      expect(resumeData.location).toBe('Chennai, India');
      expect(resumeData.github).toContain('github.com/santhoshkv24');
      expect(resumeData.linkedin).toContain('linkedin.com/in/santhosh-vedakrishnan');
      expect(resumeData.profileSummary).toContain('Computer Science Engineering student specializing in AI & ML');
    });
  });

  describe('Education History', () => {
    it('contains verified academic credentials strictly matching resume.md', () => {
      expect(resumeData.education).toHaveLength(3);

      const srm = resumeData.education[0];
      expect(srm.institution).toBe('SRM University AP');
      expect(srm.degree).toContain('B.Tech — Computer Science Engineering (AI & ML)');
      expect(srm.cgpa).toBe('9.29/10');
      expect(srm.period).toBe('Jul 2023 – May 2027 (Expected)');
      expect(srm.location).toBe('Guntur, Andhra Pradesh');

      const kv12 = resumeData.education[1];
      expect(kv12.institution).toBe('Kendriya Vidyalaya HVF, Avadi');
      expect(kv12.degree).toContain('12th CBSE — Science Stream');
      expect(kv12.score).toBe('87%');
      expect(kv12.period).toBe('Mar 2023');

      const kv10 = resumeData.education[2];
      expect(kv10.institution).toBe('Kendriya Vidyalaya HVF, Avadi');
      expect(kv10.degree).toContain('10th CBSE');
      expect(kv10.score).toBe('91.4%');
      expect(kv10.period).toBe('Mar 2021');
    });
  });

  describe('Work Experience', () => {
    it('contains both official internships with verbatim dates and technologies', () => {
      expect(resumeData.experience).toHaveLength(2);

      const bny = resumeData.experience.find((e) => e.company === 'Bank of New York Mellon (BNY)');
      expect(bny).toBeDefined();
      expect(bny?.role).toBe('SDE Intern');
      expect(bny?.period).toBe('Jun 2026 – Aug 2026');
      expect(bny?.location).toBe('Chennai, Tamil Nadu');
      expect(bny?.technologies).toEqual(
        expect.arrayContaining(['LLMs', 'AI Agents', 'GraphQL', 'Prompt Engineering'])
      );
      expect(bny?.highlights.length).toBeGreaterThanOrEqual(3);

      const c2c = resumeData.experience.find((e) => e.company === 'C2C Advanced Systems Chennai Ltd.');
      expect(c2c).toBeDefined();
      expect(c2c?.role).toBe('Web Developer Intern');
      expect(c2c?.period).toBe('May 2025 – Jul 2025');
      expect(c2c?.location).toBe('Chennai, Tamil Nadu');
      expect(c2c?.technologies).toEqual(
        expect.arrayContaining(['React 19', 'MUI v7', 'Node.js', 'Express', 'MySQL', 'JWT', 'REST APIs'])
      );
      expect(c2c?.highlights.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Technical Skills Matrix', () => {
    it('contains all 4 technical skill categories with exact technologies', () => {
      const categories = resumeData.skills.map((s) => s.category);
      expect(categories).toContain('Languages');
      expect(categories).toContain('Frameworks & Technologies');
      expect(categories).toContain('Tools');
      expect(categories).toContain('Core Competencies');

      const languages = resumeData.skills.find((s) => s.category === 'Languages')?.skills;
      expect(languages).toEqual(
        expect.arrayContaining(['Java', 'C', 'C++', 'Python', 'JavaScript', 'SQL'])
      );

      const frameworks = resumeData.skills.find((s) => s.category === 'Frameworks & Technologies')?.skills;
      expect(frameworks).toEqual(
        expect.arrayContaining(['Spring Boot', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'MySQL'])
      );

      const tools = resumeData.skills.find((s) => s.category === 'Tools')?.skills;
      expect(tools).toEqual(
        expect.arrayContaining(['Git', 'Docker', 'GCP', 'Postman', 'Linux'])
      );

      const competencies = resumeData.skills.find((s) => s.category === 'Core Competencies')?.skills;
      expect(competencies).toEqual(
        expect.arrayContaining([
          'Data Structures & Algorithms',
          'Object-Oriented Programming',
          'System Design',
          'RESTful APIs',
        ])
      );
    });
  });

  describe('Verified Certifications', () => {
    it('contains verified industry certifications', () => {
      expect(resumeData.certifications).toHaveLength(3);
      const certNames = resumeData.certifications.map((c) => c.title);
      expect(certNames).toContain('Oracle Certified Professional: Java SE 17 Developer');
      expect(certNames).toContain('MongoDB Certified Associate Developer');
      expect(certNames).toContain('SAP Certified: Generative AI Developer');
    });
  });

  describe('Flagship Case Studies (Projects)', () => {
    it('contains the 4 marquee case studies with required architecture specs', () => {
      expect(projectsData).toHaveLength(4);
      const ids = projectsData.map((p) => p.id);
      expect(ids).toEqual(['bny-eliza', 'urban-resolve', 'hire-matrix', 'organica-ops']);
    });

    it('defines simulator types and structural highlights for each project', () => {
      const bny = projectsData.find((p) => p.id === 'bny-eliza');
      expect(bny?.simulatorType).toBe('bny');
      expect(bny?.technologies).toContain('GraphQL');
      expect(bny?.technologies).toContain('AI Agents');
      expect(bny?.highlights.length).toBeGreaterThan(0);

      const urban = projectsData.find((p) => p.id === 'urban-resolve');
      expect(urban?.simulatorType).toBe('urban-resolve');
      expect(urban?.technologies).toContain('Spring Boot');
      expect(urban?.technologies).toContain('Google Cloud Vision');
      expect(urban?.highlights.length).toBeGreaterThan(0);

      const hire = projectsData.find((p) => p.id === 'hire-matrix');
      expect(hire?.simulatorType).toBe('hire-matrix');
      expect(hire?.technologies).toContain('Google Gemini');
      expect(hire?.technologies).toContain('MongoDB');
      expect(hire?.highlights.length).toBeGreaterThan(0);

      const organica = projectsData.find((p) => p.id === 'organica-ops');
      expect(organica?.simulatorType).toBe('organica');
      expect(organica?.technologies).toContain('React 19');
      expect(organica?.technologies).toContain('MySQL');
      expect(organica?.highlights.length).toBeGreaterThan(0);
    });
  });
});
