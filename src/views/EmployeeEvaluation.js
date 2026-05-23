// src/views/EmployeeEvaluation.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/IndexNavbar";
import CVSection from "components/Common/cvsection";
import EvaluationSection from "components/Common/evaluationsection";
import SocialFooter from "components/Common/socialFooter";

export default function EmployeeEvaluation() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const employeeFromList = location.state?.employee || null;
  
  // ==================== DONNÉES DU PROFIL (مثل Profile.js) ====================
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
  
  // ==================== HISTORIQUE DE TRAVAIL (ÉVALUATIONS) ====================
  const [workHistory, setWorkHistory] = useState([
    { id: 1, place: "Le Café Paris", role: "Serveuse", duration: "2023 - Présent", rating: 5, review: "Excellente serveuse, très professionnelle !", manager: "Ahmed Benali" },
    { id: 2, place: "Restaurant La Mer", role: "Barmaid", duration: "2021 - 2023", rating: 4, review: "Bon travail, équipe sympathique.", manager: "Sophie Martin" },
    { id: 3, place: "Café Central", role: "Stagiaire Serveuse", duration: "2020 - 2021", rating: 4.5, review: "Apprentissage rapide, très motivée.", manager: "Karim El Fassi" }
  ]);
  
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
  const [showEvaluations, setShowEvaluations] = useState(false);
  const [workerStatus, setWorkerStatus] = useState("working");
  const [currentWorkPlace, setCurrentWorkPlace] = useState("Le Café Paris");
  
  // قائمة أماكن العمل المتاحة (للمدير)
  const availablePlaces = [
    { id: 1, name: "Restaurant Andalous", icon: "🏪" },
    { id: 2, name: "Café Parisien", icon: "☕" },
    { id: 3, name: "La Piazza Italia", icon: "🍕" },
    { id: 4, name: "Sushi Master", icon: "🍣" },
    { id: 5, name: "Le Gourmet", icon: "🍽️" }
  ];
  
  // بيانات الموظفين (إذا جاء من رابط بدون بيانات)
  const employeesData = {
    1: {
      name: "Youssef",
      role: "Employé",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      location: "Casablanca, Maroc",
      email: "youssef@example.com",
      phone: "+212 6 12 34 56 78",
      skills: ["Service client", "Rapidité", "Polyvalence"],
      bio: "Employé dévoué avec 3 ans d'expérience.",
      languages: ["Français", "Arabe"]
    },
    2: {
      name: "Mohamed",
      role: "Employé",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      location: "Rabat, Maroc",
      email: "mohamed@example.com",
      phone: "+212 6 98 76 54 32",
      skills: ["Gestion des stocks", "Organisation", "Travail d'équipe"],
      bio: "Employé sérieux et organisé.",
      languages: ["Français", "Arabe"]
    }
  };
  
  // بيانات التقييمات لكل موظف
  const employeesWorkHistory = {
    1: [
      { id: 1, place: "Restaurant Andalous", role: "Employé", duration: "15/01/2024", rating: 5, review: "Excellent employé !", manager: "Ahmed Benali" }
    ],
    2: [
      { id: 1, place: "Café Parisien", role: "Employé", duration: "01/02/2024", rating: 4, review: "Travail correct.", manager: "Sophie Martin" }
    ]
  };
  
  useEffect(() => {
    // إذا جاءت بيانات الموظف من المدير
    if (employeeFromList && employeeFromList.id) {
      setWorkerInfo({
        ...workerInfo,
        name: employeeFromList.name,
        role: employeeFromList.role || "Employé",
        profileImage: employeeFromList.profileImage,
        coverImage: employeeFromList.coverImage,
        location: employeeFromList.location,
        email: employeeFromList.email,
        phone: employeeFromList.phone,
        skills: employeeFromList.skills,
        bio: employeeFromList.bio
      });
      setWorkHistory(employeesWorkHistory[employeeFromList.id] || []);
      setWorkerStatus(employeeFromList.status || "working");
      setCurrentWorkPlace(employeeFromList.currentPlace?.name || "Non défini");
    }
    // إذا جاء من رابط مع id
    else if (id && employeesData[id]) {
      const emp = employeesData[id];
      setWorkerInfo({
        ...workerInfo,
        name: emp.name,
        role: emp.role,
        profileImage: emp.profileImage,
        coverImage: emp.coverImage,
        location: emp.location,
        email: emp.email,
        phone: emp.phone,
        skills: emp.skills,
        bio: emp.bio
      });
      setWorkHistory(employeesWorkHistory[id] || []);
    }
  }, [id, employeeFromList]);
  
  const handleAddEvaluation = (updatedHistory) => {
    setWorkHistory(updatedHistory);
    alert("✅ Évaluation ajoutée avec succès !");
  };
  
  const handleStatusChange = (newStatus) => {
    setWorkerStatus(newStatus);
  };
  
  const handleWorkPlaceChange = (place) => {
    setCurrentWorkPlace(place.name);
  };
  
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
      max-width: 550px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
      animation: fadeIn 0.4s ease;
    }
    
    /* ========== SCROLLBAR VERT ========== */
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
    
    /* Scrollbar pour le modal des évaluations */
    .evaluations-modal-content {
      max-width: 700px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 30px;
    }
    
    .evaluations-modal-content::-webkit-scrollbar {
      width: 6px;
    }
    
    .evaluations-modal-content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    .evaluations-modal-content::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 10px;
    }
    
    .evaluations-modal-content::-webkit-scrollbar-thumb:hover {
      background: #15803d;
    }
    
    .evaluations-modal-content {
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
    
    /* Scrollbar pour la section évaluation intégrée */
    .evaluation-section-container {
      max-height: 500px;
      overflow-y: auto;
      margin-top: 20px;
    }
    
    .evaluation-section-container::-webkit-scrollbar {
      width: 6px;
    }
    
    .evaluation-section-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    .evaluation-section-container::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 10px;
    }
    
    .evaluation-section-container::-webkit-scrollbar-thumb:hover {
      background: #15803d;
    }
    
    .evaluation-section-container {
      scrollbar-color: #22c55e rgba(255, 255, 255, 0.1);
      scrollbar-width: thin;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
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
                      <p className="text-md text-white font-semibold mt-2">📍 Travaille chez : {currentWorkPlace}</p>
                    )}
                    <div className="text-sm leading-normal mt-2 mb-2 text-white font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2"></i> {workerInfo.location}
                    </div>
                    <div className="mb-2 text-white mt-10">
                      <i className="fas fa-briefcase mr-2 text-green-400"></i> {workerInfo.role}
                    </div>
                    <div className="mb-2 text-white">
                      <i className="fas fa-calendar-alt mr-2 text-green-400"></i> {workerInfo.experience}
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="btn-contact" onClick={() => alert(`📧 Email: ${workerInfo.email}\n📱 Téléphone: ${workerInfo.phone}`)}>
                      📧 Contacter
                    </button>
                  </div>
                  
                  {/* ========== 3 CARTES (مثل Profile.js) ========== */}
                  <div className="cards-container">
                    
                    <div className="visitor-card" onClick={() => setShowWorkerCV(true)}>
                      <div className="text-6xl mb-4">📄</div>
                      <h3 className="text-xl font-bold text-white mb-2">Mon CV</h3>
                      <p className="text-white text-sm">Découvrez mon parcours professionnel</p>
                      <div className="mt-4 text-white font-semibold">Cliquez pour voir →</div>
                    </div>
                    
                    <div className="visitor-card" onClick={() => setShowEvaluations(true)}>
                      <div className="text-6xl mb-4">⭐</div>
                      <h3 className="text-xl font-bold text-white mb-2">Évaluations</h3>
                      <p className="text-white text-sm">Historique et retours des managers</p>
                      <div className="mt-4 text-white font-semibold">Cliquez pour voir →</div>
                    </div>
                    
                    <div className="visitor-card" onClick={() => alert("🌟 Projets à venir !")}>
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-xl font-bold text-white mb-2">Projets</h3>
                      <p className="text-white text-sm">Mes réalisations récentes</p>
                      <div className="mt-4 text-white font-semibold">Cliquez pour voir →</div>
                    </div>
                    
                  </div>
                  
                  <div className="mt-10 py-10 border-t border-white/20 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-white italic">"{workerInfo.bio}"</p>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                          {workerInfo.skills.map((skill, i) => (
                            <span key={i} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                          {workerInfo.languages?.map((lang, i) => (
                            <span key={i} className="skill-tag">🌐 {lang}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* ========== SECTION ÉVALUATION (للمدير فقط - يمكنه إضافة تقييمات) ========== */}
                  <div className="evaluation-section-container">
                    <EvaluationSection 
                      workHistory={workHistory}
                      onAddEvaluation={handleAddEvaluation}
                      canAddEvaluation={true}
                      currentWorkPlace={currentWorkPlace}
                      onStatusChange={handleStatusChange}
                      workerStatus={workerStatus}
                      availablePlaces={availablePlaces}
                      onWorkPlaceChange={handleWorkPlaceChange}
                      isManagerMode={true}
                    />
                  </div>
                  
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      {/* Modal CV */}
      {showWorkerCV && (
        <div className="modal-overlay" onClick={() => setShowWorkerCV(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowWorkerCV(false)} className="close-btn">✕</button>
            <CVSection 
              workerInfo={workerInfo}
              isEditable={false}
            />
          </div>
        </div>
      )}
      
      {/* Modal Évaluations (affichage uniquement) */}
      {showEvaluations && (
        <div className="modal-overlay" onClick={() => setShowEvaluations(false)}>
          <div className="evaluations-modal-content modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', width: '90%' }}>
            <button onClick={() => setShowEvaluations(false)} className="close-btn">✕</button>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">📋 Historique des évaluations</h3>
              {workHistory.map((work, index) => (
                <div key={index} className="work-history-item" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '15px', padding: '15px', marginBottom: '15px', borderLeft: '4px solid #22c55e' }}>
                  <div className="flex justify-between items-center flex-wrap">
                    <h4 className="text-white font-bold">{work.place}</h4>
                    <div className="stars" style={{ display: 'flex', gap: '5px' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: i < work.rating ? '#ffc107' : '#4a4a4a', fontSize: '16px' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-white text-sm">{work.role} • {work.duration}</p>
                  <p className="text-white text-sm mt-2">"{work.review}"</p>
                  {work.manager && <p className="text-white text-xs mt-1">Manager: {work.manager}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <SocialFooter socialLinks={socialLinks} />
      <Footer />
    </>
  );
}