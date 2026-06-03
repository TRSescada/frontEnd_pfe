import React, { useState, useRef, useEffect } from "react";
import RestaurantCard from "components/Common/restaurantCard";
import EmployeeCard from "components/Common/employecard";
import { apiGestionX } from "services/apiGestionX";
import apiUser from "services/apiUser";

export default function ProfileOwner() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    avatar: "",
    coverImage: "",
    bio: ""
  });

  const [myRestaurants, setMyRestaurants] = useState([]);
  const [managers, setManagers] = useState([]);
  const [stats, setStats] = useState({ jour: 0, semaine: 0, mois: 0, saison: 0 });
  const [restaurantsStats, setRestaurantsStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("restaurants");
  const [isEditing, setIsEditing] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const [profileRes, restaurantsRes, managersRes, dashboardRes] = await Promise.all([
          apiGestionX.getOwnerProfile(userId),
          apiGestionX.getOwnerRestaurants(userId),
          apiGestionX.getOwnerManagers(userId),
          apiGestionX.getOwnerDashboard(userId)
        ]);

        const user = profileRes.user || {};
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          phone: user.phone || '',
          location: user.location || '',
          joinDate: profileRes.createdAt ? new Date(profileRes.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : '',
          avatar: user.avatar || user.image || '',
          coverImage: user.coverImage || '',
          bio: user.bio || ''
        });

        const restaurants = (restaurantsRes.restaurants || []).map(r => ({
          _id: r._id,
          name: r.name || '',
          cuisine: r.description || '',
          location: r.location || '',
          rating: r.rating || 0,
          image: r.image || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300',
          logo: r.logo || '',
          description: r.description || '',
          tables: r.tables?.length || 0,
          workers: r.workers?.length || 0
        }));
        setMyRestaurants(restaurants);

        const mgrs = (managersRes.managers || []).map(m => {
          const mgrUser = m.user || {};
          return {
            _id: m._id,
            userId: mgrUser._id,
            name: `${mgrUser.firstName || ''} ${mgrUser.lastName || ''}`.trim() || 'Manager',
            role: m.role || 'Manager',
            location: mgrUser.location || m.restaurant?.location || '',
            bio: mgrUser.bio || '',
            image: mgrUser.image || 'https://randomuser.me/api/portraits/men/11.jpg',
            experience: m.experience || '',
            rating: m.rating || 0,
            restaurant: m.restaurant?.name || ''
          };
        });
        setManagers(mgrs);

        if (dashboardRes.stats) {
          setStats(dashboardRes.stats);
        }
        if (dashboardRes.restaurantsStats) {
          setRestaurantsStats(dashboardRes.restaurantsStats);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données propriétaire:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  const totalRevenue = {
    day: stats.jour || 0,
    week: stats.semaine || 0,
    month: stats.mois || 0,
    season: stats.saison || 0
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

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const updateData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        location: userData.location,
        bio: userData.bio,
        avatar: userData.avatar,
        coverImage: userData.coverImage
      };

      const updatedUser = await apiUser.updateProfileInfo(userId, updateData);
      setUserData(prev => ({
        ...prev,
        firstName: updatedUser.firstName || prev.firstName,
        lastName: updatedUser.lastName || prev.lastName,
        phone: updatedUser.phone || prev.phone,
        location: updatedUser.location || prev.location,
        bio: updatedUser.bio || prev.bio,
        avatar: updatedUser.avatar || updatedUser.image || prev.avatar,
        coverImage: updatedUser.coverImage || prev.coverImage
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      alert("Erreur lors de la sauvegarde. Veuillez réessayer.");
    }
  };

  const handleCancel = () => setIsEditing(false);

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.clear();
    window.location.href = "/auth";
  };
  const handleCancelLogout = () => setShowLogoutConfirm(false);

  const handleCoverChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setUserData({...userData, coverImage: event.target.result});
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setUserData({...userData, avatar: event.target.result});
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const goToManagerProfile = (manager) => {
    const userId = manager.userId || manager._id;
    window.location.href = `/visitor-profile/${userId}`;
  };

  if (loading) {
    return (
      <div className="owner-profile-container">
        <div className="bg-gradient"></div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
            <div className="loading-spinner-lg"></div>
            <p>Chargement du profil...</p>
          </div>
        </div>
        <style jsx>{`
          .owner-profile-container { min-height: 100vh; width: 100%; background: #540887; position: relative; }
          .bg-gradient { position: fixed; inset: 0; background: radial-gradient(ellipse at 50% 30%, #19022a 0%, #1c084b 30%, #1a0b2e 60%, #0a0a0a 85%, #050505 100%); z-index: 0; }
          .loading-spinner-lg { width: 48px; height: 48px; border: 4px solid rgba(168,85,247,0.2); border-top-color: #a855f7; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 20px; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="owner-profile-container">
      <div className="bg-gradient"></div>
      <div className="noise-overlay"></div>
      <div className="top-glow"></div>
      <div className="bottom-glow"></div>
      <div className="glow-spot-1"></div>
      <div className="glow-spot-2"></div>

      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">🚪</div>
            <h3>Êtes-vous sûr ?</h3>
            <p>Voulez-vous vraiment vous déconnecter ?</p>
            <div className="modal-buttons">
              <button className="modal-confirm" onClick={handleConfirmLogout}>Oui, me déconnecter</button>
              <button className="modal-cancel" onClick={handleCancelLogout}>Non, annuler</button>
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
          
          <div className="cover-section">
            <div className="cover-image">
              <img src={userData.coverImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200'} alt="Cover" />
              <button className="edit-cover-btn" onClick={() => document.getElementById('coverInput').click()}>📷 Changer la couverture</button>
              <input type="file" id="coverInput" style={{ display: 'none' }} accept="image/*" onChange={handleCoverChange} />
            </div>
            
            <div className="avatar-section">
              <div className="avatar">
                <img src={userData.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'} alt="Avatar" />
                <button className="edit-avatar-btn" onClick={() => document.getElementById('avatarInput').click()}>✏️</button>
                <input type="file" id="avatarInput" style={{ display: 'none' }} accept="image/*" onChange={handleAvatarChange} />
              </div>
            </div>
          </div>

          <div className="profile-info">
            {!isEditing ? (
              <>
                <h1 className="owner-name">{userData.firstName} {userData.lastName}</h1>
                <p className="owner-title">🏪 Propriétaire de Restaurant</p>
                <div className="info-row">
                  <span>📧 {userData.email}</span>
                  <span>📞 {userData.phone}</span>
                  <span>📍 {userData.location}</span>
                </div>
                {userData.bio && <p className="owner-bio">{userData.bio}</p>}
                {userData.joinDate && <p className="join-date">📅 Membre depuis: {userData.joinDate}</p>}
                <div className="button-group">
                  <button className="edit-btn" onClick={handleEdit}>✏️ Modifier le profil</button>
                  <button className="logout-btn" onClick={handleLogoutClick}>🚪 Déconnexion</button>
                </div>
              </>
            ) : (
              <div className="edit-form">
                <h2>Modifier le profil</h2>
                <input type="text" defaultValue={userData.firstName} placeholder="Prénom" onChange={(e) => setUserData({...userData, firstName: e.target.value})} />
                <input type="text" defaultValue={userData.lastName} placeholder="Nom" onChange={(e) => setUserData({...userData, lastName: e.target.value})} />
                <input type="email" defaultValue={userData.email} placeholder="Email" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
                <input type="tel" defaultValue={userData.phone} placeholder="Téléphone" onChange={(e) => setUserData({...userData, phone: e.target.value})} />
                <input type="text" defaultValue={userData.location} placeholder="Localisation" onChange={(e) => setUserData({...userData, location: e.target.value})} />
                <textarea defaultValue={userData.bio} placeholder="Bio" rows="3" onChange={(e) => setUserData({...userData, bio: e.target.value})} />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={handleSave}>💾 Sauvegarder</button>
                  <button className="cancel-btn" onClick={handleCancel}>❌ Annuler</button>
                </div>
              </div>
            )}
          </div>

          <div className="tabs-section">
            <button className={`tab-btn ${activeTab === "restaurants" ? "active" : ""}`} onClick={() => setActiveTab("restaurants")}>
              🍽️ Mes Restaurants ({myRestaurants.length})
            </button>
            <button className={`tab-btn ${activeTab === "revenue" ? "active" : ""}`} onClick={() => setActiveTab("revenue")}>
              💰 Statistiques
            </button>
            <button className={`tab-btn ${activeTab === "managers" ? "active" : ""}`} onClick={() => setActiveTab("managers")}>
              👨‍💼 Mes Managers ({managers.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "restaurants" && (
              <div>
                <div className="restaurants-header"><h3>Mes Restaurants</h3></div>
                <div className="restaurants-grid">
                  {myRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                  ))}
                </div>
                {myRestaurants.length === 0 && (
                  <div className="no-restaurants">
                    <p>Vous n'avez pas encore de restaurants.</p>
                    <p style={{ fontSize: '12px', marginTop: '10px' }}>L'administrateur vous attribuera des restaurants.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "revenue" && (
              <div className="stats-section">
                <h3 className="stats-section-title">📊 Vue d'ensemble</h3>
                <div className="stats-grid">
                  <div className="stat-card stat-card-purple">
                    <div className="stat-icon">🍽️</div>
                    <h3>Restaurants</h3>
                    <p className="stat-number">{myRestaurants.length}</p>
                  </div>
                  <div className="stat-card stat-card-blue">
                    <div className="stat-icon">👨‍💼</div>
                    <h3>Managers</h3>
                    <p className="stat-number">{managers.length}</p>
                  </div>
                  <div className="stat-card stat-card-green">
                    <div className="stat-icon">🪑</div>
                    <h3>Tables totales</h3>
                    <p className="stat-number">{restaurantsStats.reduce((sum, r) => sum + (r.totalTables || 0), 0)}</p>
                  </div>
                  <div className="stat-card stat-card-orange">
                    <div className="stat-icon">👥</div>
                    <h3>Employés totaux</h3>
                    <p className="stat-number">{restaurantsStats.reduce((sum, r) => sum + (r.totalWorkers || 0), 0)}</p>
                  </div>
                </div>

                <h3 className="stats-section-title">💰 Revenus globaux</h3>
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

                {restaurantsStats.length > 0 && (
                  <>
                    <h3 className="stats-section-title">🏪 Détail par restaurant</h3>
                    <div className="restaurant-stats-list">
                      {restaurantsStats.map((r) => (
                        <div key={r.id} className="restaurant-stat-card">
                          <div className="restaurant-stat-header">
                            <img src={r.logo || 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png'} alt={r.name} className="restaurant-stat-logo" />
                            <div>
                              <h4 className="restaurant-stat-name">{r.name}</h4>
                              <p className="restaurant-stat-location">📍 {r.location || 'N/A'}</p>
                            </div>
                            <div className="restaurant-stat-rating">
                              ⭐ {r.rating?.toFixed(1) || '0.0'}
                            </div>
                          </div>
                          <div className="restaurant-stat-details">
                            <div className="restaurant-stat-item">
                              <span className="restaurant-stat-label">🪑 Tables</span>
                              <span className="restaurant-stat-value">{r.totalTables || 0}</span>
                            </div>
                            <div className="restaurant-stat-item">
                              <span className="restaurant-stat-label">👥 Employés</span>
                              <span className="restaurant-stat-value">{r.totalWorkers || 0}</span>
                            </div>
                          </div>
                          <div className="restaurant-stat-revenue">
                            <div className="revenue-item">
                              <span>Aujourd'hui</span>
                              <strong>{(r.jour || 0).toLocaleString()} DH</strong>
                            </div>
                            <div className="revenue-item">
                              <span>Cette semaine</span>
                              <strong>{(r.semaine || 0).toLocaleString()} DH</strong>
                            </div>
                            <div className="revenue-item">
                              <span>Ce mois</span>
                              <strong>{(r.mois || 0).toLocaleString()} DH</strong>
                            </div>
                            <div className="revenue-item">
                              <span>Cette saison</span>
                              <strong>{(r.saison || 0).toLocaleString()} DH</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "managers" && (
              <div className="managers-section">
                <div className="managers-header"><h3>👨‍💼 Mes Managers</h3></div>
                <div className="managers-grid">
                  {managers.map((manager) => (
                    <div key={manager._id} className="manager-card-wrapper">
                      <EmployeeCard employee={manager} showActions={false} />
                      <button className="view-profile-btn" onClick={() => goToManagerProfile(manager)}>
                        👤 Voir le profil complet
                      </button>
                    </div>
                  ))}
                </div>
                {managers.length === 0 && (
                  <div className="no-managers"><p>Vous n'avez pas encore de managers.</p></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .owner-profile-container { min-height: 100vh; width: 100%; background: #540887; position: relative; overflow-y: auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 20px; }
        .bg-gradient { position: fixed; inset: 0; background: radial-gradient(ellipse at 50% 30%, #19022a 0%, #1c084b 30%, #1a0b2e 60%, #0a0a0a 85%, #050505 100%); z-index: 0; }
        .noise-overlay { position: fixed; inset: 0; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px 200px; pointer-events: none; z-index: 1; }
        .top-glow { position: fixed; top: 0; left: 50%; transform: translateX(-50%); width: 120vh; height: 60vh; border-radius: 0 0 50% 50%; background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3), rgba(107, 70, 193, 0.1), transparent); filter: blur(80px); z-index: 0; animation: pulseGlow 8s ease-in-out infinite; }
        .bottom-glow { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 90vh; height: 90vh; border-radius: 50% 50% 0 0; background: radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25), rgba(126, 34, 206, 0.1), transparent); filter: blur(60px); z-index: 0; animation: pulseGlowBottom 6s ease-in-out infinite; }
        .glow-spot-1 { position: fixed; left: 20%; top: 30%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(139, 92, 246, 0.15), rgba(107, 70, 193, 0.05), transparent); border-radius: 50%; filter: blur(100px); animation: pulse 4s ease-in-out infinite; z-index: 0; }
        .glow-spot-2 { position: fixed; right: 20%; bottom: 20%; width: 350px; height: 350px; background: radial-gradient(circle, rgba(168, 85, 247, 0.12), rgba(124, 58, 237, 0.04), transparent); border-radius: 50%; filter: blur(100px); animation: pulse 4s ease-in-out infinite 1s; z-index: 0; }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(0.98); } 50% { opacity: 0.7; transform: translateX(-50%) scale(1.02); } }
        @keyframes pulseGlowBottom { 0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); } 50% { opacity: 0.6; transform: translateX(-50%) scale(1.08); } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.12); } }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-content { background: linear-gradient(135deg, #1e1b4b, #0f172a); border-radius: 20px; padding: 30px; text-align: center; max-width: 400px; width: 90%; border: 1px solid rgba(168, 85, 247, 0.3); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-icon { font-size: 64px; margin-bottom: 20px; }
        .modal-content h3 { color: white; font-size: 24px; margin-bottom: 10px; }
        .modal-content p { color: rgba(255, 255, 255, 0.7); margin-bottom: 25px; }
        .modal-buttons { display: flex; gap: 15px; justify-content: center; }
        .modal-confirm { background: linear-gradient(135deg, #ef4444, #dc2626); border: none; padding: 10px 20px; border-radius: 10px; color: white; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s; }
        .modal-confirm:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(239, 68, 68, 0.5); }
        .modal-cancel { background: linear-gradient(135deg, #10b981, #059669); border: none; padding: 10px 20px; border-radius: 10px; color: white; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s; }
        .modal-cancel:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }
        .profile-wrapper { position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; }
        .profile-card { position: relative; background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(20px); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); transition: transform 0.1s ease-out; }
        .card-glow { position: absolute; inset: -1px; border-radius: 24px; opacity: 0; transition: opacity 0.7s ease; background: radial-gradient(circle at center, rgba(255,255,255,0.1), transparent); pointer-events: none; }
        .profile-card:hover .card-glow { opacity: 0.7; }
        .cover-section { position: relative; }
        .cover-image { position: relative; height: 250px; overflow: hidden; }
        .cover-image img { width: 100%; height: 100%; object-fit: cover; }
        .edit-cover-btn { position: absolute; bottom: 15px; right: 15px; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px); border: none; border-radius: 8px; padding: 8px 12px; color: white; cursor: pointer; font-size: 12px; transition: all 0.3s; z-index: 5; }
        .edit-cover-btn:hover { background: rgba(0, 0, 0, 0.8); transform: scale(1.05); }
        .avatar-section { position: relative; display: flex; justify-content: center; margin-top: -60px; }
        .avatar { position: relative; width: 120px; height: 120px; border-radius: 50%; border: 4px solid rgba(255, 255, 255, 0.2); overflow: hidden; background: linear-gradient(135deg, #667eea, #764ba2); }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }
        .edit-avatar-btn { position: absolute; bottom: 5px; right: 5px; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px); border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; color: white; font-size: 12px; transition: all 0.3s; display: flex; align-items: center; justify-content: center; z-index: 5; }
        .edit-avatar-btn:hover { background: rgba(0, 0, 0, 0.8); transform: scale(1.1); }
        .profile-info { padding: 20px 30px; text-align: center; }
        .owner-name { font-size: 28px; font-weight: bold; background: linear-gradient(135deg, white, rgba(255,255,255,0.8)); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 5px; }
        .owner-title { color: #a855f7; font-size: 14px; margin-bottom: 15px; }
        .info-row { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 15px; color: rgba(255,255,255,0.7); font-size: 14px; }
        .owner-bio { color: rgba(255,255,255,0.6); font-size: 14px; max-width: 600px; margin: 0 auto 15px; line-height: 1.6; }
        .join-date { color: rgba(255,255,255,0.5); font-size: 12px; margin-bottom: 20px; }
        .button-group { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        .edit-btn { background: linear-gradient(135deg, #667eea, #764ba2); border: none; padding: 10px 20px; border-radius: 8px; color: white; cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .edit-btn:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(102,126,234,0.5); }
        .logout-btn { background: linear-gradient(135deg, #ef4444, #dc2626); border: none; padding: 10px 20px; border-radius: 8px; color: white; cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .logout-btn:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(239,68,68,0.5); }
        .edit-form { max-width: 500px; margin: 0 auto; }
        .edit-form h2 { color: white; margin-bottom: 20px; }
        .edit-form input, .edit-form textarea { width: 100%; padding: 12px; margin-bottom: 15px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: white; font-size: 14px; }
        .edit-form input:focus, .edit-form textarea:focus { outline: none; border-color: #a855f7; }
        .edit-buttons { display: flex; gap: 10px; justify-content: center; }
        .save-btn, .cancel-btn { padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .save-btn { background: #10b981; color: white; }
        .cancel-btn { background: #ef4444; color: white; }
        .tabs-section { display: flex; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .tab-btn { flex: 1; padding: 15px; background: transparent; border: none; color: rgba(255,255,255,0.6); cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .tab-btn:hover { color: white; background: rgba(255,255,255,0.05); }
        .tab-btn.active { color: white; border-bottom: 2px solid #a855f7; }
        .tab-content { padding: 30px; }
        .restaurants-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
        .restaurants-header h3 { color: white; font-size: 20px; }
        .restaurants-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
        .no-restaurants { text-align: center; padding: 50px; color: rgba(255,255,255,0.6); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; text-align: center; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s; }
        .stat-card:hover { transform: translateY(-5px); border-color: rgba(168,85,247,0.5); }
        .stat-card h3 { color: rgba(255,255,255,0.7); font-size: 13px; margin-bottom: 10px; }
        .stat-number { color: white; font-size: 28px; font-weight: bold; }
        .stat-icon { font-size: 28px; margin-bottom: 8px; }
        .stat-card-purple { border-color: rgba(168,85,247,0.3); }
        .stat-card-blue { border-color: rgba(59,130,246,0.3); }
        .stat-card-green { border-color: rgba(34,197,94,0.3); }
        .stat-card-orange { border-color: rgba(249,115,22,0.3); }
        .stats-section-title { color: white; font-size: 18px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .restaurant-stats-list { display: flex; flex-direction: column; gap: 15px; }
        .restaurant-stat-card { background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s; }
        .restaurant-stat-card:hover { border-color: rgba(168,85,247,0.4); transform: translateY(-2px); }
        .restaurant-stat-header { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
        .restaurant-stat-logo { width: 50px; height: 50px; border-radius: 12px; object-fit: cover; background: rgba(255,255,255,0.1); }
        .restaurant-stat-name { color: white; font-size: 16px; font-weight: 600; margin: 0; }
        .restaurant-stat-location { color: rgba(255,255,255,0.5); font-size: 12px; margin: 3px 0 0; }
        .restaurant-stat-rating { margin-left: auto; color: #fbbf24; font-size: 14px; font-weight: 600; background: rgba(251,191,36,0.1); padding: 5px 10px; border-radius: 20px; }
        .restaurant-stat-details { display: flex; gap: 20px; margin-bottom: 15px; }
        .restaurant-stat-item { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px; flex: 1; }
        .restaurant-stat-label { color: rgba(255,255,255,0.6); font-size: 13px; }
        .restaurant-stat-value { color: white; font-weight: 600; font-size: 15px; }
        .restaurant-stat-revenue { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .revenue-item { display: flex; flex-direction: column; align-items: center; background: rgba(168,85,247,0.08); padding: 10px; border-radius: 10px; }
        .revenue-item span { color: rgba(255,255,255,0.5); font-size: 11px; text-align: center; }
        .revenue-item strong { color: #a855f7; font-size: 13px; margin-top: 4px; }
        .managers-section h3 { color: white; font-size: 20px; margin-bottom: 20px; }
        .managers-header { margin-bottom: 20px; }
        .managers-header h3 { color: white; font-size: 20px; }
        .managers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
        .manager-card-wrapper { display: flex; flex-direction: column; gap: 10px; }
        .view-profile-btn { background: linear-gradient(135deg, #8b5cf6, #6d28d9); border: none; padding: 10px 15px; border-radius: 10px; color: white; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s; width: 100%; }
        .view-profile-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(139, 92, 246, 0.4); }
        .no-managers { text-align: center; padding: 50px; color: rgba(255,255,255,0.6); }
        .loading-spinner-lg { width: 48px; height: 48px; border: 4px solid rgba(168,85,247,0.2); border-top-color: #a855f7; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .profile-info { padding: 15px; }
          .info-row { flex-direction: column; gap: 5px; }
          .restaurants-grid { grid-template-columns: 1fr; }
          .managers-grid { grid-template-columns: 1fr; }
          .tab-content { padding: 20px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .restaurant-stat-revenue { grid-template-columns: repeat(2, 1fr); }
          .button-group { flex-direction: column; align-items: center; }
          .edit-btn, .logout-btn { width: 200px; }
          .edit-cover-btn { font-size: 10px; padding: 5px 8px; }
        }
      `}</style>
    </div>
  );
}
