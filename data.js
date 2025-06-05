// Job Roles Data
const jobRolesData = [
    {
        id: 1,
        title: "Senior Full Stack Developer",
        description: "Build and maintain web applications using modern JavaScript frameworks and backend technologies",
        industry: "Technology",
        requiredTechnicalSkills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
        requiredSoftSkills: ["Problem Solving", "Communication", "Teamwork"],
        preferredCertifications: ["AWS Certified Developer"],
        experienceLevel: "senior",
        salaryMin: 85000,
        salaryMax: 120000,
        workType: "Remote"
    },
    {
        id: 2,
        title: "Technical Team Lead",
        description: "Lead a team of developers while contributing to architecture decisions and technical strategy",
        industry: "Technology",
        requiredTechnicalSkills: ["JavaScript", "Python", "System Design", "Microservices"],
        requiredSoftSkills: ["Leadership", "Communication", "Mentoring", "Project Management"],
        preferredCertifications: ["Scrum Master", "PMP"],
        experienceLevel: "senior",
        salaryMin: 100000,
        salaryMax: 140000,
        workType: "Hybrid"
    },
    {
        id: 3,
        title: "Cloud Solutions Architect",
        description: "Design and implement cloud infrastructure solutions for enterprise clients",
        industry: "Technology",
        requiredTechnicalSkills: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform"],
        requiredSoftSkills: ["Strategic Thinking", "Communication", "Problem Solving"],
        preferredCertifications: ["AWS Solutions Architect", "Azure Solutions Architect"],
        experienceLevel: "senior",
        salaryMin: 110000,
        salaryMax: 160000,
        workType: "Remote"
    },
    {
        id: 4,
        title: "Frontend Developer",
        description: "Create engaging user interfaces and experiences using modern frontend technologies",
        industry: "Technology",
        requiredTechnicalSkills: ["JavaScript", "React", "CSS", "HTML", "TypeScript"],
        requiredSoftSkills: ["Creativity", "Attention to Detail", "Collaboration"],
        preferredCertifications: [],
        experienceLevel: "mid",
        salaryMin: 65000,
        salaryMax: 90000,
        workType: "Hybrid"
    },
    {
        id: 5,
        title: "DevOps Engineer",
        description: "Manage CI/CD pipelines, infrastructure automation, and deployment processes",
        industry: "Technology",
        requiredTechnicalSkills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Linux"],
        requiredSoftSkills: ["Problem Solving", "Automation Mindset", "Collaboration"],
        preferredCertifications: ["AWS DevOps Engineer", "Kubernetes Administrator"],
        experienceLevel: "mid",
        salaryMin: 80000,
        salaryMax: 115000,
        workType: "Remote"
    },
    {
        id: 6,
        title: "Data Scientist",
        description: "Analyze complex datasets to extract insights and build predictive models",
        industry: "Technology",
        requiredTechnicalSkills: ["Python", "R", "Machine Learning", "SQL", "Statistics"],
        requiredSoftSkills: ["Analytical Thinking", "Communication", "Problem Solving"],
        preferredCertifications: ["Google Cloud Professional Data Engineer", "AWS Certified Machine Learning"],
        experienceLevel: "mid",
        salaryMin: 90000,
        salaryMax: 130000,
        workType: "Hybrid"
    },
    {
        id: 7,
        title: "Product Manager",
        description: "Drive product strategy and coordinate cross-functional teams to deliver user-centric solutions",
        industry: "Technology",
        requiredTechnicalSkills: ["Product Analytics", "A/B Testing", "User Research", "Agile"],
        requiredSoftSkills: ["Strategic Thinking", "Leadership", "Communication", "Stakeholder Management"],
        preferredCertifications: ["Certified Scrum Product Owner", "Product Management Certificate"],
        experienceLevel: "mid",
        salaryMin: 95000,
        salaryMax: 135000,
        workType: "Hybrid"
    },
    {
        id: 8,
        title: "UX/UI Designer",
        description: "Design intuitive and engaging user experiences across digital platforms",
        industry: "Technology",
        requiredTechnicalSkills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
        requiredSoftSkills: ["Creativity", "Empathy", "Communication", "Collaboration"],
        preferredCertifications: ["Google UX Design Certificate", "Adobe Certified Expert"],
        experienceLevel: "mid",
        salaryMin: 70000,
        salaryMax: 100000,
        workType: "Hybrid"
    },
    {
        id: 9,
        title: "Cybersecurity Analyst",
        description: "Protect organizational assets by identifying and mitigating security threats",
        industry: "Technology",
        requiredTechnicalSkills: ["Network Security", "Incident Response", "SIEM", "Penetration Testing", "Risk Assessment"],
        requiredSoftSkills: ["Analytical Thinking", "Attention to Detail", "Communication"],
        preferredCertifications: ["CISSP", "CEH", "Security+"],
        experienceLevel: "mid",
        salaryMin: 75000,
        salaryMax: 110000,
        workType: "Hybrid"
    },
    {
        id: 10,
        title: "Mobile App Developer",
        description: "Develop native and cross-platform mobile applications for iOS and Android",
        industry: "Technology",
        requiredTechnicalSkills: ["React Native", "Swift", "Kotlin", "Flutter", "Mobile UI/UX"],
        requiredSoftSkills: ["Problem Solving", "Creativity", "Attention to Detail"],
        preferredCertifications: ["Google Associate Android Developer", "Apple iOS Development"],
        experienceLevel: "mid",
        salaryMin: 70000,
        salaryMax: 105000,
        workType: "Remote"
    }
];

