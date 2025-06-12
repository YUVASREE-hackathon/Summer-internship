import React, { useState, useEffect } from "react";
import { analyzeProfile } from '../utils/analyzeProfile';
import { jobMatchingEngine, jobRolesData, careerPathsData } from '../data';

const Index = () => {
  const [userProfile, setUserProfile] = useState({
    technicalSkills: [],
    softSkills: [],
    certifications: [],
    experienceLevel: '',
    industry: ''
  });
  const [analysisResults, setAnalysisResults] = useState(null);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [industryFilter, setIndustryFilter] = useState('all');
  const [errors, setErrors] = useState({
    technicalSkills: '',
    softSkills: '',
    experienceLevel: ''
  });
  const [toast, setToast] = useState({ title: '', message: '', type: 'success', visible: false });

  useEffect(() => {
    if (analysisResults && typeof window !== 'undefined') {
      import('chart.js/auto').then((ChartModule) => {
        const ctx = document.getElementById('jobMatchChart')?.getContext('2d');
        if (ctx) {
          new ChartModule.default(ctx, {
            type: 'bar',
            data: {
              labels: analysisResults.jobMatches.map(match => match.jobRole.title),
              datasets: [{
                label: 'Job Match Percentage',
                data: analysisResults.jobMatches.map(match => match.matchPercentage),
                backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0'],
                borderColor: ['#388E3C', '#1976D2', '#FFA000', '#E64A19', '#7B1FA2'],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: { beginAtZero: true, max: 100, title: { display: true, text: 'Match Percentage (%)' } },
                x: { title: { display: true, text: 'Job Roles' } }
              },
              plugins: {
                legend: { display: false },
                title: { display: true, text: 'Job Match Percentages' }
              }
            }
          });
        }
      });
    }
  }, [analysisResults]);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const scrollToAnalysis = () => {
    document.getElementById("analysis-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { technicalSkills: '', softSkills: '', experienceLevel: '' };
    if (userProfile.technicalSkills.length === 0) {
      newErrors.technicalSkills = 'At least one technical skill is required';
      isValid = false;
    }
    if (userProfile.softSkills.length === 0) {
      newErrors.softSkills = 'At least one soft skill is required';
      isValid = false;
    }
    if (!userProfile.experienceLevel) {
      newErrors.experienceLevel = 'Please select an experience level';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setAnalysisResults(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const results = await analyzeProfile(userProfile, jobMatchingEngine, jobRolesData, careerPathsData);
      if (!results) throw new Error('No results returned');
      setAnalysisResults(results);
      setToast({
        title: 'Analysis Complete',
        message: `Found ${results.jobMatches.length} job matches for your profile.`,
        type: 'success',
        visible: true
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setToast({
        title: 'Analysis Failed',
        message: error.message || 'Please try again.',
        type: 'error',
        visible: true
      });
    }
  };

  const addSkill = (type) => {
  const input = document.getElementById(`${type}SkillInput`);
  const value = input?.value.trim();
  if (!value) return;

  setUserProfile(prev => {
    let key = '';
    if (type === 'technical') key = 'technicalSkills';
    else if (type === 'soft') key = 'softSkills';
    else if (type === 'certification') key = 'certifications';
    else return prev;

    const skillsArray = prev[key];
    if (!skillsArray.includes(value)) {
      return { ...prev, [key]: [...skillsArray, value] };
    }
    return prev;
  });

  if (input) input.value = '';
};

const removeSkill = (type, value) => {
  let key = '';
  if (type === 'technical') key = 'technicalSkills';
  else if (type === 'soft') key = 'softSkills';
  else if (type === 'certification') key = 'certifications';
  else return;

  setUserProfile(prev => ({
    ...prev,
    [key]: prev[key].filter(skill => skill !== value)
  }));
};

  const filterJobsByIndustry = (selectedIndustry) => {
    setIndustryFilter(selectedIndustry);
    setVisibleJobs(3);
  };

  const loadMoreJobs = () => {
    setVisibleJobs(prev => prev + 3);
  };

  return (
    <>
      {/* Header, Hero Section, etc. ... */}
      <main className="main-content" role="main">
        <div className="container">
          <div className="content-grid">
            <div className="skills-panel">
              <div className="card sticky-card" id="analysis-form">
                <h3>Your Profile</h3>
                <form id="skillsForm" className="skills-form" onSubmit={handleFormSubmit}>
                  {/* Technical Skills */}
                  <div className="form-group">
                    <label htmlFor="technicalSkillInput">Technical Skills</label>
                    <div className="skill-input-group">
                      <input
                        type="text"
                        id="technicalSkillInput"
                        placeholder="e.g., JavaScript, Python, React..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('technical'))}
                      />
                      <button type="button" onClick={() => addSkill('technical')}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div id="technicalSkills" className="skills-display">
                      {userProfile.technicalSkills.map(skill => (
                        <div key={skill} className="skill-tag skill-tag-technical">
                          {skill}
                          <button type="button" onClick={() => removeSkill('technical', skill)}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="error-message">{errors.technicalSkills}</div>
                  </div>
                  {/* ... other form fields ... */}
                  <button type="submit" className="btn btn-primary btn-full">
                    Analyze My Profile
                  </button>
                </form>
              </div>
            </div>
            <div className="results-panel">
              {/* ... results rendering ... */}
              {analysisResults && (
                <div id="jobRecommendations">
                  <div className="card-header">
                    <h3>Recommended Job Roles</h3>
                    <select
                      id="industryFilter"
                      value={industryFilter}
                      onChange={(e) => filterJobsByIndustry(e.target.value)}
                    >
                      <option value="all">All Industries</option>
                      {[...new Set(analysisResults.jobMatches.map(m => m.jobRole.industry))].map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div id="jobList" className="job-list">
                    {(industryFilter === 'all' 
                      ? analysisResults.jobMatches 
                      : analysisResults.jobMatches.filter(match => match.jobRole.industry === industryFilter)
                    ).slice(0, visibleJobs).map(match => (
                      <div key={match.jobRole.id} className="job-item">
                        {/* ... job item JSX ... */}
                      </div>
                    ))}
                  </div>
                  {(industryFilter === 'all' 
                    ? analysisResults.jobMatches 
                    : analysisResults.jobMatches.filter(match => match.jobRole.industry === industryFilter)
                  ).length > visibleJobs && (
                    <div className="text-center">
                      <button
                        id="loadMoreJobs"
                        className="btn btn-outline"
                        onClick={loadMoreJobs}
                      >
                        View More Recommendations (
                        {(industryFilter === 'all' 
                          ? analysisResults.jobMatches 
                          : analysisResults.jobMatches.filter(match => match.jobRole.industry === industryFilter)
                        ).length - visibleJobs} remaining)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* ... footer, toast ... */}
    </>
  );
};

export default Index;