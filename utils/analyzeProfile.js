export async function analyzeProfile(profile, jobMatchingEngine, jobRolesData, careerPathsData) {
  if (!jobMatchingEngine || !jobRolesData || !careerPathsData) {
    throw new Error('Required data or engine not loaded');
  }

  // Calculate job matches
  const jobMatchResults = jobMatchingEngine.calculateJobMatches(profile, jobRolesData);
  const topMatches = jobMatchResults.slice(0, 10);

  // Calculate profile strength
  const profileStrength = jobMatchingEngine.calculateProfileStrength(profile);

  // Calculate average salary
  const averageSalary = Math.round(
    topMatches.reduce((sum, match) => 
      sum + (match.jobRole.salaryMin + match.jobRole.salaryMax) / 2, 0
    ) / Math.max(topMatches.length, 1)
  );

  // Get relevant career paths
  const allSkills = [...profile.technicalSkills, ...profile.softSkills];
  const careerPaths = careerPathsData.filter(path =>
    path.requiredSkills.some(skill => 
      allSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    )
  );

  // Analyze skill gaps
  const skillGapAnalysis = jobMatchingEngine.analyzeSkillGaps(
    profile, 
    topMatches.slice(0, 5).map(m => m.jobRole)
  );

  // Create complete analysis
  return {
    analysisResult: {
      profileStrength,
      averageSalary,
      totalMatchingJobs: jobMatchResults.filter(match => match.matchPercentage >= 50).length,
      totalCareerPaths: careerPaths.length,
      createdAt: new Date().toISOString()
    },
    jobMatches: topMatches,
    careerPaths: careerPaths.slice(0, 3),
    skillGap: {
      strengthSkills: skillGapAnalysis.strengthSkills,
      improvementAreas: skillGapAnalysis.improvementAreas,
      learningPath: skillGapAnalysis.learningPath
    }
  };
}