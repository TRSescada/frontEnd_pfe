// src/views/liste.restaurant.js
import React, { useState } from "react";
import FooterRecharche from "../components/Footers/footer.recharche";
import Navbar from "../components/Navbars/AdminNavbar";
import RestaurantCard from "components/Common/restaurantCard.js";
import { useHistory } from "react-router-dom";

export default function ListeRestaurant() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Restaurant Andalous",
      location: "Alger, Algérie",
      description: "Les meilleurs plats arabes et internationaux dans une ambiance familiale",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      logo: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      phone: "+213 5 55 55 55 55",
      email: "info@andalus-restaurant.dz",
      rating: 4.8,
      employees: 12
    },
    {
      id: 2,
      name: "Café Parisien",
      location: "Paris, France",
      description: "Café chic avec une ambiance parisienne authentique",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb",
      logo: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      phone: "+33 6 12 34 56 78",
      email: "contact@cafeparisien.fr",
      rating: 4.5,
      employees: 8
    },
    {
      id: 3,
      name: "La Piazza Italia",
      location: "Rome, Italie",
      description: "Cuisine italienne authentique dans un cadre chaleureux",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      logo: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      phone: "+39 6 12 34 56 78",
      email: "info@lapiazza.it",
      rating: 4.7,
      employees: 15
    },
    {
      id: 4,
      name: "Sushi Master",
      location: "Tokyo, Japon",
      description: "Les meilleurs sushis préparés par des chefs experts",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      logo: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      phone: "+81 3 12 34 56 78",
      email: "info@sushimaster.jp",
      rating: 4.9,
      employees: 20
    }
  ]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openRestaurantModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const goToRestaurantProfile = () => {
    if (selectedRestaurant) {
      setShowModal(false);
      history.push(`/restaurant/${selectedRestaurant.id}`);
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
    
    .restaurants-container {
      background: linear-gradient(135deg, #0a0a2a, #1a1a3a, #0d0d2b);
      min-height: 100vh;
      padding-top: 80px;
      padding-bottom: 80px;
    }
    
    .restaurants-grid {
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
      padding: 25px;
      max-width: 550px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
      animation: zoomIn 0.3s ease;
    }
    
    /* شريط تمرير أخضر للمودال */
    .modal-content::-webkit-scrollbar {
      width: 6px;
    }
    
    .modal-content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    .modal-content::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 10px;
    }
    
    .modal-content::-webkit-scrollbar-thumb:hover {
      background: #15803d;
    }
    
    .modal-content {
      scrollbar-color: #22c55e rgba(255, 255, 255, 0.1);
      scrollbar-width: thin;
    }
    
    .modal-restaurant-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 20px;
      margin-bottom: 15px;
    }
    
    .modal-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 15px;
    }
    
    .modal-logo {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid #22c55e;
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
      float: right;
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
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
    
    @media (max-width: 768px) {
      .restaurants-grid {
        grid-template-columns: 1fr;
        padding: 15px;
      }
    }
  `;

  return (
    <>
      <style>{style}</style>
      <Navbar />
      
      <div className="restaurants-container">
        <div className="restaurants-grid">
          {filteredRestaurants.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🍽️</div>
              <p>Aucun restaurant trouvé</p>
              <p style={{ fontSize: '0.8rem' }}>Essayez une autre recherche</p>
            </div>
          ) : (
            filteredRestaurants.map(restaurant => (
              <RestaurantCard 
                key={restaurant.id}
                restaurant={restaurant}
                showActions={true}
                onClick={openRestaurantModal}
              />
            ))
          )}
        </div>
      </div>
      
      <FooterRecharche 
        type="restaurants"
        onSearch={handleSearch}
        placeholder="🔍 Rechercher un restaurant par nom, ville ou description..."
      />
      
      {showModal && selectedRestaurant && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="modal-restaurant-image" />
            <div className="modal-header">
              <img src={selectedRestaurant.logo} alt="logo" className="modal-logo" />
              <div>
                <h2 style={{ color: 'white', margin: 0 }}>{selectedRestaurant.name}</h2>
                <p style={{ color: '#22c55e', margin: '5px 0 0' }}>
                  <i className="fas fa-map-marker-alt"></i> {selectedRestaurant.location}
                </p>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '15px' }}>{selectedRestaurant.description}</p>
            
            {/* ========== تم حذف قسم التقييمات (النجوم وعدد الموظفين) ========== */}
            <div style={{ marginBottom: '15px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <i className="fas fa-phone"></i> {selectedRestaurant.phone}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <i className="fas fa-envelope"></i> {selectedRestaurant.email}
              </p>
            </div>
            
            <button className="btn-visit" onClick={goToRestaurantProfile}>
              🏪 Visiter la page du restaurant →
            </button>
          </div>
        </div>
      )}
    </>
  );
}