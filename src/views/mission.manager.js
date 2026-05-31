// src/views/VisitorProfile.js
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Footer from "components/Footers/Footer.js";
import RestaurantCard from "components/Common/restaurantCard";
import EmployeeCard from "components/Common/employecard";
import ProductCard from "components/Common/productCard";
import apiGestionX from "services/apiGestionX";

export default function VisitorProfile() {
  const history = useHistory();
  const location = useLocation();
  const restaurantFromList = location.state?.restaurant || null;

  // ==================== DONNÉES DU RESTAURANT ====================
  const [restaurantData, setRestaurantData] = useState({
    id: restaurantFromList?.id || null,
    name: restaurantFromList?.name || "Restaurant",
    location: restaurantFromList?.location || "",
    description: restaurantFromList?.description || "",
    image: restaurantFromList?.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    logo: restaurantFromList?.logo || "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    phone: restaurantFromList?.phone || "",
    email: restaurantFromList?.email || "",
    rating: restaurantFromList?.rating || 0,
    employees: restaurantFromList?.employees || 0,
    horaires: ""
  });

  // ==================== VISITOR INFO ====================
  const [visitorInfo, setVisitorInfo] = useState({
    name: restaurantFromList?.name || "Restaurant",
    role: "Restaurant Gastronomique",
    experience: "",
    skills: [],
    bio: restaurantFromList?.description || "",
    email: restaurantFromList?.email || "",
    phone: restaurantFromList?.phone || "",
    location: restaurantFromList?.location || "",
    languages: []
  });

  // ==================== MENU ====================
  const [menuCategories, setMenuCategories] = useState([]);

  // ==================== EMPLOYEES ====================
  const [employees, setEmployees] = useState([]);
  
  // ==================== STATES للمودالات ====================
  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showWorkersModal, setShowWorkersModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ==================== CHARGEMENT DES DONNÉES DEPUIS LE BACKEND ====================
  useEffect(() => {
    const restaurantId = restaurantFromList?.id;
    if (!restaurantId) return;

    const loadData = async () => {
      try {
        const categoriesResp = await apiGestionX.getRestaurantCategories(restaurantId);
        const cats = Array.isArray(categoriesResp) ? categoriesResp : categoriesResp?.categories || [];
        const normalizeCategory = (name) => {
          if (!name) return 'plat';
          const key = name.trim().toLowerCase();
          const map = { plats: 'plat', plat: 'plat', boissons: 'boisson', boisson: 'boisson', chicha: 'chicha', desserts: 'dessert', dessert: 'dessert' };
          return map[key] || 'plat';
        };
        const categoriesWithProducts = await Promise.all(cats.map(async (cat) => {
          try {
            const categorieKey = normalizeCategory(cat.name || cat.nom);
            const productsResp = await apiGestionX.getProductsByCategory(restaurantId, categorieKey);
            const products = Array.isArray(productsResp) ? productsResp : productsResp?.products || [];
            return {
              id: cat._id,
              name: cat.name || cat.nom || "Catégorie",
              icon: cat.icon || "🍔",
              color: cat.color || "#4ecdc4",
              products: products.map(p => ({
                id: p._id,
                name: p.name || "Produit",
                price: p.price || 0,
                image: p.image || "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
                description: p.description || ""
              }))
            };
          } catch { return null; }
        }));
        const validCategories = categoriesWithProducts.filter(Boolean);
        if (validCategories.length > 0) setMenuCategories(validCategories);
      } catch (err) {
        console.warn('Erreur chargement menu:', err);
      }

      try {
        const workersResp = await apiGestionX.getWorkersByRestaurant(restaurantId);
        const workersList = Array.isArray(workersResp) ? workersResp : workersResp?.workers || [];
        const mappedEmployees = workersList.map(w => {
          const user = w.user || {};
          return {
            id: w._id,
            name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.name || "Employé",
            role: w.role || "Employé",
            location: user.location || "",
            bio: w.bio || user.bio || "",
            image: user.avatar || w.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'E')}&background=22c55e&color=ffffff`,
            experience: w.experience || "",
            rating: w.rating || 0,
            restaurant: restaurantFromList?.name || ""
          };
        });
        setEmployees(mappedEmployees);
      } catch (err) {
        console.warn('Erreur chargement employés:', err);
      }
    };

    loadData();
  }, [restaurantFromList?.id]);

  const goBack = () => {
    history.goBack();
  };
  
  // ==================== STYLES ====================
  const style = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes shoot {
      0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { transform: translateX(-300px) translateY(300px) rotate(45deg); opacity: 0; }
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes gradient-border {
      0% { background-position: 0% 0%; }
      50% { background-position: 400% 0%; }
      100% { background-position: 0% 0%; }
    }
    
    @keyframes borderPulse {
      0%, 100% { opacity: 0.6; filter: blur(8px); }
      50% { opacity: 1; filter: blur(12px); }
    }
    
    @keyframes rainbowLine {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-8px) translateX(4px); }
      75% { transform: translateY(8px) translateX(-4px); }
    }
    
    @keyframes shine {
      0% { transform: translate(-30%, -30%) rotate(0deg); }
      100% { transform: translate(30%, 30%) rotate(180deg); }
    }
    
    /* زر الرجوع */
    .back-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 100;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(34,197,94,0.4);
      border-radius: 40px;
      padding: 10px 20px;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      transition: all 0.3s;
    }
    
    .back-btn:hover {
      background: rgba(34,197,94,0.2);
      border-color: #22c55e;
      transform: translateX(-3px);
    }
    
    .profile-hero-section {
      position: relative;
      background: linear-gradient(135deg, #0a0a2a, #1a1a3a, #0d0d2b, #0f0c29, #1a1a4a);
      background-size: 400% 400%;
      animation: gradientShift 12s ease infinite;
      min-height: 100vh;
      padding-top: 0;
    }
    
    .shooting-stars {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    }
    
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      opacity: 0.6;
      animation: twinkle 3s ease-in-out infinite;
    }
    
    .shooting-star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      border-radius: 50%;
      opacity: 0;
      animation: shoot 2s ease-out infinite;
    }
    
    /* صورة الغلاف - تمتد لأعلى الصفحة */
    .cover-section {
      position: relative;
      width: 100%;
      height: 350px;
      overflow: hidden;
      margin-top: -80px;
    }
    
    .cover-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center 40%;
      background-repeat: no-repeat;
      transition: transform 0.5s ease;
    }
    
    .cover-image:hover {
      transform: scale(1.03);
    }
    
    .cover-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(26,26,58,0.2) 100%);
    }
    
    .bg-white-card {
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      border-radius: 28px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .gradient-border-box {
      position: relative;
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-top: -60px;
      margin-left: -20px;
    }
    
    .gradient-border-box::before {
      content: "";
      position: absolute;
      inset: -4px;
      z-index: -1;
      background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
      background-size: 450%;
      border-radius: 50%;
      animation: gradient-border 20s linear infinite;
      filter: blur(5px);
    }
    
    .gradient-border-box .content {
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      box-shadow: 0 0 30px rgba(0,0,0,0.3);
    }
    
    .profile-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 170px;
      height: 170px;
      background: radial-gradient(circle, rgba(34,197,94,0.3) 0%, rgba(34,197,94,0) 70%);
      border-radius: 50%;
      z-index: -1;
      animation: borderPulse 2s ease-in-out infinite;
    }
    
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .btn-contact {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      padding: 10px 25px;
      border-radius: 30px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
    }
    
    .btn-contact:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 20px rgba(34,197,94,0.4);
    }
    
    .btn-comment {
      background: linear-gradient(135deg, #ff6b6b, #f5576c);
      border: none;
      padding: 10px 25px;
      border-radius: 30px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
    }
    
    .btn-comment:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 20px rgba(255,107,107,0.4);
    }
    
    .status-badge {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
      background: #22c55e;
      color: white;
    }
    
    .skill-tag {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(34,197,94,0.2);
      border-radius: 15px;
      font-size: 11px;
      margin: 2px;
      color: #4ade80;
      border: 1px solid rgba(34,197,94,0.4);
      backdrop-filter: blur(5px);
    }
    
    .visitor-cards-container {
      display: flex;
      gap: 30px;
      justify-content: center;
      margin-top: 40px;
      flex-wrap: wrap;
      position: relative;
      padding-bottom: 30px;
      z-index: 5;
    }
    
    .visitor-cards-container::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 10%;
      width: 80%;
      height: 4px;
      background: linear-gradient(90deg, transparent, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000, transparent);
      background-size: 200% 100%;
      border-radius: 4px;
      animation: rainbowLine 3s linear infinite;
    }
    
    .visitor-card {
      flex: 1;
      min-width: 280px;
      backdrop-filter: blur(15px);
      border-radius: 30px;
      padding: 35px 25px;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-align: center;
      position: relative;
      overflow: hidden;
      animation: float 4s ease-in-out infinite;
      z-index: 5;
    }
    
    .visitor-card:nth-child(1) {
      background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FF6B6B 100%);
      background-size: 200% 200%;
      box-shadow: 0 15px 35px rgba(255, 107, 107, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.4);
      animation-delay: 0s;
    }
    
    .visitor-card:nth-child(1):hover {
      background-position: 100% 100%;
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 45px rgba(255, 107, 107, 0.5);
    }
    
    .visitor-card:nth-child(2) {
      background: linear-gradient(135deg, #4ECDC4 0%, #556270 50%, #4ECDC4 100%);
      background-size: 200% 200%;
      box-shadow: 0 15px 35px rgba(78, 205, 196, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.4);
      animation-delay: 0.5s;
    }
    
    .visitor-card:nth-child(2):hover {
      background-position: 100% 100%;
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 45px rgba(78, 205, 196, 0.5);
    }
    
    .visitor-card:nth-child(3) {
      background: linear-gradient(135deg, #A8E6CF 0%, #3E92CC 50%, #A8E6CF 100%);
      background-size: 200% 200%;
      box-shadow: 0 15px 35px rgba(62, 146, 204, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.4);
      animation-delay: 1s;
    }
    
    .visitor-card:nth-child(3):hover {
      background-position: 100% 100%;
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 45px rgba(62, 146, 204, 0.5);
    }
    
    .visitor-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.6s;
      pointer-events: none;
    }
    
    .visitor-card:hover::before {
      opacity: 1;
      animation: shine 1.5s;
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
    }
    
    .modal-content {
      background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
      border-radius: 30px;
      padding: 30px;
      max-width: 600px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
      animation: fadeIn 0.4s ease;
    }
    
    .modal-content-large {
      max-width: 900px;
    }
    
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
    
    .close-btn {
      float: right;
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .close-btn:hover {
      transform: scale(1.1);
      color: #ef4444;
    }
    
    .restaurant-info {
      text-align: center;
    }
    
    .restaurant-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 20px;
      margin: 15px 0;
    }
    
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .category-card {
      background: rgba(0,0,0,0.4);
      border-radius: 20px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
    }
    
    .category-card:hover {
      transform: scale(1.02);
      background: rgba(0,0,0,0.6);
    }
    
    .category-card h3,
    .category-card p,
    .category-card div {
      color: white !important;
    }
    
    .workers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .modal-content h2,
    .modal-content h3,
    .modal-content h4,
    .modal-content p,
    .modal-content span,
    .modal-content div:not(.skill-tag),
    .restaurant-info p,
    .restaurant-info h2 {
      color: white !important;
    }
    
    .skill-tag {
      color: #4ade80 !important;
    }
    
    @media (max-width: 768px) {
      .visitor-cards-container {
        flex-direction: column;
        gap: 20px;
        padding: 15px;
      }
      
      .visitor-cards-container::after {
        width: 90%;
        left: 5%;
        bottom: -10px;
      }
      
      .gradient-border-box {
        width: 120px;
        height: 120px;
        margin-top: -50px;
        margin-left: 0;
      }
      
      .action-buttons {
        flex-direction: column;
        gap: 10px;
        align-items: center;
      }
      
      .workers-grid {
        grid-template-columns: 1fr;
      }
      
      .menu-grid {
        grid-template-columns: 1fr;
      }
      
      .products-grid {
        grid-template-columns: 1fr;
      }
      
      .cover-section {
        height: 250px;
        margin-top: -60px;
      }
      
      .back-btn {
        top: 15px;
        left: 15px;
        padding: 6px 12px;
        font-size: 12px;
      }
    }
  `;

  return (
    <>
      <style>{style}</style>
      
      {/* زر الرجوع */}
      <button className="back-btn" onClick={goBack}>
        ← Retour
      </button>
      
      <div className="profile-hero-section">
        <div className="shooting-stars">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={`shooting-${i}`} className="shooting-star" style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 40}%`,
              width: `${Math.random() * 60 + 40}px`,
              height: '2px',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 2 + 1.5}s`,
              transform: `rotate(${Math.random() * 60 + 30}deg)`,
              background: `linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,150,0.8) 30%, rgba(255,255,255,0) 100%)`
            }} />
          ))}
        </div>
        
        <main style={{ position: 'relative', zIndex: 10 }}>
          {/* صورة الغلاف - فقط هذا الجزء تم إضافة margin-top */}
          <div className="cover-section">
            <div 
              className="cover-image" 
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')"
              }}>
            </div>
            <div className="cover-overlay"></div>
          </div>
          
          <section className="relative bg-transparent pb-16 pt-0">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white-card w-full mb-6 shadow-xl rounded-lg" style={{ marginTop: '-80px' }}>
                <div className="px-6">
                  
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="profile-image-wrapper" style={{ position: 'relative' }}>
                        <div className="profile-glow"></div>
                        <div className="gradient-border-box">
                          <img alt="Restaurant Logo" src={restaurantData.logo} className="content" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                      {restaurantData.name}
                      <span className="status-badge">⭐ Restaurant</span>
                    </h3>
                    <div className="text-sm leading-normal mt-2 mb-2 text-white font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2"></i> {restaurantData.location}
                    </div>
                    <div className="mb-2 text-white mt-10">
                      <i className="fas fa-star mr-2 text-green-400"></i> {visitorInfo.role}
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="btn-contact" onClick={() => alert(`📧 Email: ${restaurantData.email}\n📱 Téléphone: ${restaurantData.phone}`)}>
                      📧 Contacter
                    </button>
                    <button className="btn-comment" onClick={() => setShowRestaurantModal(true)}>
                      📖 Découvrir
                    </button>
                  </div>
                  
                  {/* ========== 3 Cartes pour le visiteur ========== */}
                  <div className="visitor-cards-container">
                    
                    <div className="visitor-card" onClick={() => setShowRestaurantModal(true)}>
                      <RestaurantCard 
                        restaurant={restaurantData}
                        showActions={false}
                      />
                    </div>
                    
                    <div className="visitor-card" onClick={() => setShowMenuModal(true)}>
                      <div className="text-6xl mb-4">🍽️</div>
                      <h3 className="text-xl font-bold text-white mb-2">Notre Menu</h3>
                      <p className="text-white text-sm">Découvrez nos délicieux plats, boissons et desserts</p>
                      <div className="mt-4 text-white font-semibold">Cliquez pour commander →</div>
                    </div>
                    
                    <div className="visitor-card" onClick={() => setShowWorkersModal(true)}>
                      <div className="text-6xl mb-4">👨‍🍳</div>
                      <h3 className="text-xl font-bold text-white mb-2">Notre Équipe</h3>
                      <p className="text-white text-sm">Rencontrez nos professionnels passionnés</p>
                      <div className="mt-4 text-white font-semibold">Cliquez pour voir →</div>
                    </div>
                    
                  </div>
                  
                  <div className="mt-10 py-10 border-t border-white/20 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-white italic">"{visitorInfo.bio}"</p>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                          {visitorInfo.skills.map((skill, i) => (<span key={i} className="skill-tag">{skill}</span>))}
                        </div>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                          {visitorInfo.languages.map((lang, i) => (<span key={i} className="skill-tag">🌐 {lang}</span>))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      {/* ========== MODAL RESTAURANT DÉTAILS ========== */}
      {showRestaurantModal && (
        <div className="modal-overlay" onClick={() => setShowRestaurantModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowRestaurantModal(false)}>✕</button>
            <div className="restaurant-info">
              <div className="text-6xl mb-4">🏪</div>
              <h2 className="text-2xl font-bold text-white mb-2">{restaurantData.name}</h2>
              <div className="w-16 h-0.5 bg-green-500 mx-auto mb-6"></div>
              <p className="text-white mb-2 font-bold">{restaurantData.location}</p>
              <p className="text-white mb-2">{visitorInfo.role}</p>
              <img src={restaurantData.image} alt="restaurant" className="restaurant-image" />
              <p className="text-white mb-4 italic">"{visitorInfo.bio}"</p>
              <p className="text-white/90 text-sm mb-2">📍 {restaurantData.location}</p>
              <p className="text-white/90 text-sm mb-2">📞 {restaurantData.phone}</p>
              <p className="text-white/90 text-sm mb-2">✉️ {restaurantData.email}</p>
              <div className="mt-4">
                <h4 className="text-white font-bold mb-2">Nos spécialités</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {visitorInfo.skills.map((spec, i) => (<span key={i} className="skill-tag">{spec}</span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* ========== MODAL MENU - Categories ========== */}
      {showMenuModal && (
        <div className="modal-overlay" onClick={() => setShowMenuModal(false)}>
          <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowMenuModal(false)}>✕</button>
            <div className="text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-3xl font-bold text-white mb-2">Notre Menu</h2>
              <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
              <p className="text-white mb-6">Découvrez nos délicieuses catégories</p>
            </div>
            
            <div className="menu-grid">
              {menuCategories.map(cat => (
                <div key={cat.id} className="category-card" onClick={() => setSelectedCategory(cat)}>
                  <div className="text-5xl mb-3">{cat.icon}</div>
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                  <p className="text-white/80 text-sm mt-2">{cat.products.length} produits</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* ========== MODAL Products by Category ========== */}
      {selectedCategory && (
        <div className="modal-overlay" onClick={() => setSelectedCategory(null)}>
          <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedCategory(null)}>✕</button>
            <div className="text-center">
              <div className="text-5xl mb-3">{selectedCategory.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{selectedCategory.name}</h2>
              <div className="w-16 h-0.5 bg-green-500 mx-auto mb-6"></div>
            </div>
            
            <div className="products-grid">
              {selectedCategory.products.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  showOrderButton={true}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* ========== MODAL Workers ========== */}
      {showWorkersModal && (
        <div className="modal-overlay" onClick={() => setShowWorkersModal(false)}>
          <div className="modal-content modal-content-large" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowWorkersModal(false)}>✕</button>
            <div className="text-center">
              <div className="text-6xl mb-4">👨‍🍳</div>
              <h2 className="text-3xl font-bold text-white mb-2">Notre Équipe</h2>
              <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
              <p className="text-white mb-6">Des professionnels passionnés à votre service</p>
            </div>
            
            <div className="workers-grid">
              {employees.map(worker => (
                <EmployeeCard 
                  key={worker.id}
                  employee={worker}
                  showActions={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
}