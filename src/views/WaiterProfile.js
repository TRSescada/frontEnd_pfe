import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/AuthNavbar.js";
import CVSection from "components/Common/cvsection";
import CommentSection from "components/Common/commentSection";
import SocialFooter from "components/Common/socialFooter";
import jobOfferService from "services/jobOfferService";

export default function Profile() {
  const location = useLocation();
  const { id } = useParams();
  const fromMenu = location.state?.fromMenu || false;
  const waiterInfoFromMenu = location.state?.waiterInfo || null;
  
  const [workerInfo, setWorkerInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [workHistory, setWorkHistory] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [socialLinks, setSocialLinks] = useState({ facebook: "", instagram: "", twitter: "", linkedin: "", tiktok: "" });
  const [showWorkerCV, setShowWorkerCV] = useState(false);
  const [showCommentsList, setShowCommentsList] = useState(false);
  const [showEvaluations, setShowEvaluations] = useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [workerStatus, setWorkerStatus] = useState("working");
  const [currentWorkPlace, setCurrentWorkPlace] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        setLoading(true);
        const response = await jobOfferService.getWorkerByUser(id);
        const worker = response.worker;
        if (!worker) return;

        const user = worker.user || {};
        setWorkerInfo({
          _id: worker._id,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Employé',
          role: worker.role || user.role || 'Serveur',
          experience: worker.experience || '',
          skills: worker.skills || [],
          bio: user.bio || worker.bio || '',
          email: user.email || '',
          phone: user.phone || '',
          location: user.location || '',
          languages: worker.languages || [],
          coverImage: user.coverImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
          profileImage: user.profileImage || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'E')}&background=22c55e&color=ffffff`
        });

        setWorkerStatus(worker.status === 'WORKING' ? 'working' : 'seeking');
        setWorkHistory(worker.workHistory || []);
        setComments(worker.comments || []);
        setEvaluations(worker.evaluations || []);

        if (worker.restaurant?.name) {
          setCurrentWorkPlace(worker.restaurant.name);
        }
      } catch (err) {
        console.error("Error fetching worker:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWorkerData();
  }, [id]);

  const handleAddComment = (newComment) => {
    const comment = {
      id: Date.now(),
      author: newComment.userName || "Client",
      text: newComment.comment,
      rating: newComment.rating,
      date: new Date().toISOString().split('T')[0],
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
    };
    setComments([comment, ...comments]);
    setShowAddCommentModal(false);
    alert("Commentaire ajoute avec succes !");
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
      max-width: 550px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
      animation: fadeIn 0.4s ease;
    }
    
    /* ========== SCROLLBAR VERT POUR TOUS LES MODALS ========== */
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
    
    /* Scrollbar pour le modal des évaluations (max-width: 700px) */
    .modal-content-evaluations {
      max-width: 700px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 30px;
    }
    
    .modal-content-evaluations::-webkit-scrollbar {
      width: 6px;
    }
    
    .modal-content-evaluations::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    .modal-content-evaluations::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 10px;
    }
    
    .modal-content-evaluations::-webkit-scrollbar-thumb:hover {
      background: #15803d;
    }
    
    .modal-content-evaluations {
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
    
    .work-history-item {
      background: rgba(255,255,255,0.08);
      border-radius: 15px;
      padding: 15px;
      margin-bottom: 15px;
      transition: all 0.3s;
      border-left: 4px solid #22c55e;
    }
    
    .work-history-item:hover {
      background: rgba(255,255,255,0.12);
      transform: translateX(5px);
    }
    
    .stars {
      display: flex;
      gap: 5px;
      justify-content: center;
      margin: 10px 0;
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
    }
  `;

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a2a" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>⏳</div>
            <p style={{ color: "#22c55e", fontSize: "1.2rem" }}>Chargement du profil...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!workerInfo) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a2a" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>❌</div>
            <p style={{ color: "#ef4444", fontSize: "1.2rem" }}>Worker non trouvé</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
                  </div>
                  
                  <div className="action-buttons">
                    <button className="btn-contact" onClick={() => alert(`📧 Email: ${workerInfo.email}\n📱 Téléphone: ${workerInfo.phone}`)}>
                      📧 Contacter
                    </button>
                    <button className="btn-comment" onClick={() => setShowCommentsList(true)}>
                      💬 Voir commentaires
                    </button>
                    {fromMenu && (
                      <button className="btn-comment" onClick={() => setShowAddCommentModal(true)} style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                        ✍️ Ajouter un avis
                      </button>
                    )}
                  </div>
                  
                  {/* ========== 3 CARTES POUR LE VISITEUR (قراءة فقط) ========== */}
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
                      </div>
                    </div>
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
      
      {/* Modal Évaluations */}
      {showEvaluations && (
        <div className="modal-overlay" onClick={() => setShowEvaluations(false)}>
          <div className="modal-content-evaluations" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', width: '90%', background: 'linear-gradient(135deg, #1a1a3a, #0d0d2b)', borderRadius: '30px', border: '2px solid #22c55e' }}>
            <button onClick={() => setShowEvaluations(false)} className="close-btn">✕</button>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Evaluations</h3>
              {evaluations.length === 0 ? (
                <p className="text-white text-center">Aucune evaluation pour le moment.</p>
              ) : (
                evaluations.map((ev, index) => (
                  <div key={ev._id || index} className="work-history-item">
                    <div className="flex justify-between items-center flex-wrap">
                      <h4 className="text-white font-bold">{ev.restaurant?.name || 'Restaurant'}</h4>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < (ev.rating || 0) ? '#ffc107' : '#4a4a4a', fontSize: '16px' }}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-white text-sm mt-2">"{ev.comment}"</p>
                    <p className="text-white text-xs mt-1" style={{ opacity: 0.6 }}>
                      {ev.startDate ? new Date(ev.startDate).toLocaleDateString('fr-FR') : ''}
                      {ev.endDate ? ` - ${new Date(ev.endDate).toLocaleDateString('fr-FR')}` : ' - Present'}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Commentaires (Affichage) */}
      {showCommentsList && (
        <div className="modal-overlay" onClick={() => setShowCommentsList(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowCommentsList(false)} className="close-btn">✕</button>
            <div>
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-2xl font-bold text-white mb-2">Commentaires</h2>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white mb-3 text-left">
                  Commentaires recents ({comments.length})
                </h3>
                {comments.length === 0 ? (
                  <p className="text-white text-center">Aucun commentaire pour le moment.</p>
                ) : (
                  comments.map((comment, index) => (
                    <div key={comment._id || index} className="work-history-item" style={{ borderLeftColor: '#a855f7' }}>
                      <div className="flex justify-between items-start flex-wrap mb-2">
                        <div>
                          <h4 className="text-white font-bold">{comment.clientName || 'Client'}</h4>
                          <p className="text-white text-xs">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString('fr-FR') : ''}</p>
                        </div>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ color: i < (comment.rating || 0) ? '#ffc107' : '#4a4a4a', fontSize: '16px' }}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-white text-sm mt-2">{comment.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Ajouter un commentaire (CommentSection) */}
      {showAddCommentModal && (
        <div className="modal-overlay" onClick={() => setShowAddCommentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button onClick={() => setShowAddCommentModal(false)} className="close-btn">✕</button>
            <CommentSection 
              comments={comments}
              onAddComment={handleAddComment}
              isEditable={true}
            />
          </div>
        </div>
      )}
      
      <SocialFooter socialLinks={socialLinks} />
      <Footer />
    </>
  );
}