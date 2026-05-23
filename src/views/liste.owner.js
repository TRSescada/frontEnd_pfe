// src/views/liste.owner.js
import React, { useState } from "react";
import FooterRecharche from "../components/Footers/footer.recharche";
import Navbar from "../components/Navbars/IndexNavbar";
import OwnerCard from "components/Common/ownerCard.js";
import { useHistory } from "react-router-dom";

export default function ListeOwner() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "Ahmed Benali",
      role: "Propriétaire & Gérant",
      restaurant: "Restaurant Andalous",
      restaurantId: 1,
      email: "ahmed.benali@andalus.dz",
      phone: "+213 5 55 55 55 55",
      location: "Alger, Algérie",
      experience: "15 ans d'expérience",
      bio: "Passionné par la cuisine traditionnelle algérienne, j'ai fondé le Restaurant Andalous pour faire découvrir les saveurs authentiques de notre terroir.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      joinDate: "2010",
      employees: 12,
      rating: 4.8,
      socialLinks: {
        facebook: "https://facebook.com/ahmed.benali",
        instagram: "https://instagram.com/ahmed.benali",
        linkedin: "https://linkedin.com/in/ahmed-benali"
      },
      achievements: [
        "🏆 Meilleur restaurant traditionnel 2022",
        "⭐ Certification qualité 5 étoiles",
        "👨‍🍳 Chef formateur certifié"
      ]
    },
    {
      id: 2,
      name: "Jean Dupont",
      role: "Fondateur & Chef",
      restaurant: "Café Parisien",
      restaurantId: 2,
      email: "jean.dupont@cafeparisien.fr",
      phone: "+33 6 12 34 56 78",
      location: "Paris, France",
      experience: "20 ans d'expérience",
      bio: "Passionné par l'art du café et la pâtisserie française, j'ai ouvert le Café Parisien pour offrir une expérience authentique aux amateurs de bonne cuisine.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
      joinDate: "2005",
      employees: 8,
      rating: 4.5,
      socialLinks: {
        facebook: "https://facebook.com/jean.dupont",
        instagram: "https://instagram.com/jean.dupont",
        twitter: "https://twitter.com/jean.dupont"
      },
      achievements: [
        "🏆 Meilleur café de Paris 2020",
        "⭐ Élu pâtissier de l'année 2021"
      ]
    },
    {
      id: 3,
      name: "Marco Rossi",
      role: "Chef Italien & Propriétaire",
      restaurant: "La Piazza Italia",
      restaurantId: 3,
      email: "marco.rossi@lapiazza.it",
      phone: "+39 6 12 34 56 78",
      location: "Rome, Italie",
      experience: "25 ans d'expérience",
      bio: "Je perpétue la tradition culinaire italienne familiale depuis trois générations. Chaque plat raconte une histoire d'amour pour la cuisine italienne.",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      joinDate: "1998",
      employees: 15,
      rating: 4.7,
      socialLinks: {
        facebook: "https://facebook.com/marco.rossi",
        instagram: "https://instagram.com/marco.rossi",
        linkedin: "https://linkedin.com/in/marco-rossi"
      },
      achievements: [
        "🏆 Étoile Michelin 2019",
        "⭐ Meilleur restaurant italien de Rome",
        "👨‍🍳 Maître cuisinier d'Italie"
      ]
    },
    {
      id: 4,
      name: "Kenji Tanaka",
      role: "Maître Sushi & Propriétaire",
      restaurant: "Sushi Master",
      restaurantId: 4,
      email: "kenji.tanaka@sushimaster.jp",
      phone: "+81 3 12 34 56 78",
      location: "Tokyo, Japon",
      experience: "30 ans d'expérience",
      bio: "Formé au Japon dans la plus pure tradition des maîtres sushi, je vous invite à découvrir l'art du sushi authentique dans mon établissement.",
      image: "https://randomuser.me/api/portraits/men/89.jpg",
      coverImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      joinDate: "1995",
      employees: 20,
      rating: 4.9,
      socialLinks: {
        facebook: "https://facebook.com/kenji.tanaka",
        instagram: "https://instagram.com/kenji.tanaka",
        twitter: "https://twitter.com/kenji.tanaka"
      },
      achievements: [
        "🏆 Meilleur sushi chef du Japon 2018",
        "⭐ 3 étoiles au guide gastronomique",
        "👨‍🍳 Ambassadeur de la cuisine japonaise"
      ]
    },
    {
      id: 5,
      name: "Sophia Martinez",
      role: "Propriétaire & Cheffe Pâtissière",
      restaurant: "Délices Sucrés",
      restaurantId: 5,
      email: "sophia@delicessucres.fr",
      phone: "+33 6 98 76 54 32",
      location: "Lyon, France",
      experience: "12 ans d'expérience",
      bio: "La pâtisserie est mon art. J'ai ouvert Délices Sucrés pour partager mes créations uniques alliant tradition et modernité.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      coverImage: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2",
      joinDate: "2013",
      employees: 6,
      rating: 4.9,
      socialLinks: {
        facebook: "https://facebook.com/sophia.martinez",
        instagram: "https://instagram.com/sophia.martinez"
      },
      achievements: [
        "🏆 Meilleure pâtissière de Lyon 2021",
        "⭐ Prix d'excellence 2022"
      ]
    }
  ]);

  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openOwnerModal = (owner) => {
    setSelectedOwner(owner);
    setShowModal(true);
  };

  const goToOwnerProfile = () => {
    if (selectedOwner) {
      setShowModal(false);
      history.push(`/owner/${selectedOwner.id}`);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const style = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    
    .owners-container {
      background: linear-gradient(135deg, #0a0a2a, #1a1a3a, #0d0d2b);
      min-height: 100vh;
      padding-top: 80px;
      padding-bottom: 80px;
    }
    
    .owners-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.95);
      backdrop-filter: blur(12px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
      background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
      border-radius: 30px;
      padding: 0;
      max-width: 550px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
      animation: zoomIn 0.3s ease;
    }
    
    .modal-cover {
      height: 150px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    
    .modal-avatar {
      position: absolute;
      bottom: -50px;
      left: 30px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #22c55e;
      background: #1a1a3a;
      object-fit: cover;
    }
    
    .modal-body {
      padding: 60px 25px 25px;
    }
    
    .modal-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      margin-bottom: 5px;
    }
    
    .modal-role {
      font-size: 0.9rem;
      color: #22c55e;
      margin-bottom: 10px;
    }
    
    .modal-restaurant {
      display: inline-block;
      background: rgba(34,197,94,0.2);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      color: #22c55e;
      margin-bottom: 15px;
    }
    
    .modal-info {
      margin: 20px 0;
    }
    
    .info-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      color: rgba(255,255,255,0.7);
      font-size: 0.85rem;
    }
    
    .info-icon {
      width: 25px;
      color: #22c55e;
    }
    
    .modal-achievements {
      background: rgba(34,197,94,0.1);
      border-radius: 15px;
      padding: 12px;
      margin: 15px 0;
    }
    
    .achievement-title {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
      margin-bottom: 8px;
    }
    
    .achievement-item {
      font-size: 0.75rem;
      color: #22c55e;
      padding: 3px 0;
    }
    
    .btn-visit {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      padding: 12px 25px;
      border-radius: 30px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
      margin-top: 20px;
      transition: all 0.3s;
    }
    
    .btn-visit:hover {
      transform: scale(1.02);
      box-shadow: 0 5px 20px rgba(34,197,94,0.4);
    }
    
    .close-btn {
      position: absolute;
      top: 15px;
      right: 20px;
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      z-index: 10;
    }
    
    .close-btn:hover {
      color: #ef4444;
    }
    
    .empty-state {
      text-align: center;
      padding: 50px;
      color: rgba(255,255,255,0.5);
    }
    
    .empty-state-icon {
      font-size: 4rem;
      margin-bottom: 15px;
      opacity: 0.5;
    }
    
    .stats-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,0.1);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.7);
      margin-right: 8px;
    }
    
    @media (max-width: 768px) {
      .owners-grid {
        grid-template-columns: 1fr;
        padding: 15px;
      }
      
      .modal-body {
        padding: 60px 20px 20px;
      }
      
      .modal-name {
        font-size: 1.2rem;
      }
    }
  `;

  return (
    <>
      <style>{style}</style>
      <Navbar />
      
      <div className="owners-container">
        <div className="owners-grid">
          {filteredOwners.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <p>Aucun propriétaire trouvé</p>
              <p style={{ fontSize: '0.8rem' }}>Essayez une autre recherche</p>
            </div>
          ) : (
            filteredOwners.map(owner => (
              <OwnerCard 
                key={owner.id}
                ownerId={owner.id}
                onViewProfile={(selectedOwner) => {
                  setSelectedOwner(selectedOwner);
                  setShowModal(true);
                }}
              />
            ))
          )}
        </div>
      </div>
      
      <FooterRecharche 
        type="owners"
        onSearch={handleSearch}
        placeholder="🔍 Rechercher un propriétaire par nom, restaurant, ville ou rôle..."
      />
      
      {/* Modal détails propriétaire */}
      {showModal && selectedOwner && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            
            <div className="modal-cover" style={{ backgroundImage: `url(${selectedOwner.coverImage})` }}>
              <img src={selectedOwner.image} alt={selectedOwner.name} className="modal-avatar" />
            </div>
            
            <div className="modal-body">
              <h2 className="modal-name">{selectedOwner.name}</h2>
              <p className="modal-role">{selectedOwner.role}</p>
              <div className="modal-restaurant">🏪 {selectedOwner.restaurant}</div>
              
              <div className="modal-info">
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span>{selectedOwner.location}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📅</span>
                  <span>Membre depuis {selectedOwner.joinDate}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">⭐</span>
                  <span>Note moyenne: {selectedOwner.rating}/5</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">👥</span>
                  <span>{selectedOwner.employees} employés</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📧</span>
                  <span>{selectedOwner.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📞</span>
                  <span>{selectedOwner.phone}</span>
                </div>
              </div>
              
              {selectedOwner.achievements && selectedOwner.achievements.length > 0 && (
                <div className="modal-achievements">
                  <div className="achievement-title">🏆 Réalisations</div>
                  {selectedOwner.achievements.map((achievement, idx) => (
                    <div key={idx} className="achievement-item">{achievement}</div>
                  ))}
                </div>
              )}
              
              <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '0.85rem' }}>
                {selectedOwner.bio}
              </p>
              
              <button className="btn-visit" onClick={goToOwnerProfile}>
                👤 Voir le profil complet de {selectedOwner.name.split(' ')[0]} →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}