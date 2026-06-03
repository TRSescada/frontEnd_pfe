import React, { useState, useEffect } from "react";
import FooterRecharche from "../components/Footers/footer.recharche";
import Navbar from "../components/Navbars/IndexNavbar";
import OwnerCard from "components/Common/ownerCard.js";
import { apiGestionX } from "services/apiGestionX";
import apiUser from "services/apiUser";

export default function ListeOwner() {
  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [managerId, setManagerId] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true);
        const data = await apiGestionX.getAllOwners();
        setOwners(data.owners || []);
      } catch (error) {
        console.error("Erreur lors du chargement des propriétaires:", error);
        setOwners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOwners();
  }, []);

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const manager = await apiUser.getManagerByUserId(userId);
        if (manager && manager._id) {
          setManagerId(userId);
          const restaurant = await apiGestionX.getRestaurantByManagerId(manager._id);
          if (restaurant && restaurant._id) {
            setRestaurantId(restaurant._id);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement du manager:", error);
      }
    };
    fetchManagerData();
  }, []);

  const filteredOwners = owners.filter(owner => {
    const user = owner.user || {};
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim().toLowerCase();
    const email = (user.email || '').toLowerCase();
    const restaurantNames = (owner.restaurants || []).map(r => (r.name || '').toLowerCase()).join(' ');
    const term = searchTerm.toLowerCase();
    return name.includes(term) || email.includes(term) || restaurantNames.includes(term);
  });

  const openOwnerModal = (owner) => {
    setSelectedOwner(owner);
    setShowModal(true);
  };

  const goToOwnerProfile = () => {
    setShowModal(false);
  };

  const handleAssignOwner = async () => {
    if (!managerId || !restaurantId) {
      alert("Erreur : vous n'êtes pas connecté en tant que manager ou aucun restaurant ne vous est assigné.");
      return;
    }
    if (!selectedOwner?.user?._id) {
      alert("Erreur : propriétaire non identifié.");
      return;
    }
    setAssignLoading(true);
    setAssignSuccess(null);
    try {
      await apiGestionX.assignOwnerToRestaurant(managerId, restaurantId, selectedOwner.user._id);
      setAssignSuccess(`${getOwnerName(selectedOwner)} a été assigné à votre restaurant avec succès !`);
      setTimeout(() => setAssignSuccess(null), 4000);
    } catch (error) {
      console.error("Erreur lors de l'assignation:", error);
      alert("Erreur lors de l'assignation du propriétaire.");
    } finally {
      setAssignLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const getOwnerName = (owner) => {
    const user = owner.user || {};
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Propriétaire';
  };

  const getOwnerImage = (owner) => {
    return owner.user?.image || owner.restaurants?.[0]?.logo || 'https://randomuser.me/api/portraits/men/32.jpg';
  };

  const getOwnerRestaurant = (owner) => {
    return owner.restaurants?.[0]?.name || 'Aucun restaurant';
  };

  const getOwnerEmail = (owner) => {
    return owner.user?.email || '';
  };

  const getOwnerPhone = (owner) => {
    return owner.user?.phone || '';
  };

  const getOwnerLocation = (owner) => {
    const restaurant = owner.restaurants?.[0];
    return restaurant?.location || owner.user?.location || '';
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
    
    .loading-container {
      text-align: center;
      padding: 80px 20px;
      color: rgba(255,255,255,0.6);
    }
    
    .loading-spinner-lg {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(34,197,94,0.2);
      border-top-color: #22c55e;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto 20px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
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
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner-lg"></div>
            <p>Chargement des propriétaires...</p>
          </div>
        ) : (
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
                  key={owner._id}
                  owner={owner}
                  onViewProfile={openOwnerModal}
                />
              ))
            )}
          </div>
        )}
      </div>
      
      <FooterRecharche 
        type="owners"
        onSearch={handleSearch}
        placeholder="🔍 Rechercher un propriétaire par nom, restaurant ou email..."
      />
      
      {/* Modal détails propriétaire */}
      {showModal && selectedOwner && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            
            <div className="modal-cover" style={{ backgroundImage: `url(${getOwnerImage(selectedOwner)})` }}>
              <img src={getOwnerImage(selectedOwner)} alt={getOwnerName(selectedOwner)} className="modal-avatar" />
            </div>
            
            <div className="modal-body">
              <h2 className="modal-name">{getOwnerName(selectedOwner)}</h2>
              <p className="modal-role">Propriétaire</p>
              <div className="modal-restaurant">🏪 {getOwnerRestaurant(selectedOwner)}</div>
              
              <div className="modal-info">
                <div className="info-row">
                  <span className="info-icon">📍</span>
                  <span>{getOwnerLocation(selectedOwner)}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📧</span>
                  <span>{getOwnerEmail(selectedOwner)}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">📞</span>
                  <span>{getOwnerPhone(selectedOwner)}</span>
                </div>
                <div className="info-row">
                  <span className="info-icon">🍽️</span>
                  <span>{selectedOwner.restaurantsCount} restaurant(s)</span>
                </div>
              </div>
              
              <button 
                className="btn-visit" 
                onClick={handleAssignOwner}
                disabled={assignLoading || !managerId || !restaurantId}
              >
                {assignLoading ? "⏳ Assignation en cours..." : `📞 Assigner ${getOwnerName(selectedOwner).split(' ')[0]} à mon restaurant`}
              </button>
              {assignSuccess && (
                <p style={{ color: '#22c55e', textAlign: 'center', marginTop: '10px', fontSize: '0.9rem' }}>
                  ✅ {assignSuccess}
                </p>
              )}
              {!managerId && (
                <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '10px', fontSize: '0.8rem' }}>
                  Connectez-vous en tant que manager pour assigner un propriétaire.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
