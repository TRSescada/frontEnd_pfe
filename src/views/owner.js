import React, { useState, useRef } from "react";
import RestaurantCard from "components/Common/restaurantCard";
import EmployeeCard from "components/Common/employecard";

export default function ProfileOwner() {
  const [userData, setUserData] = useState({
    name: "Karim El Fassi",
    email: "karim.elfassi@restaurant.com",
    phone: "+212 6 12 34 56 78",
    location: "Marrakech, Gueliz, Maroc",
    joinDate: "Mars 2023",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    bio: "Passionné par la gastronomie marocaine et internationale, je gère avec dévouement mes établissements pour offrir le meilleur à mes clients."
  });

  const [myRestaurants, setMyRestaurants] = useState([
    {
      id: 1,
      name: "La Belle Table",
      cuisine: "Française",
      location: "Casablanca",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300",
      status: "active",
      revenue: {
        day: 12500,
        week: 87500,
        month: 350000,
        season: 1050000
      }
    },
    {
      id: 2,
      name: "Tajina Palace",
      cuisine: "Marocaine",
      location: "Marrakech",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300",
      status: "active",
      revenue: {
        day: 9800,
        week: 68600,
        month: 274400,
        season: 823200
      }
    },
    {
      id: 3,
      name: "Sushi Master",
      cuisine: "Japonaise",
      location: "Rabat",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300",
      status: "pending",
      revenue: {
        day: 0,
        week: 0,
        month: 0,
        season: 0
      }
    }
  ]);

  // ==================== بيانات المدراء (Managers) ====================
  const [managers, setManagers] = useState([
    { 
      id: 1, 
      name: "Ahmed Benali", 
      role: "Manager Général", 
      location: "Casablanca, Maroc", 
      bio: "Manager expérimenté avec 10 ans d'expérience dans la restauration", 
      image: "https://randomuser.me/api/portraits/men/11.jpg", 
      experience: "10 ans", 
      rating: 4.9, 
      restaurant: "La Belle Table" 
    },
    { 
      id: 2, 
      name: "Fatima Zahra", 
      role: "Manager Restaurant", 
      location: "Marrakech, Maroc", 
      bio: "Spécialiste en gestion d'équipe et service client", 
      image: "https://randomuser.me/api/portraits/women/12.jpg", 
      experience: "7 ans", 
      rating: 4.8, 
      restaurant: "Tajina Palace" 
    },
    { 
      id: 3, 
      name: "Yassine El Mansouri", 
      role: "Manager Opérationnel", 
      location: "Rabat, Maroc", 
      bio: "Expert en logistique et gestion des opérations", 
      image: "https://randomuser.me/api/portraits/men/13.jpg", 
      experience: "8 ans", 
      rating: 4.7, 
      restaurant: "Sushi Master" 
    },
    { 
      id: 4, 
      name: "Nadia Tazi", 
      role: "Responsable RH", 
      location: "Casablanca, Maroc", 
      bio: "Gestion des équipes et recrutement", 
      image: "https://randomuser.me/api/portraits/women/14.jpg", 
      experience: "6 ans", 
      rating: 4.6, 
      restaurant: "La Belle Table" 
    }
  ]);

  const [activeTab, setActiveTab] = useState("restaurants");
  const [isEditing, setIsEditing] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const cardRef = useRef(null);

  const totalRevenue = {
    day: myRestaurants.reduce((sum, r) => sum + r.revenue.day, 0),
    week: myRestaurants.reduce((sum, r) => sum + r.revenue.week, 0),
    month: myRestaurants.reduce((sum, r) => sum + r.revenue.month, 0),
    season: myRestaurants.reduce((sum, r) => sum + r.revenue.season, 0)
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const maxRotate = 10;
    const rotateYValue = (mouseX / (rect.width / 2)) * maxRotate;
    const rotateXValue = (mouseY / (rect.height / 2)) * -maxRotate;
    
    setRotateY(rotateYValue);
    setRotateX(rotateXValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    window.location.href = "/auth";
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleCoverChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({...userData, coverImage: event.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData({...userData, avatar: event.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // دالة للذهاب إلى صفحة المدير - استخدام window.location مباشرة
  const goToManagerProfile = (manager) => {
    // تخزين بيانات المدير في localStorage مؤقتاً
    localStorage.setItem('selectedManager', JSON.stringify(manager));
    // الانتقال إلى صفحة الزائر
    window.location.href = `/visitor-profile/${manager.id}`;
  };

  return (
    <div className="owner-profile-container">
      <div className="bg-gradient"></div>
      <div className="noise-overlay"></div>
      <div className="top-glow"></div>
      <div className="bottom-glow"></div>
      <div className="glow-spot-1"></div>
      <div className="glow-spot-2"></div>

      {/* Modal de confirmation de déconnexion */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">🚪</div>
            <h3>Êtes-vous sûr ?</h3>
            <p>Voulez-vous vraiment vous déconnecter ?</p>
            <div className="modal-buttons">
              <button className="modal-confirm" onClick={handleConfirmLogout}>
                Oui, me déconnecter
              </button>
              <button className="modal-cancel" onClick={handleCancelLogout}>
                Non, annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-wrapper">
        <div
          ref={cardRef}
          className="profile-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className="card-glow"></div>
          
          {/* Cover Section avec bouton pour changer l'image */}
          <div className="cover-section">
            <div className="cover-image">
              <img 
                src={userData.coverImage} 
                alt="Cover"
              />
              <button 
                className="edit-cover-btn" 
                onClick={() => document.getElementById('coverInput').click()}
              >
                📷 Changer la couverture
              </button>
              <input
                type="file"
                id="coverInput"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleCoverChange}
              />
            </div>
            
            {/* Avatar Section avec bouton pour changer l'image */}
            <div className="avatar-section">
              <div className="avatar">
                <img 
                  src={userData.avatar} 
                  alt="Avatar"
                />
                <button 
                  className="edit-avatar-btn" 
                  onClick={() => document.getElementById('avatarInput').click()}
                >
                  ✏️
                </button>
                <input
                  type="file"
                  id="avatarInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
          </div>

          <div className="profile-info">
            {!isEditing ? (
              <>
                <h1 className="owner-name">{userData.name}</h1>
                <p className="owner-title">🏪 Propriétaire de Restaurant</p>
                <div className="info-row">
                  <span>📧 {userData.email}</span>
                  <span>📞 {userData.phone}</span>
                  <span>📍 {userData.location}</span>
                </div>
                <p className="owner-bio">{userData.bio}</p>
                <p className="join-date">📅 Membre depuis: {userData.joinDate}</p>
                <div className="button-group">
                  <button className="edit-btn" onClick={handleEdit}>
                    ✏️ Modifier le profil
                  </button>
                  <button className="logout-btn" onClick={handleLogoutClick}>
                    🚪 Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <div className="edit-form">
                <h2>Modifier le profil</h2>
                <input 
                  type="text" 
                  defaultValue={userData.name}
                  placeholder="Nom complet"
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  defaultValue={userData.email}
                  placeholder="Email"
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
                <input 
                  type="tel" 
                  defaultValue={userData.phone}
                  placeholder="Téléphone"
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                />
                <input 
                  type="text" 
                  defaultValue={userData.location}
                  placeholder="Localisation"
                  onChange={(e) => setUserData({...userData, location: e.target.value})}
                />
                <textarea 
                  defaultValue={userData.bio}
                  placeholder="Bio"
                  rows="3"
                  onChange={(e) => setUserData({...userData, bio: e.target.value})}
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={handleSave}>💾 Sauvegarder</button>
                  <button className="cancel-btn" onClick={handleCancel}>❌ Annuler</button>
                </div>
              </div>
            )}
          </div>

          <div className="tabs-section">
            <button 
              className={`tab-btn ${activeTab === "restaurants" ? "active" : ""}`}
              onClick={() => setActiveTab("restaurants")}
            >
              🍽️ Mes Restaurants ({myRestaurants.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === "revenue" ? "active" : ""}`}
              onClick={() => setActiveTab("revenue")}
            >
              💰 Statistiques
            </button>
            <button 
              className={`tab-btn ${activeTab === "managers" ? "active" : ""}`}
              onClick={() => setActiveTab("managers")}
            >
              👨‍💼 Mes Managers ({managers.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "restaurants" && (
              <div>
                <div className="restaurants-header">
                  <h3>Mes Restaurants</h3>
                </div>
                
                <div className="restaurants-grid">
                  {myRestaurants.map((restaurant) => (
                    <RestaurantCard 
                      key={restaurant.id}
                      restaurant={restaurant}
                    />
                  ))}
                </div>

                {myRestaurants.length === 0 && (
                  <div className="no-restaurants">
                    <p>Vous n'avez pas encore de restaurants.</p>
                    <p style={{ fontSize: '12px', marginTop: '10px' }}>
                      Le administrateur vous attribuera des restaurants.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "revenue" && (
              <div className="stats-section">
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>💰 Revenus du jour</h3>
                    <p className="stat-number">{totalRevenue.day.toLocaleString()} DH</p>
                  </div>
                  <div className="stat-card">
                    <h3>📊 Revenus de la semaine</h3>
                    <p className="stat-number">{totalRevenue.week.toLocaleString()} DH</p>
                  </div>
                  <div className="stat-card">
                    <h3>📅 Revenus du mois</h3>
                    <p className="stat-number">{totalRevenue.month.toLocaleString()} DH</p>
                  </div>
                  <div className="stat-card">
                    <h3>🍂 Revenus de la saison</h3>
                    <p className="stat-number">{totalRevenue.season.toLocaleString()} DH</p>
                  </div>
                </div>

                <div className="revenue-details">
                  <h3>Détails par restaurant</h3>
                  <div className="revenue-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Restaurant</th>
                          <th>Jour</th>
                          <th>Semaine</th>
                          <th>Mois</th>
                          <th>Saison</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myRestaurants.map(restaurant => (
                          <tr key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.revenue.day.toLocaleString()} DH</td>
                            <td>{restaurant.revenue.week.toLocaleString()} DH</td>
                            <td>{restaurant.revenue.month.toLocaleString()} DH</td>
                            <td>{restaurant.revenue.season.toLocaleString()} DH</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "managers" && (
              <div className="managers-section">
                <div className="managers-header">
                  <h3>👨‍💼 Mes Managers</h3>
                </div>
                
                <div className="managers-grid">
                  {managers.map((manager) => (
                    <div key={manager.id} className="manager-card-wrapper">
                      <EmployeeCard 
                        employee={manager}
                        showActions={false}
                      />
                      <button 
                        className="view-profile-btn"
                        onClick={() => goToManagerProfile(manager)}
                      >
                        👤 Voir le profil complet
                      </button>
                    </div>
                  ))}
                </div>

                {managers.length === 0 && (
                  <div className="no-managers">
                    <p>Vous n'avez pas encore de managers.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .owner-profile-container {
          min-height: 100vh;
          width: 100%;
          background: #540887;
          position: relative;
          overflow-y: auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px 20px;
        }

        .bg-gradient {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at 50% 30%, 
            #19022a 0%,
            #1c084b 30%,
            #1a0b2e 60%,
            #0a0a0a 85%,
            #050505 100%
          );
          z-index: 0;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 1;
        }

        .top-glow {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120vh;
          height: 60vh;
          border-radius: 0 0 50% 50%;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3), rgba(107, 70, 193, 0.1), transparent);
          filter: blur(80px);
          z-index: 0;
          animation: pulseGlow 8s ease-in-out infinite;
        }

        .bottom-glow {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90vh;
          height: 90vh;
          border-radius: 50% 50% 0 0;
          background: radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25), rgba(126, 34, 206, 0.1), transparent);
          filter: blur(60px);
          z-index: 0;
          animation: pulseGlowBottom 6s ease-in-out infinite;
        }

        .glow-spot-1 {
          position: fixed;
          left: 20%;
          top: 30%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15), rgba(107, 70, 193, 0.05), transparent);
          border-radius: 50%;
          filter: blur(100px);
          animation: pulse 4s ease-in-out infinite;
          z-index: 0;
        }

        .glow-spot-2 {
          position: fixed;
          right: 20%;
          bottom: 20%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.12), rgba(124, 58, 237, 0.04), transparent);
          border-radius: 50%;
          filter: blur(100px);
          animation: pulse 4s ease-in-out infinite 1s;
          z-index: 0;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(0.98); }
          50% { opacity: 0.7; transform: translateX(-50%) scale(1.02); }
        }

        @keyframes pulseGlowBottom {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.08); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.12); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: linear-gradient(135deg, #1e1b4b, #0f172a);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          max-width: 400px;
          width: 90%;
          border: 1px solid rgba(168, 85, 247, 0.3);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .modal-content h3 {
          color: white;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .modal-content p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 25px;
        }

        .modal-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .modal-confirm {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
        }

        .modal-confirm:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
        }

        .modal-cancel {
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
        }

        .modal-cancel:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.5);
        }

        .profile-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
        }

        .profile-card {
          position: relative;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transition: transform 0.1s ease-out;
        }

        .card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 24px;
          opacity: 0;
          transition: opacity 0.7s ease;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1), transparent);
          pointer-events: none;
        }

        .profile-card:hover .card-glow {
          opacity: 0.7;
        }

        .cover-section {
          position: relative;
        }

        .cover-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .cover-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .edit-cover-btn {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          border: none;
          border-radius: 8px;
          padding: 8px 12px;
          color: white;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.3s;
          z-index: 5;
        }

        .edit-cover-btn:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.05);
        }

        .avatar-section {
          position: relative;
          display: flex;
          justify-content: center;
          margin-top: -60px;
        }

        .avatar {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .edit-avatar-btn {
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          color: white;
          font-size: 12px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .edit-avatar-btn:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        .profile-info {
          padding: 20px 30px;
          text-align: center;
        }

        .owner-name {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(135deg, white, rgba(255,255,255,0.8));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 5px;
        }

        .owner-title {
          color: #a855f7;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .info-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 15px;
          color: rgba(255,255,255,0.7);
          font-size: 14px;
        }

        .owner-bio {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          max-width: 600px;
          margin: 0 auto 15px;
          line-height: 1.6;
        }

        .join-date {
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          margin-bottom: 20px;
        }

        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .edit-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .edit-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(102,126,234,0.5);
        }

        .logout-btn {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(239,68,68,0.5);
        }

        .edit-form {
          max-width: 500px;
          margin: 0 auto;
        }

        .edit-form h2 {
          color: white;
          margin-bottom: 20px;
        }

        .edit-form input, .edit-form textarea {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          color: white;
          font-size: 14px;
        }

        .edit-form input:focus, .edit-form textarea:focus {
          outline: none;
          border-color: #a855f7;
        }

        .edit-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .save-btn, .cancel-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .save-btn {
          background: #10b981;
          color: white;
        }

        .cancel-btn {
          background: #ef4444;
          color: white;
        }

        .tabs-section {
          display: flex;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .tab-btn {
          flex: 1;
          padding: 15px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .tab-btn:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .tab-btn.active {
          color: white;
          border-bottom: 2px solid #a855f7;
        }

        .tab-content {
          padding: 30px;
        }

        .restaurants-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .restaurants-header h3 {
          color: white;
          font-size: 20px;
        }

        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }

        .no-restaurants {
          text-align: center;
          padding: 50px;
          color: rgba(255,255,255,0.6);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(0,0,0,0.3);
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(168,85,247,0.5);
        }

        .stat-card h3 {
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          margin-bottom: 10px;
        }

        .stat-number {
          color: white;
          font-size: 36px;
          font-weight: bold;
        }

        .revenue-details {
          margin-top: 30px;
        }

        .revenue-details h3 {
          color: white;
          margin-bottom: 20px;
        }

        .revenue-table {
          overflow-x: auto;
        }

        .revenue-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .revenue-table th,
        .revenue-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
        }

        .revenue-table th {
          background: rgba(0,0,0,0.3);
          color: white;
          font-weight: bold;
        }

        .revenue-table tr:hover {
          background: rgba(255,255,255,0.05);
        }

        /* Styles pour la section Managers */
        .managers-section h3 {
          color: white;
          font-size: 20px;
          margin-bottom: 20px;
        }

        .managers-header {
          margin-bottom: 20px;
        }

        .managers-header h3 {
          color: white;
          font-size: 20px;
        }

        .managers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
        }

        .manager-card-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .view-profile-btn {
          background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          border: none;
          padding: 10px 15px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s;
          width: 100%;
        }

        .view-profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4);
        }

        .no-managers {
          text-align: center;
          padding: 50px;
          color: rgba(255,255,255,0.6);
        }

        @media (max-width: 768px) {
          .profile-info {
            padding: 15px;
          }
          
          .info-row {
            flex-direction: column;
            gap: 5px;
          }
          
          .restaurants-grid {
            grid-template-columns: 1fr;
          }
          
          .managers-grid {
            grid-template-columns: 1fr;
          }
          
          .tab-content {
            padding: 20px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .revenue-table th,
          .revenue-table td {
            font-size: 12px;
            padding: 8px;
          }
          
          .button-group {
            flex-direction: column;
            align-items: center;
          }
          
          .edit-btn, .logout-btn {
            width: 200px;
          }
          
          .edit-cover-btn {
            font-size: 10px;
            padding: 5px 8px;
          }
        }
      `}</style>
    </div>
  );
}