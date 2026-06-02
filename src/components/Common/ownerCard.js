// src/components/Common/ownerCard.js
import React from "react";

export default function OwnerCard({ owner, onViewProfile }) {
  if (!owner) {
    return (
      <div className="owner-card-error">
        <div className="error-icon">👤</div>
        <p>Propriétaire non trouvé</p>
      </div>
    );
  }

  const user = owner.user || {};
  const restaurant = owner.restaurants?.[0];
  const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Propriétaire';
  const restaurantName = restaurant?.name || 'Aucun restaurant';
  const bio = user.bio || restaurant?.description || '';
  const image = user.image || restaurant?.logo || 'https://randomuser.me/api/portraits/men/32.jpg';
  const coverImage = restaurant?.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4';

  const styles = `
    .owner-card-simplified {
      background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
      border-radius: 24px;
      border: 1px solid rgba(34, 197, 94, 0.3);
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      max-width: 320px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    
    .owner-card-simplified:hover {
      transform: translateY(-4px);
      border-color: #22c55e;
      box-shadow: 0 15px 35px rgba(34, 197, 94, 0.15);
    }
    
    .owner-cover {
      height: 100px;
      background-size: cover;
      background-position: center;
    }
    
    .owner-avatar-wrapper {
      text-align: center;
      margin-top: -40px;
      margin-bottom: 12px;
    }
    
    .owner-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid #22c55e;
      background: #1a1a3a;
      object-fit: cover;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .owner-name {
      font-size: 1.3rem;
      font-weight: bold;
      color: white;
      text-align: center;
      margin: 8px 0 4px;
    }
    
    .owner-restaurant {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-bottom: 12px;
      font-size: 0.85rem;
      color: #22c55e;
      font-weight: 500;
    }
    
    .owner-bio {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.7);
      line-height: 1.5;
      padding: 0 16px;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .custom-owner-btn {
      display: block;
      width: calc(100% - 32px);
      margin: 0 16px 20px;
      padding: 10px;
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      border-radius: 40px;
      color: white;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
    }
    
    .custom-owner-btn:hover {
      transform: scale(1.02);
      background: linear-gradient(135deg, #16a34a, #15803d);
      box-shadow: 0 4px 12px rgba(34,197,94,0.4);
    }
    
    .owner-card-error {
      background: rgba(255,255,255,0.05);
      border-radius: 20px;
      padding: 24px;
      text-align: center;
      color: rgba(255,255,255,0.6);
      max-width: 320px;
    }
    
    .error-icon {
      font-size: 2.5rem;
      margin-bottom: 8px;
      opacity: 0.6;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      <div className="owner-card-simplified">
        <div className="owner-cover" style={{ backgroundImage: `url(${coverImage})` }}></div>
        
        <div className="owner-avatar-wrapper">
          <img src={image} alt={name} className="owner-avatar" />
        </div>
        
        <h3 className="owner-name">{name}</h3>
        
        <div className="owner-restaurant">
          <span>🍽️</span>
          <span>{restaurantName}</span>
        </div>
        
        {bio && <p className="owner-bio">{bio}</p>}
        
        <button 
          className="custom-owner-btn"
          onClick={() => onViewProfile && onViewProfile(owner)}
        >
          📞 Contacter le propriétaire
        </button>
      </div>
    </>
  );
}
