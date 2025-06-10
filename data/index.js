export const jobMatchingEngine = {
  calculateJobMatches: (profile, jobRoles) => {
    return jobRoles.map((role, index) => ({
      jobRole: role,
      matchPercentage: Math.min(90 - index * 5, 90),
      matchingSkills: profile.technicalSkills.slice(0, 3),
      reasoning: `Matches due to skills: ${profile.technicalSkills.slice(0, 3).join(', ')}`
    }));
  },
  calculateProfileStrength: (profile) => {
    return Math.min(100, (profile.technicalSkills.length + profile.softSkills.length + profile.certifications.length) * 10);
  },
  analyzeSkillGaps: (profile, jobRoles) => ({
    strengthSkills: profile.technicalSkills.map(skill => ({ skill, level: 80 })),
    improvementAreas: ['Cloud Computing', 'DevOps'].map(skill => ({ skill, level: 20, recommendation: `Learn ${skill}` })),
    learningPath: ['AWS Certification', 'Docker Fundamentals']
  })
};

export const jobRolesData = [
  { id: 1, title: 'Software Engineer', industry: 'Tech', workType: 'Remote', salaryMin: 80000, salaryMax: 120000, description: 'Build scalable web apps' },
  { id: 2, title: 'Data Scientist', industry: 'Tech', workType: 'Hybrid', salaryMin: 90000, salaryMax: 130000, description: 'Analyze data patterns' },
  { id: 3, title: 'Product Manager', industry: 'Tech', workType: 'On-site', salaryMin: 100000, salaryMax: 150000, description: 'Lead product development' },
  { id: 4, title: 'UX Designer', industry: 'Design', workType: 'Remote', salaryMin: 70000, salaryMax: 110000, description: 'Create user-friendly interfaces' },
];

export const careerPathsData = [
  {
    id: 1,
    name: 'Full Stack Developer',
    description: 'End-to-end web development',
    requiredSkills: ['JavaScript', 'Node.js', 'React'],
    steps: [{ title: 'Learn JS' }, { title: 'Build Projects' }],
    timeframe: '12 months',
    recommendationReason: 'High demand'
  },
  {
    id: 2,
    name: 'Data Science Specialist',
    description: 'Advanced data analysis and ML',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics'],
    steps: [{ title: 'Learn Python' }, { title: 'Master ML' }],
    timeframe: '18 months',
    recommendationReason: 'Growing field'
  },
];