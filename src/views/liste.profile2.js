// src/views/liste.profile.js
import React, { useState } from "react";
import FooterRecharche from "../components/Footers/footer.recharche";
import Navbar from "../components/Navbars/AuthNavbar";
import EmployeeCard from "../components/Common/employecard";
import { useHistory } from "react-router-dom";

export default function ListeProfile() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Jenna Stones",
      role: "Serveuse / Barmaid",
      location: "Paris, France",
      bio: "Serveuse professionnelle avec 5 ans d'expérience dans la restauration.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      email: "jenna.stones@example.com",
      phone: "+33 6 12 34 56 78",
      experience: "5 ans",
      rating: 4.8
    },
    {
      id: 2,
      name: "Youssef",
      role: "Serveur",
      location: "Alger, Algérie",
      bio: "Serveur professionnel avec 3 ans d'expérience, dynamique et souriant.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "youssef@example.com",
      phone: "+213 5 55 55 55 55",
      experience: "3 ans",
      rating: 4.5
    },
    {
      id: 3,
      name: "Mohamed",
      role: "Chef Cuisinier",
      location: "Alger, Algérie",
      bio: "Chef cuisinier passionné avec 8 ans d'expérience dans la cuisine internationale.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      email: "mohamed@example.com",
      phone: "+213 5 55 55 55 56",
      experience: "8 ans",
      rating: 4.9
    },
    {
      id: 4,
      name: "Sophie",
      role: "Serveuse",
      location: "Paris, France",
      bio: "Serveuse expérimentée, parle couramment anglais et espagnol.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      email: "sophie@example.com",
      phone: "+33 6 12 34 56 79",
      experience: "4 ans",
      rating: 4.6
    },
    {
      id: 5,
      name: "Karim",
      role: "Barman",
      location: "Alger, Algérie",
      bio: "Barman créatif, spécialisé dans les cocktails originaux.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      email: "karim@example.com",
      phone: "+213 5 55 55 55 57",
      experience: "2 ans",
      rating: 4.4
    }
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openEmployeeModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const goToEmployeeProfile = () => {
    if (selectedEmployee) {
      setShowModal(false);
      history.push(`/employee/${selectedEmployee.id}`);
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
    
    .employees-container {
      background: linear-gradient(135deg, #0a0a2a, #1a1a3a, #0d0d2b);
      min-height: 100vh;
      padding-top: 80px;
      padding-bottom: 80px;
    }
    
    .employees-grid {
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
      max-width: 500px;
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
    
    .modal-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto 15px;
      display: block;
      border: 3px solid #22c55e;
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
      .employees-grid {
        grid-template-columns: 1fr;
        padding: 15px;
      }
    }
  `;

  return (
    <>
      <style>{style}</style>
      <Navbar />
      
      <div className="employees-container">
        <div className="employees-grid">
          {filteredEmployees.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <p>Aucun employé trouvé</p>
              <p style={{ fontSize: '0.8rem' }}>Essayez une autre recherche</p>
            </div>
          ) : (
            filteredEmployees.map(employee => (
              <EmployeeCard 
                key={employee.id}
                employee={employee}
                showActions={true}
                onClick={openEmployeeModal}
              />
            ))
          )}
        </div>
      </div>
      
      <FooterRecharche 
        type="employees"
        onSearch={handleSearch}
        placeholder="🔍 Rechercher un employé par nom, métier ou ville..."
      />
      
      {showModal && selectedEmployee && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            <img src={selectedEmployee.image} alt={selectedEmployee.name} className="modal-avatar" />
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: 'white', marginBottom: '5px' }}>{selectedEmployee.name}</h2>
              <p style={{ color: '#22c55e', marginBottom: '10px' }}>{selectedEmployee.role}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '5px' }}>
                <i className="fas fa-map-marker-alt"></i> {selectedEmployee.location}
              </p>
              {/* ========== تم حذف سطر المطعم ========== */}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: '15px 0', textAlign: 'center' }}>{selectedEmployee.bio}</p>
            
            {/* ========== تم حذف التقييم (النجوم والخبرة) ========== */}
            <div style={{ marginBottom: '15px', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <i className="fas fa-phone"></i> {selectedEmployee.phone}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                <i className="fas fa-envelope"></i> {selectedEmployee.email}
              </p>
            </div>
            
            <button className="btn-visit" onClick={goToEmployeeProfile}>
              👤 Voir le profil complet →
            </button>
          </div>
        </div>
      )}
      
      
    </>
  );
}