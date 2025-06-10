let visibleJobs = 3;
let analysisResults = null;

function showInitialState() {
    initialState.classList.remove('hidden');
    loadingState.classList.add('hidden');
    analysisResultsContainer.classList.add('hidden');
}

function showLoadingState() {
    initialState.classList.add('hidden');
    loadingState.classList.remove('hidden');
    analysisResultsContainer.classList.add('hidden');
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
        <div class="loading-spinner" style="width: 1rem; height: 1rem; margin-right: 0.5rem;"></div>
        Analyzing...
    `;
}

function displayResults(results) {
    analysisResults = results;
    initialState.classList.add('hidden');
    loadingState.classList.add('hidden');
    analysisResultsContainer.classList.remove('hidden');
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = `
        <i class="fas fa-search"></i>
        Analyze My Profile
    `;
    displayAnalysisOverview(results.analysisResult);
    displayJobRecommendations(results.jobMatches);
    displayCareerPathways(results.careerPaths);
    displaySkillGapAnalysis(results.skillGap);
    populateIndustryFilter(results.jobMatches);
    visibleJobs = 3;
    scrollToAnalysis();
}

function displayAnalysisOverview(analysis) {
    const strengthScore = document.getElementById('profileStrength');
    const strengthProgress = document.getElementById('strengthProgress');
    const strengthDescription = document.getElementById('strengthDescription');

    strengthScore.textContent = analysis.profileStrength + '%';
    strengthProgress.style.width = analysis.profileStrength + '%';

    let description = '';
    if (analysis.profileStrength >= 80) {
        description = "Excellent profile strength! You're well-positioned for senior roles.";
    } else if (analysis.profileStrength >= 60) {
        description = "Good profile foundation. Consider adding more certifications to boost your score.";
    } else {
        description = "Growing profile. Focus on building core technical skills and gaining certifications.";
    }

    strengthDescription.textContent = description;
    document.getElementById('matchingJobs').textContent = analysis.totalMatchingJobs;
    document.getElementById('careerPaths').textContent = analysis.totalCareerPaths;
    document.getElementById('avgSalary').textContent = `$${(analysis.averageSalary / 1000).toFixed(0)}K`;
}

function displayJobRecommendations(jobMatches) {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';
    jobMatches.slice(0, visibleJobs).forEach(match => {
        const jobItem = createJobItem(match);
        jobList.appendChild(jobItem);
    });

    const loadMoreBtn = document.getElementById('loadMoreJobs');
    if (jobMatches.length > visibleJobs) {
        loadMoreBtn.classList.remove('hidden');
        loadMoreBtn.textContent = `View More Recommendations (${jobMatches.length - visibleJobs} remaining)`;
        loadMoreBtn.disabled = false;
    } else {
        loadMoreBtn.classList.add('hidden');
        loadMoreBtn.disabled = true;
    }
}

function createJobItem(match) {
    const jobItem = document.createElement('div');
    jobItem.className = 'job-item';
    const matchBadgeClass = getMatchBadgeClass(match.matchPercentage);
    const salaryRange = formatSalary(match.jobRole.salaryMin, match.jobRole.salaryMax);

    jobItem.innerHTML = `
        <div class="job-header">
            <div class="job-info">
                <div class="job-title">
                    <h4>${match.jobRole.title}</h4>
                    <span class="match-badge ${matchBadgeClass}">${match.matchPercentage}% Match</span>
                </div>
                <div class="job-meta">
                    <span>${match.jobRole.industry}</span>
                    <span>•</span>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${match.jobRole.workType}</span>
                </div>
                <p class="job-description">${match.jobRole.description}</p>
                <p class="job-reasoning">${match.reasoning}</p>
            </div>
            <div class="job-salary">
                <div class="salary-amount">${salaryRange}</div>
                <div class="salary-period">per year</div>
            </div>
        </div>        
        <div class="job-footer">
            <div class="job-skills">
                ${match.matchingSkills.slice(0, 4).map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                ).join('')}
                ${match.matchingSkills.length > 4 ? 
                    `<span class="skill-tag" style="border: 1px solid var(--border-color);">+${match.matchingSkills.length - 4} more</span>` 
                    : ''
                }
            </div>
            <button class="view-details-btn">
                View Details
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;
    return jobItem;
}

function getMatchBadgeClass(percentage) {
    if (percentage >= 85) return 'match-badge-high';
    if (percentage >= 70) return 'match-badge-medium';
    return 'match-badge-low';
}

