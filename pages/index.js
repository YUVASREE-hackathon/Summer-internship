import React, { useState, useEffect } from "react";
import { analyzeProfile } from '../utils/analyzeProfile';
import { jobMatchingEngine, jobRolesData, careerPathsData } from '../data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

const Index = () => {
  const [userProfile, setUserProfile] = useState({
    technicalSkills: [],
    softSkills: [],
    certifications: [],
    experienceLevel: '',
    industry: ''
  });
const [prompt, setPrompt] = useState('');
const [response, setResponse] = useState('');
const [loading, setLoading] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showSignIn, setShowSignIn] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  setResponse(data.result);
  setLoading(false);
};

  const [analysisResults, setAnalysisResults] = useState(null);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [industryFilter, setIndustryFilter] = useState('all');
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
  { sender: 'ai', text: 'Hi! I\'m your career assistant. Ask me anything.' }
]);

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

const handleSignUp = async () => {
  const { createUserWithEmailAndPassword, auth, db, doc, setDoc } = await import('../utils/firebase');
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      uid: user.uid
    });
    alert("Sign up successful!");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const handleSignIn = async () => {
  const { signInWithEmailAndPassword, auth } = await import('../utils/firebase');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Welcome back, ${userCredential.user.email}`);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const sendChatMessage = async () => {
  const trimmed = chatInput.trim();
  if (!trimmed) return;

  setChatHistory(prev => [...prev, { sender: 'user', text: trimmed }]);
  setChatInput('');
  setIsTyping(true); // start typing animation

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: trimmed })
  });

  const data = await res.json();

  setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply || "No reply from AI." }]);
  setIsTyping(false); // stop typing animation
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
    let key;
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

  const filterJobsByIndustry = (selectedIndustry) => {
    setIndustryFilter(selectedIndustry);
    setVisibleJobs(3);
  };

  const loadMoreJobs = () => {
    setVisibleJobs(prev => prev + 3);
  };

  const removeSkill = (type, value) => {
  let key;
  if (type === 'technical') key = 'technicalSkills';
  else if (type === 'soft') key = 'softSkills';
  else if (type === 'certification') key = 'certifications';
  else return;

  setUserProfile(prev => ({
    ...prev,
    [key]: prev[key].filter(skill => skill !== value)
  }));
};

  return (
    <>
      <header className="header" role="banner">
        <div className="container">
          <div className="nav-content">
            <div className="logo" aria-label="WorkWise logo">
              <i className="fas fa-briefcase"></i>
              <h1>WorkWise</h1>
            </div>
            <nav className="nav-menu" aria-label="Main navigation">
                <a href="/" className="nav-link">Home</a>
                <a href="/about" className="nav-link">About</a>
                <a href="/contact" className="nav-link">Contact</a>
              <a href="#" className="nav-link">Dashboard</a>
              <a href="#" className="nav-link">Jobs</a>
              <a href="#" className="nav-link">Profile</a>
              <Link href="/signin">
  <button className="btn btn-primary" aria-label="Sign in">Sign In</button>
</Link>

            </nav>
            <button className="mobile-menu-btn" aria-label="Toggle mobile menu">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      <section className="hero" role="region" aria-labelledby="hero-heading">
        <div className="container">
          <div className="hero-content">
            <h2 id="hero-heading">Discover Your Perfect Career Match</h2>
            <p>
              Our AI-powered platform analyzes your skills and certifications to
              recommend the most suitable job opportunities and career paths
              tailored just for you.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={scrollToAnalysis}
                aria-label="Start career analysis"
              >
                Start Analysis
              </button>
              <button className="btn btn-outline btn-large" aria-label="Learn more about WorkWise">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="main-content" role="main">
        <div className="container">
          <div className="content-grid">
            <div className="skills-panel">
              <div className="card sticky-card" id="analysis-form" role="form" aria-labelledby="profile-form-heading">
                <h3 id="profile-form-heading">Your Profile</h3>
                <form id="skillsForm" className="skills-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="technicalSkillInput">
                      <i className="fas fa-code icon-technical"></i> Technical Skills
                    </label>
                    <div className="skill-input-group">
                      <input
                        type="text"
                        id="technicalSkillInput"
                        placeholder="e.g., JavaScript, Python, React..."
                        className="form-input"
                        aria-label="Enter technical skills"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('technical'))}
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-small"
                        onClick={() => addSkill('technical')}
                        aria-label="Add technical skill"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div id="technicalSkills" className="skills-display">
                      {userProfile.technicalSkills.map(skill => (
                        <div key={skill} className="skill-tag skill-tag-technical">
                          {skill}
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeSkill('technical', skill)}
                            aria-label={`Remove ${skill}`}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div id="technicalSkillsError" className="error-message" aria-live="polite">
                      {errors.technicalSkills}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="softSkillInput">
                      <i className="fas fa-users icon-soft"></i> Soft Skills
                    </label>
                    <div className="skill-input-group">
                      <input
                        type="text"
                        id="softSkillInput"
                        placeholder="e.g., Leadership, Communication..."
                        className="form-input"
                        aria-label="Enter soft skills"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('soft'))}
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-small"
                        onClick={() => addSkill('soft')}
                        aria-label="Add soft skill"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div id="softSkills" className="skills-display">
                      {userProfile.softSkills.map(skill => (
                        <div key={skill} className="skill-tag skill-tag-soft">
                          {skill}
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeSkill('soft', skill)}
                            aria-label={`Remove ${skill}`}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div id="softSkillsError" className="error-message" aria-live="polite">
                      {errors.softSkills}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="certificationInput">
                      <i className="fas fa-award icon-certification"></i> Certifications
                    </label>
                    <div className="skill-input-group">
  <input
    type="text"
    id="certificationSkillInput"
    placeholder="e.g., PMP, AWS..."
    className="form-input"
    aria-label="Enter certifications"
    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('certification'))}
  />
  <button
    type="button"
    className="btn btn-outline btn-small"
    onClick={() => addSkill('certification')}
    aria-label="Add certification"
  >
    <i className="fas fa-plus"></i>
  </button>
</div>

                    <div id="certifications" className="skills-display">
                      {userProfile.certifications.map(skill => (
                        <div key={skill} className="skill-tag skill-tag-certification">
                          {skill}
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeSkill('certification', skill)}
                            aria-label={`Remove ${skill}`}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="experienceLevel">
                      <i className="fas fa-chart-line icon-experience"></i> Experience Level
                    </label>
                    <select
                      id="experienceLevel"
                      className="form-select"
                      value={userProfile.experienceLevel}
                      onChange={(e) => {
                        setUserProfile(prev => ({ ...prev, experienceLevel: e.target.value }));
                        setErrors(prev => ({ ...prev, experienceLevel: '' }));
                      }}
                      aria-label="Select experience level"
                    >
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior Level (6-10 years)</option>
                      <option value="executive">Executive Level (10+ years)</option>
                    </select>
                    <div id="experienceLevelError" className="error-message" aria-live="polite">
                      {errors.experienceLevel}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                    id="analyzeBtn"
                    disabled={analysisResults === null && !userProfile.experienceLevel}
                    aria-label="Analyze profile"
                  >
                    <i className="fas fa-search"></i> Analyze My Profile
                  </button>
                </form>
              </div>
            </div>

            <div className="results-panel" role="region" aria-labelledby="results-heading">
              <div id="resultsContainer">
                {!analysisResults && (
                  <div className="card text-center" id="initialState">
                    <div className="empty-state">
                      <i className="fas fa-target empty-icon"></i>
                      <h3 id="results-heading">Ready to Analyze Your Profile?</h3>
                      <p>
                        Fill out your skills and certifications on the left to get
                        personalized job recommendations and career insights.
                      </p>
                    </div>
                  </div>
                )}

                {analysisResults === null && (
                  <div className="card" id="loadingState">
                    <div className="loading-content">
                      <div className="loading-spinner"></div>
                      <h3>Analyzing Your Profile...</h3>
                      <p>Our AI is matching your skills with the best job opportunities.</p>
                    </div>
                  </div>
                )}

                {analysisResults && (
                  <div id="analysisResults">
                    <div className="card" id="analysisOverview">
                      <div className="card-header">
                        <h3>Career Analysis Results</h3>
                        <div className="timestamp">
                          <i className="fas fa-clock"></i>
                          <span>Updated just now</span>
                        </div>
                      </div>
                      <div className="profile-strength">
                        <div className="strength-header">
                          <span>Profile Strength</span>
                          <span className="strength-score" id="profileStrength">
                            {analysisResults.analysisResult.profileStrength}%
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${analysisResults.analysisResult.profileStrength}%` }}
                          ></div>
                        </div>
                        <p className="strength-description">
                          {analysisResults.analysisResult.profileStrength >= 80
                            ? "Excellent profile strength! You're well-positioned for senior roles."
                            : analysisResults.analysisResult.profileStrength >= 60
                            ? "Good profile foundation. Consider adding more certifications."
                            : "Growing profile. Focus on building core technical skills."}
                        </p>
                      </div>
                      <div className="stats-grid">
                        <div className="stat-card stat-primary">
                          <div className="stat-number">
                            {analysisResults.analysisResult.totalMatchingJobs}
                          </div>
                          <div className="stat-label">Matching Jobs</div>
                        </div>
                        <div className="stat-card stat-secondary">
                          <div className="stat-number">
                            {analysisResults.analysisResult.totalCareerPaths}
                          </div>
                          <div className="stat-label">Career Paths</div>
                        </div>
                        <div className="stat-card stat-accent">
                          <div className="stat-number">
                            ${(analysisResults.analysisResult.averageSalary / 1000).toFixed(0)}K
                          </div>
                          <div className="stat-label">Avg. Salary</div>
                        </div>
                      </div>
                      <div className="chart-container">
                        <canvas id="jobMatchChart" aria-label="Job match percentages chart"></canvas>
                      </div>
                    </div>

                    <div className="card" id="jobRecommendations">
                      <div className="card-header">
                        <h3>Recommended Job Roles</h3>
                        <div className="filter-controls">
                          <select
                            id="industryFilter"
                            className="form-select"
                            value={industryFilter}
                            onChange={(e) => filterJobsByIndustry(e.target.value)}
                            aria-label="Filter jobs by industry"
                          >
                            <option value="all">All Industries</option>
                            {[...new Set(analysisResults.jobMatches.map(m => m.jobRole.industry))].map(industry => (
                              <option key={industry} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div id="jobList" className="job-list">
                        {(industryFilter === 'all' 
                          ? analysisResults.jobMatches 
                          : analysisResults.jobMatches.filter(match => match.jobRole.industry === industryFilter)
                        ).slice(0, visibleJobs).map(match => (
                          <div key={match.jobRole.id} className="job-item">
                            <div className="job-header">
                              <div className="job-info">
                                <div className="job-title">
                                  <h4>{match.jobRole.title}</h4>
                                  <span className={`match-badge ${match.matchPercentage >= 85 ? 'match-badge-high' : match.matchPercentage >= 70 ? 'match-badge-medium' : 'match-badge-low'}`}>
                                    {match.matchPercentage}% Match
                                  </span>
                                </div>
                                <div className="job-meta">
                                  <span>{match.jobRole.industry}</span>
                                  <span>•</span>
                                  <i className="fas fa-map-marker-alt"></i>
                                  <span>{match.jobRole.workType}</span>
                                </div>
                                <p className="job-description">{match.jobRole.description}</p>
                                <p className="job-reasoning">{match.reasoning}</p>
                              </div>
                              <div className="job-salary">
                                <div className="salary-amount">
                                  ${(match.jobRole.salaryMin / 1000).toFixed(0)}K - ${(match.jobRole.salaryMax / 1000).toFixed(0)}K
                                </div>
                                <div className="salary-period">per year</div>
                              </div>
                            </div>
                            <div className="job-footer">
                              <div className="job-skills">
                                {match.matchingSkills.slice(0, 4).map(skill => (
                                  <span key={skill} className="skill-tag">{skill}</span>
                                ))}
                                {match.matchingSkills.length > 4 && (
                                  <span className="skill-tag" style={{ border: '1px solid var(--border-color)' }}>
                                    +{match.matchingSkills.length - 4} more
                                  </span>
                                )}
                              </div>
                              <button className="view-details-btn" aria-label={`View details for ${match.jobRole.title}`}>
                                View Details <i className="fas fa-arrow-right"></i>
                              </button>
                            </div>
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
                            aria-label="Load more job recommendations"
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

                    <div className="card" id="careerPathways">
                      <h3>Career Growth Pathways</h3>
                      <div id="pathwaysList" className="pathways-list">
                        {analysisResults.careerPaths.map((path, index) => (
                          <div key={path.id} className="pathway-item">
                            <h4 className="pathway-title">{path.name}</h4>
                            <p className="pathway-description">{path.description}</p>
                            <div className="pathway-steps">
                              <span>Path:</span>
                              {path.steps.map((step, stepIndex) => (
                                <div key={step.title} className="step-item">
                                  <span className="step-badge">{step.title}</span>
                                  {stepIndex < path.steps.length - 1 && (
                                    <i className="fas fa-arrow-right step-arrow"></i>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="pathway-skills">
                              {path.requiredSkills.slice(0, 4).map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                              ))}
                              {path.requiredSkills.length > 4 && (
                                <span className="skill-tag" style={{ border: '1px solid var(--border-color)' }}>
                                  +{path.requiredSkills.length - 4} more
                                </span>
                              )}
                            </div>
                            <div
                              className="pathway-recommendation"
                              style={{ color: ['var(--secondary-color)', 'var(--accent-color)', 'var(--primary-color)'][index] || 'var(--secondary-color)' }}
                            >
                              <i className={['fas fa-check-circle', 'fas fa-lightbulb', 'fas fa-star'][index] || 'fas fa-check-circle'}></i>
                              <span>{path.recommendationReason}</span>
                            </div>
                            <div className="pathway-timeframe">Timeline: {path.timeframe}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="card" id="skillGapAnalysis">
                      <h3>Skill Gap Analysis</h3>
                      <div className="skill-analysis-grid">
                        <div className="skill-section">
                          <h4 className="section-title success">
                            <i className="fas fa-check-circle"></i> Your Strengths
                          </h4>
                          <div id="strengthsList" className="skills-list">
                            {analysisResults.skillGap.strengthSkills.map(skill => (
                              <div key={skill.skill} className="skill-item strength">
                                <div className="skill-info">
                                  <div className="skill-name">{skill.skill}</div>
                                </div>
                                <div className="skill-level">
                                  <div className="skill-progress">
                                    <div className="skill-progress-fill" style={{ width: `${skill.level}%` }}></div>
                                  </div>
                                  <span className="skill-level-text">
                                    {skill.level >= 80 ? 'Expert' : skill.level >= 60 ? 'Advanced' : skill.level >= 40 ? 'Intermediate' : 'Beginner'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="skill-section">
                          <h4 className="section-title warning">
                            <i className="fas fa-arrow-up"></i> Growth Opportunities
                          </h4>
                          <div id="improvementsList" className="skills-list">
                            {analysisResults.skillGap.improvementAreas.map(area => (
                              <div key={area.skill} className="skill-item improvement">
                                <div className="skill-info">
                                  <div className="skill-name">{area.skill}</div>
                                  <div className="skill-recommendation">{area.recommendation}</div>
                                </div>
                                <div className="skill-level">
                                  <div className="skill-progress">
                                    <div className="skill-progress-fill" style={{ width: `${area.level}%` }}></div>
                                  </div>
                                  <span className="skill-level-text">
                                    {area.level >= 80 ? 'Expert' : area.level >= 60 ? 'Advanced' : area.level >= 40 ? 'Intermediate' : 'Beginner'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {analysisResults.skillGap.learningPath.length > 0 && (
                        <div id="learningPath" className="learning-path">
                          <h5>
                            <i className="fas fa-book-open"></i> Recommended Learning Path
                          </h5>
                          <p>
                            Focus on these areas to unlock higher-paying opportunities and
                            increase your market value.
                          </p>
                          <div id="learningPathTags" className="learning-tags">
                            {analysisResults.skillGap.learningPath.map(path => (
                              <span key={path} className="learning-tag">{path}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>


      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo" aria-label="WorkWise footer logo">
                <i className="fas fa-briefcase"></i>
                <h3>WorkWise</h3>
              </div>
              <p>
                AI-powered career guidance platform helping professionals find
                their perfect job match.
              </p>
            </div>
            <div className="footer-section">
              <h4>Platform</h4>
              <ul>
                <li><a href="#">Job Matching</a></li>
                <li><a href="#">Career Analysis</a></li>
                <li><a href="#">Skill Assessment</a></li>
                <li><a href="#">Salary Insights</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Career Guides</a></li>
                <li><a href="#">Industry Reports</a></li>
                <li><a href="#">Certification Paths</a></li>
                <li><a href="#">Interview Prep</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 WorkWise. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div
        id="toast"
        className={`toast ${toast.visible ? 'show' : 'hidden'}`}
        role="alert"
        aria-live="polite"
      >
        <div className="toast-content">
          <i className={`toast-icon ${toast.type}`}>
            {toast.type === 'success' ? (
              <i className="fas fa-check-circle"></i>
            ) : (
              <i className="fas fa-exclamation-circle"></i>
            )}
          </i>
          <div className="toast-text">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-message">{toast.message}</div>
          </div>
        </div>
      </div>

{showSignIn && (
  <div className="sign-in-modal">
    <div className="sign-in-content">
      <h3>Sign In / Sign Up</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="sign-in-buttons">
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <button onClick={() => setShowSignIn(false)}>Close</button>
    </div>
  </div>
)}

      {/* Floating AI Chat Assistant */}
<div className="chatbot-button" onClick={() => setChatVisible(!chatVisible)}>
  <i className="fas fa-robot"></i>
</div>
{chatVisible && (
  <div className="chatbot-panel">
  <div className="chat-header">Ask AI Career Assistant</div>

  {/* Chat history appears first */}
  <div className="chat-history">
    {chatHistory.map((msg, idx) => (
      <div
        key={idx}
        className={`chat-message ${msg.sender === 'user' ? 'chat-user' : 'chat-ai'}`}
      >
        <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
      </div>
    ))}
    {isTyping && (
  <div className="chat-message chat-ai">
    <em>AI is typing...</em>
  </div>
)}
  </div>

  {/* Input + Send now appear at the bottom */}
  <textarea
  placeholder="Ask anything about your career..."
  rows={2}
  value={chatInput}
  onChange={e => setChatInput(e.target.value)}
  className="chat-input"
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      sendChatMessage();
    }
  }}
/>

  <button onClick={sendChatMessage}>Send</button>
</div>

)}

    </>
  );
};

export default Index;
