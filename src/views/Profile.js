// src/views/Profile.js - صفحة الزائر لحساب العامل (قراءة فقط)
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jobOfferService from "services/jobOfferService";
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/AuthNavbar.js";
import CommentSection from "components/Common/commentSection.js";
import EvaluationSection from "components/Common/evaluationsection.js";
import CVSection from "components/Common/cvsection.js";
import SocialFooter from "components/Common/socialFooter.js";

export default function Profile() {
  // ==================== DONNÉES DU PROFIL ====================
  const [workerInfo, setWorkerInfo] = useState({
    name: "Jenna Stones",
    role: "Serveuse / Barmaid",
    experience: "5 ans d'expérience",
    skills: ["Service client", "Gestion des commandes", "Polyvalence", "Travail d'équipe", "Anglais courant", "Rapidité"],
    bio: "Serveuse professionnelle avec 5 ans d'expérience dans la restauration. Spécialisée dans le service rapide et la satisfaction client. Passionnée par mon métier et toujours souriante.",
    email: "jenna.stones@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    languages: ["Français", "Anglais", "Espagnol"],
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg"
  });
  
  // ==================== COMMENTAIRES (من localStorage) ====================
  const [comments, setComments] = useState([]);
  
  // ==================== HISTORIQUE DE TRAVAIL (من localStorage) ====================
  const [workHistory, setWorkHistory] = useState([]);
  
  // ==================== SOCIAL LINKS ====================
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tiktok: ""
  });
  
  // ==================== STATES ====================
  const [showWorkerCV, setShowWorkerCV] = useState(false);
  const [showManagerCV, setShowManagerCV] = useState(false);
  const [showCommentsList, setShowCommentsList] = useState(false);
  const [offerStatus, setOfferStatus] = useState(null);
  const [workerStatus, setWorkerStatus] = useState("working");
  const [currentWorkPlace, setCurrentWorkPlace] = useState("Le Café Paris");
  const location = useLocation();
  
  // ==================== CHARGEMENT DES DONNÉES DEPUIS localStorage OU STATE ====================
  useEffect(() => {
    const stateEmployee = location.state?.employee;
    if (stateEmployee) {
      const workerData = {
        id: stateEmployee.id || stateEmployee._id || "",
        name: stateEmployee.name || "",
        role: stateEmployee.role || "",
        experience: stateEmployee.experience || stateEmployee.role || "",
        skills: stateEmployee.skills || [],
        bio: stateEmployee.bio || "",
        email: stateEmployee.email || "",
        phone: stateEmployee.phone || "",
        location: stateEmployee.location || "",
        coverImage: stateEmployee.coverImage || stateEmployee.image || "",
        profileImage: stateEmployee.profileImage || stateEmployee.image || ""
      };
      setWorkerInfo(workerData);
      localStorage.setItem("workerInfo", JSON.stringify(workerData));
    } else {
      const savedWorkerInfo = localStorage.getItem("workerInfo");
      if (savedWorkerInfo) setWorkerInfo(JSON.parse(savedWorkerInfo));
    }
    
    // تحميل التعليقات المحفوظة
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // بيانات تجريبية افتراضية
      const defaultComments = [
        { id: 1, author: "Sophie Martin", text: "Excellente prestation ! Je recommande vivement 👍", rating: 5, date: "15/03/2024", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 2, author: "Thomas Dubois", text: "Service rapide et professionnel. Très satisfait.", rating: 4, date: "10/03/2024", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 3, author: "Marie Lambert", text: "Super expérience, à refaire ! 🌟", rating: 5, date: "05/03/2024", avatar: "https://randomuser.me/api/portraits/women/3.jpg" }
      ];
      setComments(defaultComments);
    }
    
    // تحميل سجل التقييمات المحفوظ
    const savedWorkHistory = localStorage.getItem("workHistory");
    if (savedWorkHistory) {
      setWorkHistory(JSON.parse(savedWorkHistory));
    } else {
      // بيانات تجريبية افتراضية
      const defaultWorkHistory = [
        { place: "Le Café Paris", role: "Serveuse", duration: "2023 - Présent", rating: 5, review: "Excellente serveuse, très professionnelle !" },
        { place: "Restaurant La Mer", role: "Barmaid", duration: "2021 - 2023", rating: 4, review: "Bon travail, équipe sympathique." },
        { place: "Café Central", role: "Stagiaire Serveuse", duration: "2020 - 2021", rating: 4.5, review: "Apprentissage rapide, très motivée." }
      ];
      setWorkHistory(defaultWorkHistory);
    }
    
    // تحميل الروابط الاجتماعية
    const savedSocialLinks = localStorage.getItem("socialLinks");
    if (savedSocialLinks) setSocialLinks(JSON.parse(savedSocialLinks));
    
    // تحميل حالة العمل ومكان العمل
    const savedWorkPlace = localStorage.getItem("currentWorkPlace");
    if (savedWorkPlace) setCurrentWorkPlace(savedWorkPlace);
    
    const savedStatus = localStorage.getItem("workerStatus");
    if (savedStatus) setWorkerStatus(savedStatus);
  }, []);
  
  const handleMakeOffer = async () => {
    const managerId = localStorage.getItem('userId');
    if (!managerId) {
      alert('⚠️ Vous devez être connecté en tant que manager pour faire une offre.');
      return;
    }

    if (!workerInfo.id) {
      alert("⚠️ Impossible de cibler le bon employé pour l'offre.");
      return;
    }

    try {
      setOfferStatus('sending');
      await jobOfferService.createJobOffer(managerId, workerInfo.id);
      setOfferStatus('sent');
      alert('✅ Offre envoyée au travailleur !');
    } catch (error) {
      console.error('Erreur création offre:', error);
      setOfferStatus('error');
      alert(`❌ Échec de l'offre : ${error?.message || error}`);
    }
  };
  
  // دوال فارغة لأن الصفحة للقراءة فقط
  const emptyFunction = () => {};
  const emptyUpdateFunction = (data) => { console.log("Read-only mode (Profile view):", data); };
  
  // ==================== STYLES ====================
  const style = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes shoot {
      0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { transform: translateX(-300px) translateY(300px) rotate(45deg); opacity: 0; }
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
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-8px) translateX(4px); }
      75% { transform: translateY(8px) translateX(-4px); }
    }
    
    @keyframes shine {
      0% { transform: translate(-30%, -30%) rotate(0deg); }
      100% { transform: translate(30%, 30%) rotate(180deg); }
    }
    
    .profile-hero-section {
      position: relative;
      background: linear-gradient(135deg, #0a0a2a, #1a1a3a, #0d0d2b, #0f0c29, #1a1a4a);
      background-size: 400% 400%;
      animation: gradientShift 12s ease infinite;
      min-height: 100vh;
      padding-top: 80px;
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
    
    .shooting-star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
      border-radius: 50%;
      opacity: 0;
      animation: shoot 2s ease-out infinite;
    }
    
    .star {
      position: absolute;
      background: white;
      border-radius: 50%;
      opacity: 0.6;
      animation: twinkle 3s ease-in-out infinite;
    }
    
    .hero-image {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-position: center 30%;
      background-size: cover;
      filter: brightness(0.85) contrast(1.05);
      transition: transform 0.5s ease;
    }
    
    .hero-image:hover {
      transform: scale(1.01);
    }
    
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0) 50%, rgba(26,26,58,0.6) 100%);
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
    
    .cards-container {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-top: 40px;
      flex-wrap: wrap;
      position: relative;
      padding-bottom: 30px;
      z-index: 5;
    }
    
    .cards-container::after {
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
      min-width: 260px;
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
      max-width: 700px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
      animation: fadeIn 0.4s ease;
    }
    
    /* شريط التمرير الأخضر لمربع التقييمات */
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
    
    /* لدعم متصفح Firefox */
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
    
    /* ========== تحسينات النصوص لتكون واضحة وبيضاء ========== */
    .workplace-text {
      font-size: 1.3rem !important;
      font-weight: 600 !important;
      color: #ffffff !important;
      margin-top: 8px !important;
      text-shadow: 0 0 10px rgba(74, 222, 128, 0.3) !important;
    }
    
    .location-text {
      font-size: 1.1rem !important;
      font-weight: 500 !important;
      color: #e2e8f0 !important;
      margin-top: 4px !important;
    }
    
    .role-text {
      font-size: 1.2rem !important;
      font-weight: 500 !important;
      color: #f1f5f9 !important;
      margin-top: 8px !important;
    }
    
    .bio-text {
      font-size: 1.05rem !important;
      line-height: 1.6 !important;
      color: #f1f5f9 !important;
      font-style: italic !important;
      max-width: 800px !important;
      margin: 0 auto !important;
      padding: 0 20px !important;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @media (max-width: 768px) {
      .cards-container {
        flex-direction: column;
        gap: 20px;
      }
      
      .cards-container::after {
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
      
      .workplace-text {
        font-size: 1.1rem !important;
      }
      
      .bio-text {
        font-size: 0.95rem !important;
      }
    }
  `;

  return (
    <>
      <style>{style}</style>
      <Navbar />
      
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
          <section className="relative block" style={{ height: "350px", position: 'relative', overflow: 'hidden' }}>
            <div className="hero-image" style={{ 
              backgroundImage: `url(${workerInfo.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%'
            }}></div>
            <div className="hero-overlay"></div>
          </section>
          
          <section className="relative py-16 bg-transparent">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white-card w-full mb-6 shadow-xl rounded-lg -mt-48">
                <div className="px-6">
                  
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="profile-image-wrapper" style={{ position: 'relative' }}>
                        <div className="profile-glow"></div>
                        <div className="gradient-border-box">
                          <img alt={workerInfo.name} src={workerInfo.profileImage} className="content" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                      {workerInfo.name}
                      <span className="status-badge">{workerStatus === 'working' ? '✅ En poste' : '📢 En recherche'}</span>
                    </h3>
                    {workerStatus === 'working' && currentWorkPlace && (
                      <p className="workplace-text">📍 Travaille chez : {currentWorkPlace}</p>
                    )}
                    <div className="location-text">
                      <i className="fas fa-map-marker-alt mr-2"></i> {workerInfo.location}
                    </div>
                    <div className="role-text">
                      <i className="fas fa-briefcase mr-2 text-green-400"></i> {workerInfo.role}
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="btn-contact" onClick={() => alert(`📧 Email: ${workerInfo.email}\n📱 Téléphone: ${workerInfo.phone}`)}>
                      📧 Contacter
                    </button>
                    <button className="btn-comment" onClick={() => setShowCommentsList(true)}>
                      💬 Commenter
                    </button>
                  </div>
                  
                  {/* ========== 3 CARTES POUR LE VISITEUR (قراءة فقط) ========== */}
                  <div className="cards-container">
                    
                    <div className="visitor-card" onClick={() => setShowWorkerCV(true)}>
                      <div className="text-6xl mb-4">📄</div>
                      <h3 className="text-xl font-bold text-white mb-2">Mon CV</h3>
                      <p className="text-white/90 text-sm">Découvrez mon parcours professionnel</p>
                      <div className="mt-4 text-white/80 font-semibold">Cliquez pour voir →</div>
                    </div>
                    
                    <div className="visitor-card" onClick={() => setShowManagerCV(true)}>
                      <div className="text-6xl mb-4">⭐</div>
                      <h3 className="text-xl font-bold text-white mb-2">Évaluations</h3>
                      <p className="text-white/90 text-sm">Historique et retours des managers</p>
                      <div className="mt-4 text-white/80 font-semibold">Cliquez pour voir →</div>
                    </div>
                    
                    <div className="visitor-card" onClick={handleMakeOffer}>
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold text-white mb-2">Projets</h3>
                      <p className="text-white/90 text-sm">Faire une offre au travailleur</p>
                      <div className="mt-4 text-white/80 font-semibold">Cliquez pour envoyer l'offre →</div>
                    </div>
                    
                  </div>
                  
                  <div className="mt-10 py-10 border-t border-white/20 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="bio-text">"{workerInfo.bio}"</p>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                          {workerInfo.skills.map((skill, i) => (
                            <span key={i} className="skill-tag">{skill}</span>
                          ))}
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
      
      {/* Modal CV - قراءة فقط */}
      {showWorkerCV && (
        <div className="modal-overlay" onClick={() => setShowWorkerCV(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <button onClick={() => setShowWorkerCV(false)} className="close-btn">✕</button>
            <CVSection 
              workerInfo={workerInfo}
              isEditable={false}
            />
          </div>
        </div>
      )}
      
      {/* Modal Évaluations - قراءة فقط (canAddEvaluation=false) */}
      {showManagerCV && (
        <div className="modal-overlay" onClick={() => setShowManagerCV(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowManagerCV(false)} className="close-btn">✕</button>
            <EvaluationSection 
              workHistory={workHistory}
              onAddEvaluation={emptyUpdateFunction}
              canAddEvaluation={false}
              currentWorkPlace={currentWorkPlace}
              onStatusChange={emptyFunction}
              workerStatus={workerStatus}
              availablePlaces={[]}
              onWorkPlaceChange={emptyFunction}
            />
          </div>
        </div>
      )}
      
      {/* Modal Commentaires - قراءة فقط (canAddComment=false) */}
      {showCommentsList && (
        <div className="modal-overlay" onClick={() => setShowCommentsList(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
            <button onClick={() => setShowCommentsList(false)} className="close-btn">✕</button>
            <CommentSection 
              comments={comments}
              onAddComment={emptyUpdateFunction}
              canAddComment={false}
              targetName={workerInfo.name}
              isClientMode={false}
            />
          </div>
        </div>
      )}
      
      <SocialFooter socialLinks={socialLinks} />
      <Footer />
    </>
  );
}