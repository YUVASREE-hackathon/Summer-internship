import { useState } from "react";

export default function ProfileForm() {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");

  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

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
    if (type === "technical") setTechnicalSkills(technicalSkills.filter(s => s !== value));
    if (type === "soft") setSoftSkills(softSkills.filter(s => s !== value));
    if (type === "certification") setCertifications(certifications.filter(s => s !== value));
  };

  const validate = () => {
    const newErrors = {};
    if (technicalSkills.length === 0) newErrors.technical = "Add at least one technical skill.";
    if (softSkills.length === 0) newErrors.soft = "Add at least one soft skill.";
    if (!experienceLevel) newErrors.experience = "Select your experience level.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsAnalyzing(true);
    setAnalysisDone(false);

    // Simulate async analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsAnalyzing(false);
    setAnalysisDone(true);
  };

  const SkillInput = ({ label, type, skills, setInput, input }) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddSkill(type, input);
            setInput("");
          }
        }}
        placeholder={`Add ${type} skill...`}
        className="form-input"
      />
      <div className="skills-display">
        {skills.map(skill => (
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

  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");
  const [certInput, setCertInput] = useState("");

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
    </form>
  );
}