// Career Paths Data
const careerPathsData = [
    {
        id: 1,
        name: "Engineering Management Track",
        description: "Leverage your technical skills and leadership potential",
        steps: [
            { title: "Senior Developer", duration: "1-2 years" },
            { title: "Tech Lead", duration: "2-3 years" },
            { title: "Engineering Manager", duration: "3+ years" }
        ],
        requiredSkills: ["Leadership", "Technical Skills", "Communication", "Project Management"],
        timeframe: "5-8 years",
        recommendationReason: "Strong technical foundation with leadership potential"
    },
    {
        id: 2,
        name: "Cloud Architecture Specialist",
        description: "Build expertise in cloud technologies and system design",
        steps: [
            { title: "Cloud Developer", duration: "1-2 years" },
            { title: "Solutions Architect", duration: "2-4 years" },
            { title: "Principal Architect", duration: "4+ years" }
        ],
        requiredSkills: ["Cloud Technologies", "System Design", "Architecture", "Problem Solving"],
        timeframe: "6-10 years",
        recommendationReason: "Growing demand for cloud expertise and high salary potential"
    },
    {
        id: 3,
        name: "Product Technology Lead",
        description: "Combine technical expertise with product strategy",
        steps: [
            { title: "Senior Developer", duration: "1-2 years" },
            { title: "Technical PM", duration: "2-3 years" },
            { title: "VP of Engineering", duration: "4+ years" }
        ],
        requiredSkills: ["Technical Skills", "Product Strategy", "Leadership", "Business Acumen"],
        timeframe: "6-9 years",
        recommendationReason: "High growth potential pathway combining technical and business skills"
    }
];

// Job Matching Engine
class JobMatchingEngine {
    calculateJobMatches(userProfile, availableJobs) {
        const matches = availableJobs.map(job => this.calculateSingleMatch(userProfile, job));
        return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
    }

    calculateSingleMatch(userProfile, job) {
        const technicalMatch = this.calculateSkillMatch(
            userProfile.technicalSkills,
            job.requiredTechnicalSkills
        );
        
        const softSkillMatch = this.calculateSkillMatch(
            userProfile.softSkills,
            job.requiredSoftSkills
        );
        
        const certificationMatch = this.calculateSkillMatch(
            userProfile.certifications,
            job.preferredCertifications
        );
        
        const experienceMatch = this.calculateExperienceMatch(
            userProfile.experienceLevel,
            job.experienceLevel
        );

        // Weighted scoring
        const technicalWeight = 0.4;
        const softSkillWeight = 0.25;
        const certificationWeight = 0.2;
        const experienceWeight = 0.15;

        const overallMatch = Math.round(
            technicalMatch.percentage * technicalWeight +
            softSkillMatch.percentage * softSkillWeight +
            certificationMatch.percentage * certificationWeight +
            experienceMatch * experienceWeight
        );

        const matchingSkills = [
            ...technicalMatch.matching,
            ...softSkillMatch.matching,
            ...certificationMatch.matching
        ];

        const reasoning = this.generateReasoning(
            technicalMatch,
            softSkillMatch,
            certificationMatch,
            experienceMatch,
            job.title
        );

        return {
            jobRole: job,
            matchPercentage: overallMatch,
            matchingSkills,
            reasoning
        };
    }

    calculateSkillMatch(userSkills, requiredSkills) {
        if (requiredSkills.length === 0) {
            return { percentage: 100, matching: [] };
        }

        const normalizedUserSkills = userSkills.map(s => s.toLowerCase().trim());
        const matching = [];

        for (const required of requiredSkills) {
            const normalizedRequired = required.toLowerCase().trim();
            
            // Exact match
            if (normalizedUserSkills.includes(normalizedRequired)) {
                matching.push(required);
                continue;
            }
            
            // Partial match (contains)
            const partialMatch = normalizedUserSkills.find(userSkill =>
                userSkill.includes(normalizedRequired) || normalizedRequired.includes(userSkill)
            );
            
            if (partialMatch) {
                matching.push(required);
            }
        }

        const percentage = Math.round((matching.length / requiredSkills.length) * 100);
        return { percentage, matching };
    }

