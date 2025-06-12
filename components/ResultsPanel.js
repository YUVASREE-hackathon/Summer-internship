// components/ResultsPanel.js
import React, { useEffect, useState } from 'react';

const ResultsPanel = ({ profile }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!profile) return;

    const timeout = setTimeout(() => {
      const matchedJobs = [
        'Frontend Developer',
        'Data Analyst',
        'AI Research Assistant',
        'Cloud Engineer',
      ].filter((job, i) => i < profile.technicalSkills.length);

      const recommendations = profile.certifications.includes('AWS Certified')
        ? ['DevOps Engineer Path', 'AWS Cloud Practitioner Course']
        : ['LinkedIn Learning: Python Dev Path'];

      setResult({
        matchedJobs,
        recommendations,
        summary: `Based on your ${profile.experience} years of experience, you've unlocked promising roles.`
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [profile]);

  if (!result) return null;

  return (
    <div className="results-panel">
      <h3>🔍 Job Match Results</h3>
      <p>{result.summary}</p>

      <h4>Top Roles:</h4>
      <ul>
        {result.matchedJobs.map(job => (
          <li key={job}>{job}</li>
        ))}
      </ul>

      <h4>Recommended Learning Path:</h4>
      <ul>
        {result.recommendations.map(course => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPanel;
