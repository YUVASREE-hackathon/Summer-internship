import React, { useState, useEffect } from "react";

const dummyJobs = [
  { role: "Frontend Developer", skill: "React" },
  { role: "Backend Developer", skill: "Node" },
  { role: "Data Scientist", skill: "Python" },
  { role: "DevOps Engineer", skill: "Docker" },
  { role: "AI Engineer", skill: "Machine Learning" },
];

const LiveJobSuggestions = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (keyword.trim() === "") {
      setSuggestions([]);
    } else {
      const matches = dummyJobs.filter((job) =>
        job.skill.toLowerCase().includes(keyword.toLowerCase())
      );
      setSuggestions(matches);
    }
  }, [keyword]);

  return (
    <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
      <h3>🧠 AI Job Suggestions</h3>
      <input
        type="text"
        placeholder="Type a skill (e.g., React, Python)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((job, i) => <li key={i}>🔍 {job.role}</li>)
        ) : (
          <li>No suggestions yet...</li>
        )}
      </ul>
    </div>
  );
};

export default LiveJobSuggestions;