    calculateExperienceMatch(userLevel, requiredLevel) {
        const levels = {
            'entry': 1,
            'mid': 2,
            'senior': 3,
            'executive': 4
        };

        const userLevelNum = levels[userLevel] || 1;
        const requiredLevelNum = levels[requiredLevel] || 1;

        if (userLevelNum >= requiredLevelNum) {
            return 100;
        } else if (userLevelNum === requiredLevelNum - 1) {
            return 75; // One level below
        } else {
            return 50; // More than one level below
        }
    }

    generateReasoning(technicalMatch, softSkillMatch, certificationMatch, experienceMatch, jobTitle) {
        const reasons = [];

        if (technicalMatch.percentage >= 80) {
            reasons.push(`Strong technical skill alignment (${technicalMatch.percentage}%)`);
        } else if (technicalMatch.percentage >= 60) {
            reasons.push(`Good technical foundation with ${technicalMatch.matching.length} matching skills`);
        } else {
            reasons.push(`Technical skills need development for this role`);
        }

        if (softSkillMatch.percentage >= 70) {
            reasons.push(`Excellent soft skills match`);
        }

        if (certificationMatch.percentage > 0) {
            reasons.push(`Relevant certifications: ${certificationMatch.matching.join(', ')}`);
        }

        if (experienceMatch >= 100) {
            reasons.push(`Experience level perfectly aligned`);
        } else if (experienceMatch >= 75) {
            reasons.push(`Experience level is suitable`);
        }

        return reasons.join('. ') + '.';
    }

    calculateProfileStrength(userProfile) {
        const technicalSkillsScore = Math.min(userProfile.technicalSkills.length * 10, 40);
        const softSkillsScore = Math.min(userProfile.softSkills.length * 8, 30);
        const certificationsScore = Math.min(userProfile.certifications.length * 15, 30);
        
        const baseScore = technicalSkillsScore + softSkillsScore + certificationsScore;
        return Math.min(baseScore, 100);
    }

    analyzeSkillGaps(userProfile, topJobs) {
        const allRequiredTechnical = new Set();
        const allRequiredSoft = new Set();
        const allPreferredCerts = new Set();

        // Collect all required skills from top job matches
        topJobs.forEach(job => {
            job.requiredTechnicalSkills.forEach(skill => allRequiredTechnical.add(skill));
            job.requiredSoftSkills.forEach(skill => allRequiredSoft.add(skill));
            job.preferredCertifications.forEach(cert => allPreferredCerts.add(cert));
        });

        // Calculate strengths
        const strengthSkills = [
            ...userProfile.technicalSkills.map(skill => ({ skill, level: 85, category: 'technical' })),
            ...userProfile.softSkills.map(skill => ({ skill, level: 80, category: 'soft' })),
            ...userProfile.certifications.map(skill => ({ skill, level: 90, category: 'certification' }))
        ];

        // Calculate improvement areas
        const improvementAreas = [];
        
        const missingTechnical = Array.from(allRequiredTechnical).filter(
            skill => !userProfile.technicalSkills.some(userSkill => 
                userSkill.toLowerCase().includes(skill.toLowerCase())
            )
        );

        const missingSoft = Array.from(allRequiredSoft).filter(
            skill => !userProfile.softSkills.some(userSkill => 
                userSkill.toLowerCase().includes(skill.toLowerCase())
            )
        );

        const missingCerts = Array.from(allPreferredCerts).filter(
            cert => !userProfile.certifications.some(userCert => 
                userCert.toLowerCase().includes(cert.toLowerCase())
            )
        );

        // Add improvement recommendations
        missingTechnical.slice(0, 3).forEach(skill => {
            improvementAreas.push({
                skill,
                level: 30,
                recommendation: `Learn ${skill} to increase job opportunities`
            });
        });

        missingSoft.slice(0, 2).forEach(skill => {
            improvementAreas.push({
                skill,
                level: 40,
                recommendation: `Develop ${skill} through practice and training`
            });
        });

        missingCerts.slice(0, 2).forEach(cert => {
            improvementAreas.push({
                skill: cert,
                level: 20,
                recommendation: `Consider pursuing ${cert} certification`
            });
        });

        // Generate learning path
        const learningPath = [];
        if (missingCerts.length > 0) {
            learningPath.push(`${missingCerts[0]} Certification`);
        }
        if (missingTechnical.length > 0) {
            learningPath.push(`${missingTechnical[0]} Training`);
        }
        learningPath.push("System Design Course");

        return {
            strengthSkills,
            improvementAreas,
            learningPath
        };
    }
}

// Initialize the job matching engine
const jobMatchingEngine = new JobMatchingEngine();