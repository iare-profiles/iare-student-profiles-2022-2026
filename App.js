import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  const loadProfile = () => {
    if (!rollNumber) {
      setError('Please enter a roll number.');
      return;
    }

    const formattedRollNumber = rollNumber.toUpperCase();

    // Define profile and certificates
    const profilePhotoURL = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${formattedRollNumber}/${formattedRollNumber}.jpg`;
    const certificates = [
      {
        id: 'ssc',
        title: 'SSC Certificate',
        url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${formattedRollNumber}/DOCS/${formattedRollNumber}_SSC.jpg`,
      },
      {
        id: 'inter',
        title: 'Intermediate Certificate',
        url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${formattedRollNumber}/DOCS/${formattedRollNumber}_INTER.jpg`,
      },
      {
        id: 'aadhar',
        title: 'Aadhar Card',
        url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${formattedRollNumber}/DOCS/${formattedRollNumber}_Aadhar.jpg`,
      },
      {
        id: 'eamcet',
        title: 'EAMCET Rank Card',
        url: `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${formattedRollNumber}/DOCS/${formattedRollNumber}_EAMCET_RANK.jpg`,
      },
    ];

    setProfileData({ profilePhotoURL, certificates });
    setError('');
  };

  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <img src="https://aksha.iare.ac.in/images/IARE_logo_black.png" alt="IARE Logo" />
        </div>
        <h1>Student Profile Viewer</h1>
      </header>
      <main>
        <div className="input-container">
          <label htmlFor="rollNumber">Enter Roll Number:</label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Roll Number"
          />
          <button onClick={loadProfile}>Load Profile</button>
        </div>
        {error && <div className="error">{error}</div>}
        {profileData && (
          <>
            <nav id="navbar">
              <a href="#profilePhoto">Profile Photo</a>
              {profileData.certificates.map((cert) => (
                <a href={`#${cert.id}`} key={cert.id}>
                  {cert.title}
                </a>
              ))}
            </nav>
            <div id="content">
              <section id="profilePhoto" className="active-section">
                <h2>Profile Photo</h2>
                <img src={profileData.profilePhotoURL} alt="Profile Photo" />
              </section>
              {profileData.certificates.map((cert) => (
                <section id={cert.id} key={cert.id}>
                  <h2>{cert.title}</h2>
                  <img src={cert.url} alt={cert.title} />
                </section>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
