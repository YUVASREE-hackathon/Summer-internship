import React from "react";

const Index = () => {
  // Handler placeholder for scroll button
  const scrollToAnalysis = () => {
    const el = document.getElementById("analysis-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Note: addSkill, form submission, and other JS logic need to be implemented in script1.js or within this component

  return (
    <>
      {/* Meta tags and head elements should be handled in public/index.html or with React Helmet in React apps */}
      {/* This component returns only the body content */}

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <i className="fas fa-briefcase"></i>
              <h1>WorkWise</h1>
            </div>
            <nav className="nav-menu">
              <a href="#" className="nav-link">
                Dashboard
              </a>
              <a href="#" className="nav-link">
                Jobs
              </a>
              <a href="#" className="nav-link">
                Profile
              </a>
              <button className="btn btn-primary">Sign In</button>
            </nav>
            <button className="mobile-menu-btn">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2></h2>
            <p>
              Our AI-powered platform analyzes your skills and certifications to
              recommend the most suitable job opportunities and career paths
              tailored just for you.
            </p>
            <div className="hero-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={scrollToAnalysis}
              >
                Start Analysis
              </button>
              <button className="btn btn-outline btn-large">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="content-grid">
            {/* Skills Input Panel */}
            <div className="skills-panel">
              <div className="card sticky-card" id="analysis-form">
                <h3>Your Profile</h3>

                <form id="skillsForm" className="skills-form">
                  {/* Technical Skills */}
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-code icon-technical"></i> Technical Skills
                    </label>
                    <div className="skill-input-group">
                      <input
                        type="text"
                        id="technicalSkillInput"
                        placeholder="e.g., JavaScript, Python, React..."
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-small"
                        onClick={() => window.addSkill && window.addSkill("technical")}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div id="technicalSkills" className="skills-display"></div>
                    <div id="technicalSkillsError" className="error-message"></div>
                  </div>

                  {/* Soft Skills */}
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-users icon-soft"></i> Soft Skills
                    </label>
                    <div className="skill-input-group">
                      <input
                        type="text"
                        id="softSkillInput"
                        placeholder="e.g., Leadership, Communication..."
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-small"
                        onClick={() => window.addSkill && window.addSkill("soft")}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div id="softSkills" className="skills-display"></div>
                    <div id="softSkillsError" className="error-message"></div>
                  </div>

                  {/* Certifications */}
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-award icon-certification"></i> Certifications
                    </label>
                    <div className="skill-input-group">
                      <input
                        type="text"
                        id="certificationInput"
                        placeholder="e.g., AWS Certified, PMP..."
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="btn btn-outline btn-small"
                        onClick={() =>
                          window.addSkill && window.addSkill("certification")
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div id="certifications" className="skills-display"></div>
                  </div>

                  {/* Experience Level */}
                  <div className="form-group">
                    <label className="form-label">
                      <i className="fas fa-chart-line icon-experience"></i> Experience
                      Level
                    </label>
                    <select id="experienceLevel" className="form-select">
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior Level (6-10 years)</option>
                      <option value="executive">Executive Level (10+ years)</option>
                    </select>
                    <div id="experienceLevelError" className="error-message"></div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full" id="analyzeBtn">
                    <i className="fas fa-search"></i> Analyze My Profile
                  </button>
                </form>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="results-panel">
              <div id="resultsContainer">
                {/* Initial State */}
                <div className="card text-center" id="initialState">
                  <div className="empty-state">
                    <i className="fas fa-target empty-icon"></i>
                    <h3>Ready to Analyze Your Profile?</h3>
                    <p>
                      Fill out your skills and certifications on the left to get
                      personalized job recommendations and career insights.
                    </p>
                  </div>
                </div>

                {/* Loading State */}
                <div className="card hidden" id="loadingState">
                  <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <h3>Analyzing Your Profile...</h3>
                    <p>Our AI is matching your skills with the best job opportunities.</p>
                  </div>
                </div>

                {/* Results */}
                <div id="analysisResults" className="hidden">
                  {/* Analysis Overview */}
                  <div className="card" id="analysisOverview">
                    <div className="card-header">
                      <h3>Career Analysis Results</h3>
                      <div className="timestamp">
                        <i className="fas fa-clock"></i>
                        <span>Updated just now</span>
                      </div>
                    </div>

                    {/* Profile Strength */}
                    <div className="profile-strength">
                      <div className="strength-header">
                        <span>Profile Strength</span>
                        <span className="strength-score" id="profileStrength">
                          0%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" id="strengthProgress"></div>
                      </div>
                      <p className="strength-description" id="strengthDescription"></p>
                    </div>

                    {/* Quick Stats */}
                    <div className="stats-grid">
                      <div className="stat-card stat-primary">
                        <div className="stat-number" id="matchingJobs">
                          0
                        </div>
                        <div className="stat-label">Matching Jobs</div>
                      </div>
                      <div className="stat-card stat-secondary">
                        <div className="stat-number" id="careerPaths">
                          0
                        </div>
                        <div className="stat-label">Career Paths</div>
                      </div>
                      <div className="stat-card stat-accent">
                        <div className="stat-number" id="avgSalary">
                          $0K
                        </div>
                        <div className="stat-label">Avg. Salary</div>
                      </div>
                    </div>
                  </div>

                  {/* Job Recommendations */}
                  <div className="card" id="jobRecommendations">
                    <div className="card-header">
                      <h3>Recommended Job Roles</h3>
                      <div className="filter-controls">
                        <select id="industryFilter" className="form-select">
                          <option value="all">All Industries</option>
                        </select>
                      </div>
                    </div>
                    <div id="jobList" className="job-list"></div>
                    <div className="text-center">
                      <button id="loadMoreJobs" className="btn btn-outline hidden">
                        View More Recommendations
                      </button>
                    </div>
                  </div>

                  {/* Career Pathways */}
                  <div className="card" id="careerPathways">
                    <h3>Career Growth Pathways</h3>
                    <div id="pathwaysList" className="pathways-list"></div>
                  </div>

                  {/* Skill Gap Analysis */}
                  <div className="card" id="skillGapAnalysis">
                    <h3>Skill Gap Analysis</h3>
                    <div className="skill-analysis-grid">
                      <div className="skill-section">
                        <h4 className="section-title success">
                          <i className="fas fa-check-circle"></i> Your Strengths
                        </h4>
                        <div id="strengthsList" className="skills-list"></div>
                      </div>
                      <div className="skill-section">
                        <h4 className="section-title warning">
                          <i className="fas fa-arrow-up"></i> Growth Opportunities
                        </h4>
                        <div id="improvementsList" className="skills-list"></div>
                      </div>
                    </div>
                    <div id="learningPath" className="learning-path hidden">
                      <h5>
                        <i className="fas fa-book-open"></i> Recommended Learning Path
                      </h5>
                      <p>
                        Focus on these areas to unlock higher-paying opportunities and
                        increase your market value.
                      </p>
                      <div id="learningPathTags" className="learning-tags"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo">
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
                <li>
                  <a href="#">Job Matching</a>
                </li>
                <li>
                  <a href="#">Career Analysis</a>
                </li>
                <li>
                  <a href="#">Skill Assessment</a>
                </li>
                <li>
                  <a href="#">Salary Insights</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Career Guides</a>
                </li>
                <li>
                  <a href="#">Industry Reports</a>
                </li>
                <li>
                  <a href="#">Certification Paths</a>
                </li>
                <li>
                  <a href="#">Interview Prep</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 CareerMatch Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div id="toast" className="toast hidden">
        <div className="toast-content">
          <i className="toast-icon"></i>
          <div className="toast-text">
            <div className="toast-title"></div>
            <div className="toast-message"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