function formatSalary(min, max) {
    return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K`;
}

function displayCareerPathways(careerPaths) {
    const pathwaysList = document.getElementById('pathwaysList');
    pathwaysList.innerHTML = '';
    careerPaths.forEach((path, index) => {
        const pathwayItem = createPathwayItem(path, index);
        pathwaysList.appendChild(pathwayItem);
    });
}

function createPathwayItem(path, index) {
    const pathwayItem = document.createElement('div');
    pathwayItem.className = 'pathway-item';
    const iconClass = getPathwayIcon(index);
    const iconColor = getPathwayIconColor(index);

    pathwayItem.innerHTML = `
        <h4 class="pathway-title">${path.name}</h4>
        <p class="pathway-description">${path.description}</p>       
        <div class="pathway-steps">
            <span>Path:</span>
            ${path.steps.map((step, stepIndex) => `
                <div class="step-item">
                    <span class="step-badge">${step.title}</span>
                    ${stepIndex < path.steps.length - 1 ? '<i class="fas fa-arrow-right step-arrow"></i>' : ''}
                </div>
            `).join('')}
        </div>
        <div class="pathway-skills">
            ${path.requiredSkills.slice(0, 4).map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('')}
            ${path.requiredSkills.length > 4 ? 
                `<span class="skill-tag" style="border: 1px solid var(--border-color);">+${path.requiredSkills.length - 4} more</span>` 
                : ''
            }
        </div>
        <div class="pathway-recommendation" style="color: ${iconColor};">
            <i class="${iconClass}"></i>
            <span>${path.recommendationReason}</span>
        </div>        
        <div class="pathway-timeframe">
            Timeline: ${path.timeframe}
        </div>
    `;
    return pathwayItem;
}

function getPathwayIcon(index) {
    const icons = ['fas fa-check-circle', 'fas fa-lightbulb', 'fas fa-star'];
    return icons[index] || 'fas fa-check-circle';
}

function getPathwayIconColor(index) {
    const colors = ['var(--secondary-color)', 'var(--accent-color)', 'var(--primary-color)'];
    return colors[index] || 'var(--secondary-color)';
}

function displaySkillGapAnalysis(skillGap) {
    const strengthsList = document.getElementById('strengthsList');
    const improvementsList = document.getElementById('improvementsList');
    const learningPath = document.getElementById('learningPath');
    const learningPathTags = document.getElementById('learningPathTags');

    strengthsList.innerHTML = '';
    skillGap.strengthSkills.forEach(skill => {
        const skillItem = createSkillItem(skill, 'strength');
        strengthsList.appendChild(skillItem);
    });

    improvementsList.innerHTML = '';
    skillGap.improvementAreas.forEach(area => {
        const skillItem = createSkillItem(area, 'improvement');
        improvementsList.appendChild(skillItem);
    });

    if (skillGap.learningPath && skillGap.learningPath.length > 0) {
        learningPath.classList.remove('hidden');
        learningPathTags.innerHTML = '';
        skillGap.learningPath.forEach(path => {
            const tag = document.createElement('span');
            tag.className = 'learning-tag';
            tag.textContent = path;
            learningPathTags.appendChild(tag);
        });
    }
}

function createSkillItem(skill, type) {
    const skillItem = document.createElement('div');
    skillItem.className = `skill-item ${type}`;
    skillItem.innerHTML = `
        <div class="skill-info">
            <div class="skill-name">${skill.skill}</div>
            ${skill.recommendation ? `<div class="skill-recommendation">${skill.recommendation}</div>` : ''}
        </div>
        <div class="skill-level">
            <div class="skill-progress">
                <div class="skill-progress-fill" style="width: ${skill.level}%;"></div>
            </div>
            <span class="skill-level-text">${getSkillLevelText(skill.level)}</span>
        </div>
    `;
    return skillItem;
}

function getSkillLevelText(level) {
    if (level >= 80) return "Expert";
    if (level >= 60) return "Advanced";
    if (level >= 40) return "Intermediate";
    return "Beginner";
}

function populateIndustryFilter(jobMatches) {
    const industryFilter = document.getElementById('industryFilter');
    const industries = [...new Set(jobMatches.map(match => match.jobRole.industry))];
    industryFilter.innerHTML = '<option value="all">All Industries</option>';  
    industries.forEach(industry => {
        const option = document.createElement('option');
        option.value = industry;
        option.textContent = industry;
        industryFilter.appendChild(option);
    });
}

function filterJobsByIndustry(selectedIndustry) {
    if (!analysisResults) return;
    const filteredJobs = selectedIndustry === "all" 
        ? analysisResults.jobMatches 
        : analysisResults.jobMatches.filter(match => match.jobRole.industry === selectedIndustry);
    visibleJobs = 3;
    displayJobRecommendations(filteredJobs);
}

function loadMoreJobs() {
    visibleJobs += 3;
    const industryFilter = document.getElementById('industryFilter');
    const selectedIndustry = industryFilter.value;
    const filteredJobs = selectedIndustry === "all" 
        ? analysisResults.jobMatches 
        : analysisResults.jobMatches.filter(match => match.jobRole.industry === selectedIndustry);
    displayJobRecommendations(filteredJobs);
}

function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toastIcon.className = `toast-icon ${type}`;

    if (type === 'success') {
        toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else if (type === 'error') {
        toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    }

    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('hide');
        }, 300);
    }, 5000);
}

function scrollToAnalysis() {
    document.getElementById('analysis-form').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}
