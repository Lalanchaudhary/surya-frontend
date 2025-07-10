import React from 'react';
import eggless from '../assets/suryalogo.png'
const APK_URL = 'https://surya-4t37w0cq8-lalan-chaudharys-projects.vercel.app/SuryaCake.apk';

const Download = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div  style={{ background: 'white', padding: '2.5rem 2rem', borderRadius: '1.5rem', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <img src={eggless} className='m-auto' alt="EgglessCake App" style={{ width: 180, marginBottom: 24 }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>Download SuryaCake App</h1>
        <p style={{ color: '#555', marginBottom: 28 }}>
          Get the best cakes delivered to your doorstep! Download our Android app now.
        </p>
        <a
          href={APK_URL}
          download
          style={{
            display: 'inline-block',
            background: '#e098b0',
            color: 'white',
            fontWeight: 600,
            fontSize: '1.1rem',
            padding: '0.9rem 2.2rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            marginBottom: 18,
            boxShadow: '0 2px 8px rgba(224,152,176,0.12)'
          }}
        >
          Download APK
        </a>
        <div style={{ color: '#888', fontSize: '0.95rem', marginTop: 16 }}>
          <span role="img" aria-label="info">ℹ️</span> Only for Android devices.<br />
          If the download doesn't start, <a href={APK_URL} style={{ color: '#e098b0', textDecoration: 'underline' }}>click here</a>.
        </div>
      </div>
    </div>
  );
};

export default Download;
