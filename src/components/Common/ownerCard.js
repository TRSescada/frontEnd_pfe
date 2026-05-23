// src/components/Common/ownerCard.js
import React, { useState, useEffect } from "react";

export default function OwnerCard({ ownerId, restaurantId }) {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  // Données fictives simplifiées (seulement nom, restaurant et bio)
  const ownersData = {
    1: {
      id: 1,
      name: "Ahmed Benali",
      restaurant: "Restaurant Andalous",
      bio: "Passionné par la cuisine traditionnelle algérienne, j'ai fondé le Restaurant Andalous pour faire découvrir les saveurs authentiques de notre terroir.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
    },
    2: {
      id: 2,
      name: "Jean Dupont",
      restaurant: "Café Parisien",
      bio: "Passionné par l'art du café et la pâtisserie française, j'ai ouvert le Café Parisien pour offrir une expérience authentique aux amateurs de bonne cuisine.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
    },
    3: {
      id: 3,
      name: "Marco Rossi",
      restaurant: "La Piazza Italia",
      bio: "Je perpétue la tradition culinaire italienne familiale depuis trois générations. Chaque plat raconte une histoire d'amour pour la cuisine italienne.",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
    },
    4: {
      id: 4,
      name: "Kenji Tanaka",
      restaurant: "Sushi Master",
      bio: "Formé au Japon dans la plus pure tradition des maîtres sushi, je vous invite à découvrir l'art du sushi authentique dans mon établissement.",
      image: "https://randomuser.me/api/portraits/men/89.jpg",
      coverImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c"
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (ownerId && ownersData[ownerId]) {
        setOwner(ownersData[ownerId]);
      } else if (restaurantId) {
        const foundOwner = Object.values(ownersData).find(o => o.restaurantId === restaurantId);
        setOwner(foundOwner || null);
      }
      setLoading(false);
    }, 500);
  }, [ownerId, restaurantId]);

  if (loading) {
    return (
      <div className="owner-card-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du profil propriétaire...</p>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="owner-card-error">
        <div className="error-icon">👤</div>
        <p>Propriétaire non trouvé</p>
      </div>
    );
  }

  // Style simplifié - toutes les informations sensibles ont été supprimées
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
    
    /* Nouveau bouton - c'est VOTRE bouton */
    .custom-owner-btn {
      display: block;
      width: calc(100% - 32px);
      margin: 0 16px 20px;
      padding: 10px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
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
      background: linear-gradient(135deg, #2563eb, #1e40af);
      box-shadow: 0 4px 12px rgba(59,130,246,0.4);
    }
    
    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(34,197,94,0.2);
      border-top-color: #22c55e;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 20px auto;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .owner-card-loading, .owner-card-error {
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
        <div className="owner-cover" style={{ backgroundImage: `url(${owner.coverImage})` }}></div>
        
        <div className="owner-avatar-wrapper">
          <img src={owner.image} alt={owner.name} className="owner-avatar" />
        </div>
        
        <h3 className="owner-name">{owner.name}</h3>
        
        <div className="owner-restaurant">
          <span>🍽️</span>
          <span>{owner.restaurant}</span>
        </div>
        
        <p className="owner-bio">{owner.bio}</p>
        
        {/*
          ████████ NOUVEAU BOUTON ████████
          Ce bouton remplace complètement l'ancien.
          Vous pouvez modifier le texte ou ajouter n'importe quelle fonction onClick.
        */}
        <button 
          className="custom-owner-btn"
          onClick={() => {
            // Ici, vous pouvez mettre n'importe quel code que vous voulez
            // Exemple: window.location.href = `/profile/${owner.id}`;
            // Ou ouvrir une discussion, afficher un message, etc.
            console.log("Le bouton personnalisé a été cliqué", owner.name);
            alert(`Bienvenue sur le profil de ${owner.name}`);
          }}
        >
          📞 Contacter le propriétaire
        </button>
      </div>
    </>
  );
}