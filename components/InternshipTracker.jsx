import React, { useState, useEffect } from "react";

const ProfileStrengthMeter = () => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const tech = document.getElementById("technicalSkillInput")?.value.trim();
    const soft = document.getElementById("softSkillInput")?.value.trim();
    const cert = document.getElementById("certificationInput")?.value.trim();
    const exp = document.getElementById("experienceLevel")?.value;

    let score = 0;
    if (tech) score += 25;
    if (soft) score += 25;
    if (cert) score += 25;
    if (exp) score += 25;

    setStrength(score);
  });

  return (
    <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
      <h3>💪 Profile Strength</h3>
      <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{strength}%</div>
      <div className="progress-bar" style={{ background: "#eee", height: "8px" }}>
        <div
          style={{
            width: `${strength}%`,
            background: "#22c55e",
            height: "100%",
            transition: "0.5s",
          }}
        />
      </div>
    </div>
  );
};

export default ProfileStrengthMeter;
