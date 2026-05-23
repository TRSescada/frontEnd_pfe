// src/components/Common/socialFooter.js
import React from "react";

export default function SocialFooter({ socialLinks }) {
  const styles = `
    .social-footer {
      position: fixed;
      bottom: 20px;
      left: 0;
      right: 0;
      z-index: 50;
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    
    .social-icon {
      transition: all 0.3s ease;
      font-size: 1.2rem;
    }
    
    .social-icon:hover {
      transform: scale(1.15);
    }
    
    @media (max-width: 768px) {
      .social-footer {
        gap: 15px;
        bottom: 15px;
      }
      
      .social-icon {
        font-size: 1rem;
      }
    }
  `;

  const getIconColor = (platform) => {
    switch(platform) {
      case 'facebook': return '#3b5998';
      case 'instagram': return '#e4405f';
      case 'twitter': return '#1da1f2';
      case 'linkedin': return '#0077b5';
      case 'tiktok': return '#000000';
      default: return '#22c55e';
    }
  };

  const getIconClass = (platform) => {
    switch(platform) {
      case 'facebook': return 'fab fa-facebook-f';
      case 'instagram': return 'fab fa-instagram';
      case 'twitter': return 'fab fa-twitter';
      case 'linkedin': return 'fab fa-linkedin-in';
      case 'tiktok': return 'fab fa-tiktok';
      default: return 'fas fa-link';
    }
  };

  const activeLinks = Object.entries(socialLinks || {}).filter(([_, url]) => url && url.trim() !== "");

  if (activeLinks.length === 0) {
    return null;
  }

  return (
    <>
      <style>{styles}</style>
      <div className="social-footer">
        {activeLinks.map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            style={{ color: getIconColor(platform) }}
          >
            <i className={getIconClass(platform)}></i>
          </a>
        ))}
      </div>
    </>
  );
}