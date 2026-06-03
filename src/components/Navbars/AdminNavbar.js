/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "components/Common/restaurantCard.js";
import jobOfferService from "services/jobOfferService";
import apiUser from "services/apiUser";

export default function AuthNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);
  
  const [showJobOffers, setShowJobOffers] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");
  const [jobOffers, setJobOffers] = React.useState([]);
  const [isLoadingJobOffers, setIsLoadingJobOffers] = React.useState(false);

  // ==================== Images depuis l'appareil avec sauvegarde ====================
  const [tempProfile, setTempProfile] = React.useState({
    name: "Jenna",
    lastName: "Stones",
    role: "Serveuse / Barmaid",
    location: "Paris, France",
    phone: "+33 6 12 34 56 78",
    workTime: "Lundi - Samedi: 10:00 - 19:00",
    bio: "Serveuse professionnelle avec 5 ans d'expérience dans la restauration.",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    email: "jenna.stones@example.com",
    skills: ["Service client", "Gestion des commandes", "Polyvalence", "Anglais courant"]
  });

  // ==================== State pour les images téléchargées ====================
  const [showCoverUpload, setShowCoverUpload] = React.useState(false);
  const [showProfileUpload, setShowProfileUpload] = React.useState(false);
  const [coverPreview, setCoverPreview] = React.useState(null);
  const [profilePreview, setProfilePreview] = React.useState(null);

  // ==================== Fonctions de téléchargement d'images ====================
  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setCoverPreview(imageData);
        setTempProfile({ ...tempProfile, coverImage: imageData });
        // Sauvegarde dans localStorage
        localStorage.setItem("coverImage", imageData);
      };
      reader.readAsDataURL(file);
    }
    setShowCoverUpload(false);
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setProfilePreview(imageData);
        setTempProfile({ ...tempProfile, profileImage: imageData });
        // Sauvegarde dans localStorage
        localStorage.setItem("profileImage", imageData);
      };
      reader.readAsDataURL(file);
    }
    setShowProfileUpload(false);
  };

  // ==================== Chargement des images sauvegardées au démarrage ====================
  React.useEffect(() => {
    const savedCover = localStorage.getItem("coverImage");
    const savedProfile = localStorage.getItem("profileImage");
    if (savedCover) {
      setTempProfile(prev => ({ ...prev, coverImage: savedCover }));
      setCoverPreview(savedCover);
    }
    if (savedProfile) {
      setTempProfile(prev => ({ ...prev, profileImage: savedProfile }));
      setProfilePreview(savedProfile);
    }
  }, []);

  // ==================== Chargement des données utilisateur depuis le backend ====================
  React.useEffect(() => {
    const loadUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const userData = await apiUser.getProfileInfo(userId);
        setTempProfile(prev => ({
          ...prev,
          name: userData.firstName || prev.name,
          lastName: userData.lastName || prev.lastName,
          location: userData.location || prev.location,
          phone: userData.phone || prev.phone,
          bio: userData.bio || prev.bio,
          email: userData.email || prev.email,
          coverImage: userData.coverImage || prev.coverImage,
          profileImage: userData.avatar || prev.profileImage
        }));
      } catch (error) {
        console.warn('Erreur chargement profil:', error);
      }

      try {
        const links = await apiUser.getSocialLinks(userId);
        setSocialLinks({
          facebook: links.facebook || "",
          instagram: links.instagram || "",
          twitter: links.twitter || "",
          linkedin: links.linkedin || "",
          tiktok: links.tiktok || ""
        });
      } catch (error) {
        console.warn('Erreur chargement liens sociaux:', error);
      }
    };

    loadUserData();
  }, []);

  React.useEffect(() => {
    const fetchWorkerOffers = async () => {
      if (localStorage.getItem("userRole") !== "WORKER") return;
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      setIsLoadingJobOffers(true);
      try {
        const workerResponse = await jobOfferService.getWorkerByUser(userId);
        const workerId = workerResponse?.worker?._id || workerResponse?._id;
        if (!workerId) return;

        const offersResponse = await jobOfferService.getMyJobOffers(workerId);
        const backendOffers = offersResponse?.jobOffers || offersResponse?.offers || offersResponse || [];
        setJobOffers(Array.isArray(backendOffers) ? backendOffers : []);
      } catch (error) {
        console.error("Erreur de chargement des offres d'emploi:", error);
      } finally {
        setIsLoadingJobOffers(false);
      }
    };

    fetchWorkerOffers();
  }, []);

  const [socialLinks, setSocialLinks] = React.useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tiktok: ""
  });

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

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // ==================== useCallback pour optimiser les performances ====================
  const handleAcceptOffer = React.useCallback(async (offerId) => {
    const acceptedOffer = jobOffers.find(offer => (offer._id || offer.id) === offerId);
    try {
      await jobOfferService.acceptJobOffer(offerId);
    } catch (error) {
      console.error("Erreur d'acceptation de l'offre:", error);
    }
    setJobOffers(prev => prev.filter(offer => (offer._id || offer.id) !== offerId));
    showNotificationMessage(`✅ Félicitations ! Vous avez accepté l'offre chez ${acceptedOffer?.name || acceptedOffer?.restaurant?.name || 'ce restaurant'}`);
    setShowJobOffers(false);
  }, [jobOffers]);

  const handleRejectOffer = React.useCallback(async (offerId) => {
    const rejectedOffer = jobOffers.find(offer => (offer._id || offer.id) === offerId);
    try {
      await jobOfferService.rejectJobOffer(offerId);
    } catch (error) {
      console.error("Erreur de rejet de l'offre:", error);
    }
    setJobOffers(prev => prev.filter(offer => (offer._id || offer.id) !== offerId));
    showNotificationMessage(`❌ Vous avez refusé l'offre chez ${rejectedOffer?.name || rejectedOffer?.restaurant?.name || 'ce restaurant'}`);
  }, [jobOffers]);

  const pendingOffersCount = jobOffers.length;

  const SocialIcons = React.useMemo(() => () => (
    <div className="flex justify-center gap-4 mt-4">
      {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400"><i className="fab fa-facebook-f text-xl"></i></a>}
      {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400"><i className="fab fa-instagram text-xl"></i></a>}
      {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300"><i className="fab fa-twitter text-xl"></i></a>}
      {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600"><i className="fab fa-linkedin-in text-xl"></i></a>}
      {socialLinks.tiktok && <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><i className="fab fa-tiktok text-xl"></i></a>}
    </div>
  ), [socialLinks]);

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
          }
          
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
            background: linear-gradient(135deg, #1a1a2e, #16213e);
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
          
          .profile-image-sidebar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto;
            border: 3px solid #a855f7;
            object-fit: cover;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .profile-image-sidebar:hover {
            opacity: 0.8;
            transform: scale(1.02);
          }
          
          .cover-image-preview {
            width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 15px;
            margin-bottom: 10px;
            cursor: pointer;
          }
          
          .profile-name-sidebar {
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            margin-top: 10px;
          }
          
          .profile-role-sidebar {
            color: #a855f7;
            font-size: 0.85rem;
            margin-top: 5px;
          }
          
          .sidebar-section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          
          .sidebar-title {
            color: #a855f7;
            font-size: 1rem;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .sidebar-input {
            width: 100%;
            padding: 10px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 15px;
            color: white;
            margin-bottom: 10px;
          }
          
          .sidebar-input:focus {
            outline: none;
            border-color: #a855f7;
          }
          
          .sidebar-label {
            color: rgba(255,255,255,0.7);
            font-size: 0.75rem;
            margin-bottom: 5px;
            display: block;
          }
          
          .btn-sidebar {
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
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
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            transform: scale(1.02);
          }
          
          .btn-danger-sidebar {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
          }
          
          .btn-upload {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border: none;
            padding: 6px 12px;
            border-radius: 20px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            font-size: 0.7rem;
            margin-top: 5px;
            transition: all 0.2s;
          }
          
          .btn-upload:hover {
            transform: scale(1.02);
          }
          
          .job-offers-btn-sidebar {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border: none;
            padding: 12px;
            border-radius: 25px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;
            transition: all 0.2s;
            position: relative;
          }
          
          .job-offers-btn-sidebar:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
          }
          
          .offers-badge-sidebar {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
          }
          
          .job-offers-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(12px);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease;
          }
          
          .job-offers-modal-container {
            background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
            border-radius: 30px;
            width: 90%;
            max-width: 650px;
            max-height: 85vh;
            overflow-y: auto;
            padding: 25px;
            border: 2px solid #f59e0b;
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.3);
            animation: slideUp 0.25s ease;
            will-change: transform, opacity;
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .close-offers-btn {
            float: right;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .close-offers-btn:hover {
            transform: scale(1.1);
            color: #ef4444;
          }
          
          .offers-title {
            color: white;
            font-size: 1.3rem;
            text-align: center;
            margin-bottom: 20px;
          }
          
          .offers-list {
            display: flex;
            flex-direction: column;
            gap: 25px;
          }
          
          .no-offers-message {
            text-align: center;
            padding: 40px;
            color: #94a3b8;
          }
          
          .offer-item-wrapper {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .offer-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            padding: 10px 0 5px 0;
          }
          
          .accept-offer-btn {
            background: linear-gradient(135deg, #22c55e, #15803d);
            border: none;
            padding: 10px 25px;
            border-radius: 30px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
            flex: 1;
            max-width: 180px;
          }
          
          .reject-offer-btn {
            background: linear-gradient(135deg, #ef4444, #b91c1c);
            border: none;
            padding: 10px 25px;
            border-radius: 30px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
            flex: 1;
            max-width: 180px;
          }
          
          .accept-offer-btn:hover, .reject-offer-btn:hover {
            transform: scale(1.02);
            filter: brightness(1.05);
          }
          
          .notification-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #22c55e, #15803d);
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            font-weight: 500;
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
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
            border: 2px solid #a855f7;
            animation: fadeIn 0.3s ease;
          }
          
          .confirm-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
          }
          
          .hidden-file-input {
            display: none;
          }
        `}
      </style>
    
      {/* NAVBAR */}
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-custom shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start items-center">
            <div className="settings-icon-btn" onClick={() => setSidebarOpen(true)}>
              <i className="fas fa-cog text-white"></i>
            </div>
            
            <Link to="/" className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase flex items-center" style={{ textShadow: "0 0 10px rgba(168, 85, 247, 0.5)" }}>
              <img src="/restosmart.jfif" alt="RestoSmart" className="h-8 w-8 rounded-full mr-2" />
              RestoSmart
            </Link>
            
            <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-white" type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          
          <div className={"lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none" + (navbarOpen ? " block" : " hidden")} style={navbarOpen ? { background: "linear-gradient(135deg, #9b2dff, #7c3aed)" } : {}}>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center"><Link to="/landing3" className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"><span className="inline-block ml-2">🏠 Accueil</span></Link></li>
              <li className="flex items-center"><Link to="/restaurants3" className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"><span className="inline-block ml-2">🍽️ Restaurants</span></Link></li>
              <li className="flex items-center"><Link to="/profileemploye" className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"><span className="inline-block ml-2">👤 Profil</span></Link></li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* SIDEBAR */}
      {sidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
          <div className="sidebar-manager">
            <button onClick={() => setSidebarOpen(false)} style={{ float: 'right', background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>✕</button>
            
            <div className="text-center mb-5">
              {/* Image de profil - cliquable pour la modifier */}
              <img 
                src={tempProfile.profileImage} 
                alt="profile" 
                className="profile-image-sidebar" 
                onClick={() => setShowProfileUpload(true)}
                title="Cliquez pour changer l'image"
              />
              <h4 className="profile-name-sidebar">{tempProfile.name} {tempProfile.lastName}</h4>
              <p className="profile-role-sidebar">{tempProfile.role}</p>
              <p className="text-gray-400 text-xs mt-2">{tempProfile.location}</p>
            </div>
            
            <button className="job-offers-btn-sidebar" onClick={() => setShowJobOffers(true)}>
              <span>🎯</span> Offres d'emploi
              {pendingOffersCount > 0 && <span className="offers-badge-sidebar">{pendingOffersCount}</span>}
            </button>
            
            <div className="sidebar-section">
              <div className="sidebar-title"><i className="fas fa-sliders-h"></i> Paramètres du profil</div>
              
              {/* Image de couverture - cliquable pour la modifier */}
              <label className="sidebar-label">🖼️ Image de couverture</label>
              {tempProfile.coverImage && (
                <img 
                  src={tempProfile.coverImage} 
                  alt="cover preview" 
                  className="cover-image-preview" 
                  onClick={() => setShowCoverUpload(true)}
                  title="Cliquez pour changer l'image"
                />
              )}
              <button className="btn-upload" onClick={() => setShowCoverUpload(true)}>
                📸 Changer l'image de couverture
              </button>
              
              {/* Image de profil */}
              <label className="sidebar-label mt-3">👤 Image de profil</label>
              <button className="btn-upload" onClick={() => setShowProfileUpload(true)}>
                📷 Changer l'image de profil
              </button>
              
              <label className="sidebar-label mt-3">📛 Prénom</label>
              <input type="text" className="sidebar-input" value={tempProfile.name} onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} />
              
              <label className="sidebar-label">📛 Nom</label>
              <input type="text" className="sidebar-input" value={tempProfile.lastName} onChange={(e) => setTempProfile({...tempProfile, lastName: e.target.value})} />
              
              <label className="sidebar-label">💼 Poste</label>
              <input type="text" className="sidebar-input" value={tempProfile.role} onChange={(e) => setTempProfile({...tempProfile, role: e.target.value})} />
              
              <label className="sidebar-label">📍 Localisation</label>
              <input type="text" className="sidebar-input" value={tempProfile.location} onChange={(e) => setTempProfile({...tempProfile, location: e.target.value})} />
              
              <label className="sidebar-label">📞 Téléphone</label>
              <input type="tel" className="sidebar-input" value={tempProfile.phone} onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})} />
              
              <label className="sidebar-label">📧 Email</label>
              <input type="email" className="sidebar-input" value={tempProfile.email} onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})} />
              
              <label className="sidebar-label">📝 Bio</label>
              <textarea className="sidebar-input" rows="3" value={tempProfile.bio} onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})} />
              
              <button className="btn-sidebar" onClick={saveProfileSettings}><i className="fas fa-save mr-2"></i> Enregistrer</button>
            </div>
            
            <div className="sidebar-section">
              <div className="sidebar-title"><i className="fas fa-share-alt"></i> Liens sociaux</div>
              <label className="sidebar-label">📘 Facebook</label>
              <input type="text" className="sidebar-input" value={socialLinks.facebook} onChange={(e) => updateSocialLink('facebook', e.target.value)} />
              <label className="sidebar-label">📷 Instagram</label>
              <input type="text" className="sidebar-input" value={socialLinks.instagram} onChange={(e) => updateSocialLink('instagram', e.target.value)} />
              <label className="sidebar-label">🐦 Twitter</label>
              <input type="text" className="sidebar-input" value={socialLinks.twitter} onChange={(e) => updateSocialLink('twitter', e.target.value)} />
              <label className="sidebar-label">🔗 LinkedIn</label>
              <input type="text" className="sidebar-input" value={socialLinks.linkedin} onChange={(e) => updateSocialLink('linkedin', e.target.value)} />
              <label className="sidebar-label">🎵 TikTok</label>
              <input type="text" className="sidebar-input" value={socialLinks.tiktok} onChange={(e) => updateSocialLink('tiktok', e.target.value)} />
              <button className="btn-sidebar" onClick={saveSocialLinks}><i className="fas fa-save mr-2"></i> Enregistrer</button>
            </div>
            
            <div className="sidebar-section">
              <button className="btn-sidebar btn-danger-sidebar" onClick={() => setShowLogoutConfirm(true)}><i className="fas fa-sign-out-alt mr-2"></i> Déconnexion</button>
            </div>
          </div>
        </>
      )}
      
      {/* Inputs cachés pour le téléchargement d'images */}
      <input 
        type="file" 
        id="coverUpload" 
        className="hidden-file-input" 
        accept="image/*" 
        onChange={handleCoverImageUpload}
        style={{ display: 'none' }}
      />
      <input 
        type="file" 
        id="profileUpload" 
        className="hidden-file-input" 
        accept="image/*" 
        onChange={handleProfileImageUpload}
        style={{ display: 'none' }}
      />
      
      {/* Modal des offres d'emploi optimisé */}
      {showJobOffers && (
        <div className="job-offers-modal-overlay" onClick={() => setShowJobOffers(false)}>
          <div className="job-offers-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-offers-btn" onClick={() => setShowJobOffers(false)}>✕</button>
            <h3 className="offers-title">📢 Offres d'emploi disponibles</h3>
            
            <div className="offers-list">
              {isLoadingJobOffers ? (
                <div className="no-offers-message">
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⏳</div>
                  <p>Chargement de vos offres...</p>
                </div>
              ) : jobOffers.length === 0 ? (
                <div className="no-offers-message">
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎉</div>
                  <p>Aucune offre d'emploi disponible</p>
                </div>
              ) : (
                jobOffers.map((offer) => {
                  const restaurantData = offer.restaurant || {};
                  const displayItem = {
                    ...restaurantData,
                    name: restaurantData.name || offer.manager?.user?.name || "Offre d'emploi",
                    location: restaurantData.location || offer.restaurant?.address || "",
                    description: restaurantData.description || restaurantData.bio || "Nouvelle offre de travail disponible.",
                    image: restaurantData.image || restaurantData.coverImage || "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
                    logo: restaurantData.logo || restaurantData.image || "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
                  };
                  const offerId = offer._id || offer.id;

                  return (
                    <div key={offerId} className="offer-item-wrapper">
                      <RestaurantCard restaurant={displayItem} />
                      <div className="offer-buttons">
                        <button className="accept-offer-btn" onClick={() => handleAcceptOffer(offerId)}>
                          ✅ Accepter l'offre
                        </button>
                        <button className="reject-offer-btn" onClick={() => handleRejectOffer(offerId)}>
                          ❌ Refuser l'offre
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Téléchargement image de couverture */}
      {showCoverUpload && (
        <div className="modal-overlay-custom" onClick={() => setShowCoverUpload(false)}>
          <div className="modal-content-custom" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">🖼️</div>
              <h3 className="text-xl font-bold text-white mb-3">Changer l'image de couverture</h3>
              <p className="text-gray-300 mb-4">Choisissez une image depuis votre appareil</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleCoverImageUpload}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '10px',
                  color: 'white',
                  width: '100%'
                }}
              />
              <button className="btn-sidebar mt-3" onClick={() => setShowCoverUpload(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Téléchargement image de profil */}
      {showProfileUpload && (
        <div className="modal-overlay-custom" onClick={() => setShowProfileUpload(false)}>
          <div className="modal-content-custom" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">👤</div>
              <h3 className="text-xl font-bold text-white mb-3">Changer l'image de profil</h3>
              <p className="text-gray-300 mb-4">Choisissez une image depuis votre appareil</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleProfileImageUpload}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '15px',
                  padding: '10px',
                  color: 'white',
                  width: '100%'
                }}
              />
              <button className="btn-sidebar mt-3" onClick={() => setShowProfileUpload(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      
      {showNotification && <div className="notification-toast">{notificationMessage}</div>}
      
      {showLogoutConfirm && (
        <div className="modal-overlay-custom" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">🚪</div>
              <h3 className="text-xl font-bold text-white mb-3">Déconnexion</h3>
              <p className="text-gray-300 mb-5">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              <div className="confirm-buttons">
                <button className="btn-sidebar" style={{ background: '#22c55e' }} onClick={handleLogout}><i className="fas fa-check mr-2"></i> Oui</button>
                <button className="btn-sidebar btn-danger-sidebar" onClick={() => setShowLogoutConfirm(false)}><i className="fas fa-times mr-2"></i> Non</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ position: 'fixed', bottom: '20px', left: 0, right: 0, zIndex: 50 }}>
        <SocialIcons />
      </div>
    </>
  );
}