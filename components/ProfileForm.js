import { useState } from "react";
import { jobRolesData } from "@/data/data";

function getMatchingJobs(profile) {
  return jobRolesData.map((job) => {
    const matchedSkills = job.requiredSkills.filter(skill =>
      [...profile.technicalSkills, ...profile.softSkills].some(
        userSkill =>
          skill.toLowerCase().includes(userSkill.toLowerCase()) ||
          userSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    const matchPercentage = Math.round(
      (matchedSkills.length / job.requiredSkills.length) * 100
    );
    return {
      ...job,
      matchedSkills,
      matchPercentage,
    };
  }).filter(job => job.matchPercentage >= 50) // Optional: only show jobs >= 50% match
    .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort high to low
}

export default function ProfileForm() {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");

  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [certInput, setCertInput] = useState("");

  const handleAddSkill = (type, value) => {
    value = value.trim();
    if (!value) return;

    if (type === "technical" && !technicalSkills.includes(value)) {
      setTechnicalSkills([...technicalSkills, value]);
    }
    if (type === "soft" && !softSkills.includes(value)) {
      setSoftSkills([...softSkills, value]);
    }
    if (type === "certification" && !certifications.includes(value)) {
      setCertifications([...certifications, value]);
    }
  };

  const handleRemoveSkill = (type, value) => {
    if (type === "technical")
      setTechnicalSkills(technicalSkills.filter((s) => s !== value));
    if (type === "soft") setSoftSkills(softSkills.filter((s) => s !== value));
    if (type === "certification")
      setCertifications(certifications.filter((s) => s !== value));
  };

  const validate = () => {
    const newErrors = {};
    if (technicalSkills.length === 0)
      newErrors.technical = "Add at least one technical skill.";
    if (softSkills.length === 0)
      newErrors.soft = "Add at least one soft skill.";
    if (!experienceLevel)
      newErrors.experience = "Select your experience level.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsAnalyzing(true);
    setAnalysisDone(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsAnalyzing(false);
    setAnalysisDone(true);
  };

  const SkillInput = ({ label, type, skills, setInput, input }) => (
    <div className="form-group">
      <label>{label}</label>
      <div className="skill-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSkill(type, input);
              setInput("");
            }
          }}
          placeholder={`Add ${type} skill...`}
          className="form-input"
        />
        <button
          type="button"
          className="btn btn-outline btn-small"
          onClick={() => {
            handleAddSkill(type, input);
            setInput("");
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="skills-display">
        {skills.map((skill) => (
          <div key={skill} className={`skill-tag skill-tag-${type}`}>
            {skill}
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemoveSkill(type, skill)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {errors[type] && <p className="error-message">{errors[type]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="skills-form">
      <h2>Your Profile</h2>

      <SkillInput
        label="Technical Skills"
        type="technical"
        skills={technicalSkills}
        input={techInput}
        setInput={setTechInput}
      />

      <SkillInput
        label="Soft Skills"
        type="soft"
        skills={softSkills}
        input={softInput}
        setInput={setSoftInput}
      />

      <SkillInput
        label="Certifications"
        type="certification"
        skills={certifications}
        input={certInput}
        setInput={setCertInput}
      />

      <div className="form-group">
        <label>Experience Level</label>
        <select
          className="form-select"
          value={experienceLevel}
          onChange={(e) => {
            setExperienceLevel(e.target.value);
            setErrors((prev) => ({ ...prev, experience: "" }));
          }}
        >
          <option value="">Select experience level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
        {errors.experience && <p className="error-message">{errors.experience}</p>}
      </div>

      <button className="btn btn-primary btn-large" type="submit" disabled={isAnalyzing}>
        {isAnalyzing ? "Analyzing..." : "Analyze My Profile"}
      </button>

      {analysisDone && (
        <div className="analysis-results">
          <h3>🎉 Analysis Complete!</h3>
          <p>Your profile has been analyzed. Job matches will appear here.</p>
        </div>
      )}
{analysisDone && matchingJobs.length > 0 && (
  <div className="job-results">
    <h3>Top Job Matches</h3>
    {matchingJobs.map((job, index) => (
      <div key={index} className="job-card">
        <h4>{job.title} <span className="badge">{job.matchPercentage}% Match</span></h4>
        <p>{job.description}</p>
        <p><strong>Industry:</strong> {job.industry}</p>
        <p><strong>Work Type:</strong> {job.workType}</p>
        <p><strong>Salary:</strong> ${job.salaryMin / 1000}K - ${job.salaryMax / 1000}K</p>
        <div className="skill-tags">
          {job.matchedSkills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
)}

    </form>
  );
}
