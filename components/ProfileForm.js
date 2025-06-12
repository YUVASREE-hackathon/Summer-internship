// components/ProfileForm.js
import React, { useState } from 'react';

const ProfileForm = ({ onAnalyze }) => {
  const [userProfile, setUserProfile] = useState({
    technicalSkills: [],
    softSkills: [],
    certifications: [],
    experience: 0,
  });

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

  const handleAnalyze = () => {
    onAnalyze(userProfile);
  };

  return (
    <div className="form-container">
      <h2>🧠 Build Your Career Profile</h2>

      <label>Technical Skills</label>
      <div className="skill-input-group">
        <input type="text" id="technicalSkillInput" className="form-input" placeholder="e.g., JavaScript, Python" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('technical'))} />
        <button onClick={() => addSkill('technical')} className="btn btn-outline btn-small"><i className="fas fa-plus"></i></button>
      </div>
      <div className="skills-display">
        {userProfile.technicalSkills.map(skill => (
          <div key={skill} className="skill-tag skill-tag-technical">
            {skill} <button onClick={() => removeSkill('technical', skill)}><i className="fas fa-times"></i></button>
          </div>
        ))}
      </div>

      <label>Soft Skills</label>
      <div className="skill-input-group">
        <input type="text" id="softSkillInput" className="form-input" placeholder="e.g., Communication" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('soft'))} />
        <button onClick={() => addSkill('soft')} className="btn btn-outline btn-small"><i className="fas fa-plus"></i></button>
      </div>
      <div className="skills-display">
        {userProfile.softSkills.map(skill => (
          <div key={skill} className="skill-tag skill-tag-soft">
            {skill} <button onClick={() => removeSkill('soft', skill)}><i className="fas fa-times"></i></button>
          </div>
        ))}
      </div>

      <label>Certifications</label>
      <div className="skill-input-group">
        <input type="text" id="certificationSkillInput" className="form-input" placeholder="e.g., AWS Certified, PMP" onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('certification'))} />
        <button onClick={() => addSkill('certification')} className="btn btn-outline btn-small"><i className="fas fa-plus"></i></button>
      </div>
      <div className="skills-display">
        {userProfile.certifications.map(skill => (
          <div key={skill} className="skill-tag skill-tag-certification">
            {skill} <button onClick={() => removeSkill('certification', skill)}><i className="fas fa-times"></i></button>
          </div>
        ))}
      </div>

      <label>Years of Experience</label>
      <input type="number" className="form-input" value={userProfile.experience} onChange={(e) => setUserProfile({ ...userProfile, experience: parseInt(e.target.value) })} min="0" />

      <button className="btn" onClick={handleAnalyze}>Analyze My Profile</button>
    </div>
  );
};

export default ProfileForm;