/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import apiUser from "services/apiUser";

export default function AuthNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  // ==================== Paramètres du profil ====================
  const [tempProfile, setTempProfile] = React.useState({
    name: "",
    lastName: "",
    location: "",
    phone: "",
    workTime: "",
    bio: "",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  });

  // ==================== Liens sociaux ====================
  const [socialLinks, setSocialLinks] = React.useState({
    facebook: "",
    instagram: "",
    snapchat: "",
    tiktok: "",
    whatsapp: ""
  });

  // ==================== Chargement des données utilisateur ====================
  React.useEffect(() => {
    const loadUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const userData = await apiUser.getProfileInfo(userId);
        setTempProfile({
          name: userData.firstName || "",
          lastName: userData.lastName || "",
          location: userData.location || "",
          phone: userData.phone || "",
          workTime: userData.workTime || "",
          bio: userData.bio || "",
          coverImage: userData.coverImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
          profileImage: userData.avatar || "https://randomuser.me/api/portraits/men/32.jpg"
        });
      } catch (error) {
        console.warn('Erreur chargement profil:', error);
      }

      try {
        const links = await apiUser.getSocialLinks(userId);
        setSocialLinks({
          facebook: links.facebook || "",
          instagram: links.instagram || "",
          snapchat: links.snapchat || "",
          tiktok: links.tiktok || "",
          whatsapp: links.whatsapp || ""
        });
      } catch (error) {
        console.warn('Erreur chargement liens sociaux:', error);
      }
    };

    loadUserData();
  }, []);

  // ==================== Fonctions ====================
  const handleLogout = () => {
    setShowLogoutConfirm(false);
    localStorage.clear();
    window.location.href = "/auth/login";
  };

  const saveProfileSettings = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("❌ Utilisateur non connecté");
      return;
    }

    try {
      await apiUser.updateProfileInfo(userId, {
        firstName: tempProfile.name,
        lastName: tempProfile.lastName,
        phone: tempProfile.phone,
        location: tempProfile.location,
        bio: tempProfile.bio,
        avatar: tempProfile.profileImage,
        coverImage: tempProfile.coverImage
      });
      alert("✅ Profil mis à jour avec succès!");
      setSidebarOpen(false);
    } catch (error) {
      console.error('❌ Erreur mise à jour profil:', error);
      alert(`❌ Échec de la mise à jour: ${error?.message || JSON.stringify(error)}`);
    }
  };

  const updateSocialLink = (platform, url) => {
    setSocialLinks({ ...socialLinks, [platform]: url });
  };

  const saveSocialLinks = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("❌ Utilisateur non connecté");
      return;
    }

    try {
      await apiUser.saveSocialLinks(userId, socialLinks);
      alert("✅ Liens sociaux mis à jour!");
      setSidebarOpen(false);
    } catch (error) {
      console.error('❌ Erreur mise à jour liens sociaux:', error);
      alert(`❌ Échec de la mise à jour: ${error?.message || JSON.stringify(error)}`);
    }
  };

  const SocialIcons = () => (
    <div className="flex justify-center gap-4 mt-4">
      {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"><i className="fab fa-facebook-f text-xl"></i></a>}
      {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 transition-all duration-300 transform hover:scale-110"><i className="fab fa-instagram text-xl"></i></a>}
      {socialLinks.snapchat && <a href={socialLinks.snapchat} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"><i className="fab fa-snapchat-ghost text-xl"></i></a>}
      {socialLinks.tiktok && <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-110"><i className="fab fa-tiktok text-xl"></i></a>}
      {socialLinks.whatsapp && <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition-all duration-300 transform hover:scale-110"><i className="fab fa-whatsapp text-xl"></i></a>}
    </div>
  );

  return (
    <>
      <style>
        {`
          .navbar-custom {
            background: linear-gradient(135deg, #9b2dff, #7c3aed, #a855f7);
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
          }
          
          .navbar-custom .nav-link {
            transition: all 0.3s ease;
          }
          
          .navbar-custom .nav-link:hover {
            color: #e9d5ff !important;
            transform: translateY(-2px);
          }
          
          .mobile-menu {
            background: linear-gradient(135deg, #9b2dff, #7c3aed);
          }

          /* Settings icon button */
          .settings-icon-btn {
            background: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 8px;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 12px;
          }
          
          .settings-icon-btn i {
            font-size: 1rem;
          }
          
          .settings-icon-btn:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.05) rotate(15deg);
            box-shadow: 0 0 12px rgba(255,255,255,0.3);
          }
          
          /* Sidebar styles */
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(5px);
            z-index: 1000;
            animation: fadeIn 0.3s ease;
          }
          
          .sidebar-manager {
            position: fixed;
            top: 0;
            left: 0;
            width: 85%;
            max-width: 400px;
            height: 100vh;
            background: linear-gradient(135deg, #9b2dff, #7c3aed, #a855f7);
            z-index: 1001;
            padding: 20px;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
            border-right: 2px solid #a855f7;
            box-shadow: 5px 0 30px rgba(0,0,0,0.5);
          }
          
          .sidebar-manager::-webkit-scrollbar {
            width: 6px;
          }
          
          .sidebar-manager::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1);
          }
          
          .sidebar-manager::-webkit-scrollbar-thumb {
            background: #a855f7;
            border-radius: 10px;
          }
          
          .sidebar-section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          
          .sidebar-title {
            color: #e9d5ff;
            font-size: 1.1rem;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .sidebar-input {
            width: 100%;
            padding: 10px;
            background: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 15px;
            color: white;
            margin-bottom: 10px;
          }
          
          .sidebar-input:focus {
            outline: none;
            border-color: #e9d5ff;
          }
          
          .sidebar-input::placeholder {
            color: rgba(255,255,255,0.5);
          }
          
          .sidebar-label {
            color: rgba(255,255,255,0.8);
            font-size: 0.8rem;
            margin-bottom: 5px;
            display: block;
          }
          
          .btn-sidebar {
            background: linear-gradient(135deg, #6b21a5, #581c87);
            border: none;
            padding: 10px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            transition: all 0.2s;
          }
          
          .btn-sidebar:hover {
            background: linear-gradient(135deg, #7e22ce, #6b21a5);
            transform: scale(1.02);
          }
          
          .btn-owners {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border: none;
            padding: 10px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            transition: all 0.2s;
          }
          
          .btn-owners:hover {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            transform: scale(1.02);
          }
          
          .btn-danger-sidebar {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
          }
          
          .modal-overlay-custom {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(10px);
            z-index: 1100;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .modal-content-custom {
            background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
            border-radius: 30px;
            padding: 25px;
            max-width: 500px;
            width: 90%;
            max-height: 85vh;
            overflow-y: auto;
            border: 2px solid #a855f7;
            animation: fadeIn 0.3s ease;
          }
          
          .confirm-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
          }
        `}
      </style>
    
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-custom shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start items-center">
            {/* أيقونة الإعدادات (ترس) */}
            <div className="settings-icon-btn" onClick={() => setSidebarOpen(true)}>
              <i className="fas fa-cog text-white"></i>
            </div>
            
            <Link
              to="/"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase flex items-center"
              style={{
                textShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                letterSpacing: "1px"
              }}
            >
              <img src="/restosmart.jfif" alt="RestoSmart" className="h-8 w-8 rounded-full mr-2" />
              RestoSmart
            </Link>
            
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-white"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          
          <div
            className={
              "lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
            style={navbarOpen ? { background: "linear-gradient(135deg, #9b2dff, #7c3aed)" } : {}}
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/landing2"
                  className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold transition-all duration-300"
                >
                  <span className="inline-block ml-2">🏠 Home</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/restaurants2"
                  className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold transition-all duration-300"
                >
                  <span className="inline-block ml-2">🍽️ Restaurants</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/profilemanager"
                  className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold transition-all duration-300"
                >
                  <span className="inline-block ml-2">👤 Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* ========== القائمة الجانبية (Sidebar) ========== */}
      {sidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
          <div className="sidebar-manager">
            <button onClick={() => setSidebarOpen(false)} style={{ float: 'right', background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            
            {/* صورة البروفيل المصغرة */}
            <div className="text-center mb-5">
              <img src={tempProfile.profileImage} alt="profile" style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto', border: '2px solid #a855f7' }} />
              <h4 className="text-white mt-2">{tempProfile.name} {tempProfile.lastName}</h4>
              <p className="text-purple-200 text-sm">Directeur Général</p>
            </div>
            
            {/* ====== قسم إعدادات البروفيل ====== */}
            <div className="sidebar-section">
              <div className="sidebar-title"><i className="fas fa-sliders-h"></i> Paramètres du profil</div>
              
              <label className="sidebar-label">🖼️ Image de couverture (URL)</label>
              <input type="text" className="sidebar-input" value={tempProfile.coverImage} onChange={(e) => setTempProfile({...tempProfile, coverImage: e.target.value})} placeholder="https://example.com/cover.jpg" />
              
              <label className="sidebar-label">👤 Image de profil (URL)</label>
              <input type="text" className="sidebar-input" value={tempProfile.profileImage} onChange={(e) => setTempProfile({...tempProfile, profileImage: e.target.value})} placeholder="https://example.com/profile.jpg" />
              
              <label className="sidebar-label">📛 Prénom</label>
              <input type="text" className="sidebar-input" value={tempProfile.name} onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} placeholder="Prénom" />
              
              <label className="sidebar-label">📛 Nom de famille</label>
              <input type="text" className="sidebar-input" value={tempProfile.lastName} onChange={(e) => setTempProfile({...tempProfile, lastName: e.target.value})} placeholder="Nom de famille" />
              
              <label className="sidebar-label">📍 Ville / Localisation</label>
              <input type="text" className="sidebar-input" value={tempProfile.location} onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})} placeholder="Ville" />
              
              <label className="sidebar-label">📞 Téléphone</label>
              <input type="tel" className="sidebar-input" value={tempProfile.phone} onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})} placeholder="Téléphone" />
              
              <label className="sidebar-label">⏰ Horaires de travail</label>
              <input type="text" className="sidebar-input" value={tempProfile.workTime} onChange={(e) => setTempProfile({...tempProfile, workTime: e.target.value})} placeholder="Lundi - Vendredi: 09:00 - 18:00" />
              
              <label className="sidebar-label">📝 Bio / Description</label>
              <textarea className="sidebar-input" rows="3" value={tempProfile.bio} onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})} placeholder="Parlez de vous..."></textarea>
              
              <button className="btn-sidebar" onClick={saveProfileSettings}>
                <i className="fas fa-save mr-2"></i> Enregistrer les modifications
              </button>
            </div>
            
            {/* ====== قسم الروابط الاجتماعية (5 أيقونات) ====== */}
            <div className="sidebar-section">
              <div className="sidebar-title"><i className="fas fa-share-alt"></i> Liens sociaux</div>
              
              <label className="sidebar-label">📘 Facebook</label>
              <input type="text" className="sidebar-input" placeholder="https://facebook.com/..." value={socialLinks.facebook} onChange={(e) => updateSocialLink('facebook', e.target.value)} />
              
              <label className="sidebar-label">📷 Instagram</label>
              <input type="text" className="sidebar-input" placeholder="https://instagram.com/..." value={socialLinks.instagram} onChange={(e) => updateSocialLink('instagram', e.target.value)} />
              
              <label className="sidebar-label">👻 Snapchat</label>
              <input type="text" className="sidebar-input" placeholder="https://snapchat.com/..." value={socialLinks.snapchat} onChange={(e) => updateSocialLink('snapchat', e.target.value)} />
              
              <label className="sidebar-label">🎵 TikTok</label>
              <input type="text" className="sidebar-input" placeholder="https://tiktok.com/..." value={socialLinks.tiktok} onChange={(e) => updateSocialLink('tiktok', e.target.value)} />
              
              <label className="sidebar-label">💚 WhatsApp</label>
              <input type="text" className="sidebar-input" placeholder="https://wa.me/XXXXXXXXXX" value={socialLinks.whatsapp} onChange={(e) => updateSocialLink('whatsapp', e.target.value)} />
              
              <button className="btn-sidebar" onClick={saveSocialLinks}>
                <i className="fas fa-save mr-2"></i> Enregistrer les liens
              </button>
            </div>
            
            {/* ====== زر Propriétaires ====== */}
            <div className="sidebar-section">
              <Link to="/owners" className="btn-owners" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                <i className="fas fa-users mr-2"></i> Propriétaires
              </Link>
            </div>
            
            {/* ====== زر تسجيل الخروج ====== */}
            <div className="sidebar-section">
              <button className="btn-sidebar btn-danger-sidebar" onClick={() => setShowLogoutConfirm(true)}>
                <i className="fas fa-sign-out-alt mr-2"></i> Déconnexion
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* ========== مودال تأكيد تسجيل الخروج ========== */}
      {showLogoutConfirm && (
        <div className="modal-overlay-custom" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content-custom" style={{ maxWidth: '350px' }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">🚪</div>
              <h3 className="text-xl font-bold text-white mb-3">Déconnexion</h3>
              <p className="text-gray-300 mb-5">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              <div className="confirm-buttons">
                <button className="btn-sidebar" style={{ background: '#22c55e' }} onClick={handleLogout}>
                  <i className="fas fa-check mr-2"></i> Oui
                </button>
                <button className="btn-sidebar btn-danger-sidebar" onClick={() => setShowLogoutConfirm(false)}>
                  <i className="fas fa-times mr-2"></i> Non
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* ========== أيقونات التواصل الاجتماعي في الفوتر ========== */}
      <div style={{ position: 'fixed', bottom: '20px', left: 0, right: 0, zIndex: 50 }}>
        <SocialIcons />
      </div>
    </>
  );
}