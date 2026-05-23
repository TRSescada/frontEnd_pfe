// src/views/VisitorProfile.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Footer from "components/Footers/Footer.js";
import RestaurantCard from "components/Common/restaurantCard";
import ProductCard from "components/Common/productCard";

export default function VisitorProfile() {
  const history = useHistory();
  
  // ==================== بيانات البروفيل (قراءة فقط) ====================
  const [managerInfo, setManagerInfo] = useState({
    name: "Ahmed Benali",
    role: "Directeur du Restaurant",
    experience: "12 ans d'expérience",
    skills: ["Management", "Gestion d'équipe", "Planification", "Service client", "Gestion des stocks", "Marketing"],
    bio: "Passionné par la restauration depuis plus de 12 ans, je dirige ce magnifique établissement avec une équipe dévouée pour offrir la meilleure expérience culinaire à nos clients.",
    email: "ahmed.benali@andalus-restaurant.dz",
    phone: "+213 5 55 55 55 55",
    location: "Alger, Algérie",
    languages: ["Français", "Arabe", "Anglais"],
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  });
  
  // ==================== DONNÉES DU RESTAURANT ====================
  const [restaurantData, setRestaurantData] = useState({
    id: 1,
    name: "Restaurant Andalous",
    location: "Alger, Algérie",
    description: "Les meilleurs plats arabes et internationaux dans une ambiance familiale",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    logo: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    phone: "+213 5 55 55 55 55",
    email: "info@andalus-restaurant.dz",
    rating: 4.8,
    employees: 12
  });
  
  // ==================== DONNÉES DES TABLES ====================
  const [tables, setTables] = useState([
    { id: 1, number: 1, groupId: 1, status: "free" },
    { id: 2, number: 2, groupId: 1, status: "free" },
    { id: 3, number: 3, groupId: 1, status: "occupied" },
    { id: 4, number: 4, groupId: 1, status: "free" },
    { id: 5, number: 5, groupId: 1, status: "free" },
    { id: 6, number: 6, groupId: 1, status: "occupied" },
    { id: 7, number: 7, groupId: 2, status: "free" },
    { id: 8, number: 8, groupId: 2, status: "free" },
    { id: 9, number: 9, groupId: 2, status: "free" },
    { id: 10, number: 10, groupId: 2, status: "occupied" }
  ]);
  
  // ==================== DONNÉES DES GROUPES ====================
  const [groups, setGroups] = useState([
    { id: 1, name: "Groupe 1", tableIds: [1,2,3,4,5,6], tableRange: { start: 1, end: 6 } },
    { id: 2, name: "Groupe 2", tableIds: [7,8,9,10], tableRange: { start: 7, end: 10 } }
  ]);
  
  // ==================== DONNÉES DES EMPLOYÉS ====================
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: "Youssef", 
      role: "Employé", 
      groupId: 1, 
      status: "working",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      location: "Casablanca, Maroc",
      email: "youssef@example.com",
      phone: "+212 6 12 34 56 78",
      skills: ["Service client", "Rapidité", "Polyvalence"],
      currentPlace: { id: 1, name: "Restaurant Andalous", icon: "🏪" }
    },
    { 
      id: 2, 
      name: "Mohamed", 
      role: "Employé", 
      groupId: null, 
      status: "working",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      location: "Rabat, Maroc",
      email: "mohamed@example.com",
      phone: "+212 6 98 76 54 32",
      skills: ["Gestion des stocks", "Organisation", "Travail d'équipe"],
      currentPlace: { id: 2, name: "Café Parisien", icon: "☕" }
    },
    { 
      id: 3, 
      name: "Fatima", 
      role: "Serveuse", 
      groupId: 1, 
      status: "working",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      location: "Tanger, Maroc",
      email: "fatima@example.com",
      phone: "+212 6 55 55 55 55",
      skills: ["Service client", "Polyvalence", "Rapidité"],
      currentPlace: { id: 3, name: "La Piazza Italia", icon: "🍕" }
    }
  ]);
  
  // ==================== DONNÉES DU MENU ====================
  const [menuCategories, setMenuCategories] = useState([
    { 
      id: 1, 
      name: "Chicha", 
      icon: "💨", 
      color: "#ff6b6b", 
      iconImage: "https://cdn-icons-png.flaticon.com/512/1998/1998626.png",
      products: [
        { id: 101, name: "Chicha Pomme", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha à la pomme fraîche - goût fruité et rafraîchissant" },
        { id: 102, name: "Chicha Raisin", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha au raisin sucré - arôme naturel de raisin" },
        { id: 103, name: "Chicha Menthe", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha à la menthe rafraîchissante - sensation de fraîcheur" }
      ] 
    },
    { 
      id: 2, 
      name: "Plats", 
      icon: "🍔", 
      color: "#4ecdc4", 
      iconImage: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      products: [
        { id: 201, name: "Burger", price: 12, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", description: "Burger artisanal avec frites maison, salade et sauce spéciale" },
        { id: 202, name: "Pizza", price: 18, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300", description: "Pizza margherita avec mozzarella fondante et basilic frais" }
      ] 
    },
    { 
      id: 3, 
      name: "Boissons", 
      icon: "🥤", 
      color: "#45b7d1", 
      iconImage: "https://cdn-icons-png.flaticon.com/512/1046/1046855.png",
      products: [
        { id: 301, name: "Coca Cola", price: 3, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300", description: "Coca Cola 33cl - fraîchement servi avec glaçons" },
        { id: 302, name: "Jus d'Orange", price: 5, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300", description: "Jus d'orange frais pressé - 100% pur fruit" }
      ] 
    },
    { 
      id: 4, 
      name: "Desserts", 
      icon: "🍰", 
      color: "#f9ca24", 
      iconImage: "https://cdn-icons-png.flaticon.com/512/1046/1046790.png",
      products: [
        { id: 401, name: "Gâteau", price: 7, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", description: "Gâteau au chocolat fondant avec crème anglaise" },
        { id: 402, name: "Glace", price: 5, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300", description: "Glace vanille avec coulis de chocolat et chantilly" }
      ] 
    }
  ]);
  
  // ==================== DONNÉES DES FACTURES ====================
  const [invoices, setInvoices] = useState([]);
  const [groupInvoices, setGroupInvoices] = useState([]);
  const [restaurantInvoice, setRestaurantInvoice] = useState(null);
  const [filterType, setFilterType] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedSeason, setSelectedSeason] = useState("spring");
  const [invoiceViewType, setInvoiceViewType] = useState("tables");
  const [showInvoices, setShowInvoices] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  const selectedCategory = menuCategories.find(cat => cat.id === selectedCategoryId);
  const currentProducts = selectedCategory?.products || [];
  const currentProduct = currentProducts[currentProductIndex];
  
  // ==================== GÉNÉRATION DES FACTURES ====================
  useEffect(() => {
    generateInvoice();
  }, []);
  
  const generateInvoice = () => {
    const mockInvoices = [];
    const mockGroupInvoices = [];
    
    if (filterType === "daily") {
      for (let i = 1; i <= 20; i++) {
        const groupId = i <= 6 ? 1 : 2;
        mockInvoices.push({
          id: i,
          tableNumber: i,
          groupId: groupId,
          groupName: groups.find(g => g.id === groupId)?.name || `Groupe ${groupId}`,
          total: Math.floor(Math.random() * 500 + 100),
          items: Math.floor(Math.random() * 5 + 1),
          date: selectedDate,
          time: `${Math.floor(Math.random() * 12 + 10)}:${Math.floor(Math.random() * 60)}`
        });
      }
      
      const groupTotals = {};
      mockInvoices.forEach(inv => {
        if (!groupTotals[inv.groupId]) {
          groupTotals[inv.groupId] = {
            groupId: inv.groupId,
            groupName: inv.groupName,
            total: 0,
            tableCount: 0,
            orderCount: 0
          };
        }
        groupTotals[inv.groupId].total += inv.total;
        groupTotals[inv.groupId].tableCount++;
        groupTotals[inv.groupId].orderCount += inv.items;
      });
      mockGroupInvoices.push(...Object.values(groupTotals));
      
      const restaurantTotal = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
      setRestaurantInvoice({
        total: restaurantTotal,
        tableCount: mockInvoices.length,
        orderCount: mockInvoices.reduce((sum, inv) => sum + inv.items, 0),
        date: selectedDate
      });
      
    } else if (filterType === "monthly") {
      for (let i = 1; i <= 20; i++) {
        const groupId = i <= 6 ? 1 : 2;
        for (let day = 1; day <= 30; day++) {
          if (Math.random() > 0.7) {
            mockInvoices.push({
              id: `${i}_${day}`,
              tableNumber: i,
              groupId: groupId,
              groupName: groups.find(g => g.id === groupId)?.name || `Groupe ${groupId}`,
              total: Math.floor(Math.random() * 500 + 100),
              items: Math.floor(Math.random() * 5 + 1),
              date: `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            });
          }
        }
      }
      
      const groupTotals = {};
      mockInvoices.forEach(inv => {
        if (!groupTotals[inv.groupId]) {
          groupTotals[inv.groupId] = {
            groupId: inv.groupId,
            groupName: inv.groupName,
            total: 0,
            tableCount: 0,
            orderCount: 0
          };
        }
        groupTotals[inv.groupId].total += inv.total;
        groupTotals[inv.groupId].tableCount++;
        groupTotals[inv.groupId].orderCount += inv.items;
      });
      mockGroupInvoices.push(...Object.values(groupTotals));
      
      const restaurantTotal = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
      setRestaurantInvoice({
        total: restaurantTotal,
        tableCount: mockInvoices.length,
        orderCount: mockInvoices.reduce((sum, inv) => sum + inv.items, 0),
        month: selectedMonth + 1,
        year: selectedYear
      });
      
    } else {
      const months = selectedSeason === "spring" ? [2, 3, 4] : selectedSeason === "summer" ? [5, 6, 7] : selectedSeason === "autumn" ? [8, 9, 10] : [11, 0, 1];
      for (let i = 1; i <= 20; i++) {
        const groupId = i <= 6 ? 1 : 2;
        for (let day = 1; day <= 90; day++) {
          if (Math.random() > 0.85) {
            mockInvoices.push({
              id: `${i}_${day}`,
              tableNumber: i,
              groupId: groupId,
              groupName: groups.find(g => g.id === groupId)?.name || `Groupe ${groupId}`,
              total: Math.floor(Math.random() * 500 + 100),
              items: Math.floor(Math.random() * 5 + 1),
              date: `${selectedYear}-${String(months[Math.floor(Math.random() * months.length)] + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
            });
          }
        }
      }
      
      const groupTotals = {};
      mockInvoices.forEach(inv => {
        if (!groupTotals[inv.groupId]) {
          groupTotals[inv.groupId] = {
            groupId: inv.groupId,
            groupName: inv.groupName,
            total: 0,
            tableCount: 0,
            orderCount: 0
          };
        }
        groupTotals[inv.groupId].total += inv.total;
        groupTotals[inv.groupId].tableCount++;
        groupTotals[inv.groupId].orderCount += inv.items;
      });
      mockGroupInvoices.push(...Object.values(groupTotals));
      
      const restaurantTotal = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
      setRestaurantInvoice({
        total: restaurantTotal,
        tableCount: mockInvoices.length,
        orderCount: mockInvoices.reduce((sum, inv) => sum + inv.items, 0),
        season: selectedSeason === "spring" ? "Printemps" : selectedSeason === "summer" ? "Été" : selectedSeason === "autumn" ? "Automne" : "Hiver",
        year: selectedYear
      });
    }
    
    setInvoices(mockInvoices);
    setGroupInvoices(mockGroupInvoices);
  };
  
  const getTotalRevenue = () => {
    return invoices.reduce((sum, inv) => sum + inv.total, 0);
  };
  
  const nextProduct = () => {
    if (currentProductIndex < currentProducts.length - 1) {
      setCurrentProductIndex(currentProductIndex + 1);
    } else {
      setCurrentProductIndex(0);
    }
  };
  
  const prevProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(currentProductIndex - 1);
    } else {
      setCurrentProductIndex(currentProducts.length - 1);
    }
  };
  
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
      margin-top: 0;
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
    
    /* قسم صورة الغلاف - ممتدة لأعلى الصفحة لتغطية مكان النافبار */
    .cover-section {
      position: relative;
      width: 100%;
      height: 420px;
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
      background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(26,26,58,0.3) 100%);
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
    
    .profile-location {
      color: white !important;
      font-size: 0.85rem;
      margin-top: 5px;
    }
    
    .profile-role {
      color: white !important;
      font-size: 0.95rem;
      margin-top: 8px;
    }
    
    .profile-experience {
      color: white !important;
      font-size: 0.95rem;
      margin-top: 5px;
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
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      max-width: 1400px;
      margin: 40px auto 0;
      padding: 0 20px 30px;
      position: relative;
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
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      border-radius: 30px;
      padding: 25px;
      transition: all 0.3s ease;
      border: 1px solid rgba(34, 197, 94, 0.3);
      animation: fadeIn 0.5s ease-out;
    }
    
    .visitor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      border-color: rgba(34, 197, 94, 0.6);
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 2px solid #22c55e;
      padding-bottom: 10px;
    }
    
    .table-list, .group-list, .employee-list {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    .table-list::-webkit-scrollbar, 
    .group-list::-webkit-scrollbar, 
    .employee-list::-webkit-scrollbar {
      width: 6px;
    }
    
    .table-list::-webkit-scrollbar-track, 
    .group-list::-webkit-scrollbar-track, 
    .employee-list::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
    }
    
    .table-list::-webkit-scrollbar-thumb, 
    .group-list::-webkit-scrollbar-thumb, 
    .employee-list::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 10px;
    }
    
    .table-item, .group-item, .employee-item {
      background: rgba(255,255,255,0.08);
      padding: 10px;
      margin-bottom: 8px;
      border-radius: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    
    .group-info {
      color: #22c55e;
      font-size: 0.7rem;
      margin-left: 10px;
    }
    
    .employee-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #22c55e;
    }
    
    .category-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .category-tab {
      flex: 1;
      padding: 10px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 15px;
      color: white;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.85rem;
      font-weight: bold;
      text-align: center;
    }
    
    .category-tab:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }
    
    .category-tab.active {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border-color: #22c55e;
      box-shadow: 0 5px 15px rgba(34,197,94,0.3);
    }
    
    .carousel-container {
      position: relative;
      min-height: 450px;
    }
    
    .carousel-card {
      position: relative;
    }
    
    .carousel-navigation {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
    
    .nav-arrow {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 1.2rem;
      color: white;
    }
    
    .nav-arrow:hover {
      background: #22c55e;
      transform: scale(1.1);
    }
    
    .product-counter {
      text-align: center;
      color: rgba(255,255,255,0.6);
      font-size: 0.8rem;
      margin-top: 10px;
    }
    
    .invoice-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .invoice-tab {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(34,197,94,0.3);
      padding: 8px 16px;
      border-radius: 20px;
      color: white;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .invoice-tab.active {
      background: #22c55e;
      border-color: #22c55e;
    }
    
    .invoice-stats {
      background: linear-gradient(135deg, #22c55e, #15803d);
      padding: 20px;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 20px;
    }
    
    .invoice-stats h3 {
      color: white;
      font-size: 2rem;
      margin: 0;
    }
    
    .invoice-stats p {
      color: white;
    }
    
    .invoice-item {
      background: rgba(255,255,255,0.08);
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 15px;
      display: flex;
      justify-content: space-between;
      color: white;
    }
    
    .group-invoice-item {
      background: rgba(59,130,246,0.2);
      border-left: 3px solid #3b82f6;
    }
    
    .restaurant-invoice {
      background: linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05));
      border: 2px solid #22c55e;
    }
    
    .filter-select {
      width: 100%;
      padding: 10px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 15px;
      color: white;
      font-size: 0.9rem;
      margin-bottom: 15px;
      cursor: pointer;
    }
    
    .filter-select option {
      background: #1a1a3a;
      color: white;
    }
    
    .date-input {
      width: 100%;
      padding: 10px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(34,197,94,0.3);
      border-radius: 15px;
      color: white;
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
    
    /* نصوص بيضاء */
    .text-white {
      color: white !important;
    }
    
    .visitor-card p, .visitor-card span, .visitor-card div {
      color: white;
    }
    
    @media (max-width: 768px) {
      .visitor-cards-container {
        grid-template-columns: 1fr;
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
      
      .card-title {
        font-size: 1.2rem;
      }
      
      .category-tabs {
        gap: 5px;
      }
      
      .category-tab {
        font-size: 0.7rem;
        padding: 8px 5px;
      }
      
      .nav-arrow {
        width: 35px;
        height: 35px;
      }
      
      .cover-section {
        height: 280px;
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
          {/* قسم صورة الغلاف - ممتدة لأعلى الصفحة لتغطية مكان النافبار */}
          <div className="cover-section">
            <div 
              className="cover-image" 
              style={{ 
                backgroundImage: `url(${managerInfo.coverImage})`
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
                          <img alt={managerInfo.name} src={managerInfo.profileImage} className="content" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                      {managerInfo.name}
                      <span className="status-badge">👑 Directeur</span>
                    </h3>
                    
                    <div className="profile-location">
                      <i className="fas fa-map-marker-alt mr-2 text-green-400"></i> {managerInfo.location}
                    </div>
                    <div className="profile-role">
                      <i className="fas fa-briefcase mr-2 text-green-400"></i> {managerInfo.role}
                    </div>
                    <div className="profile-experience">
                      <i className="fas fa-calendar-alt mr-2 text-green-400"></i> {managerInfo.experience}
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="btn-contact" onClick={() => alert(`📧 Email: ${managerInfo.email}\n📱 Téléphone: ${managerInfo.phone}`)}>
                      📧 Contacter
                    </button>
                  </div>
                  
                  {/* ========== 6 CARTES POUR LE VISITEUR (قراءة فقط) ========== */}
                  <div className="visitor-cards-container">
                    
                    {/* المربع 1: إدارة الطاولات */}
                    <div className="visitor-card">
                      <div className="card-title"><span>🍽️</span> Tables</div>
                      <div className="table-list">
                        {tables.map(table => (
                          <div key={table.id} className="table-item">
                            <span style={{ color: 'white' }}>Table n° {table.number}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* المربع 2: إدارة المجموعات */}
                    <div className="visitor-card">
                      <div className="card-title"><span>👥</span> Groupes</div>
                      <div className="group-list">
                        {groups.map(group => (
                          <div key={group.id} className="group-item">
                            <div>
                              <span style={{ color: 'white' }}>👥 {group.name}</span>
                              {group.tableRange.start && group.tableRange.end && (
                                <span className="group-info">
                                  📊 Tables : {group.tableRange.start} → {group.tableRange.end}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* المربع 3: الموظفين */}
                    <div className="visitor-card">
                      <div className="card-title"><span>👨‍🍳</span> Employés</div>
                      <div className="employee-list">
                        {employees.map(emp => (
                          <div key={emp.id} className="employee-item">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={emp.profileImage} alt={emp.name} className="employee-avatar" />
                              <span style={{ color: 'white' }}>{emp.name}</span>
                            </div>
                            {emp.groupId && (
                              <span style={{ fontSize: '0.7rem', color: '#22c55e' }}>
                                Groupe: {groups.find(g => g.id === emp.groupId)?.name}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* المربع 4: المنيو */}
                    <div className="visitor-card">
                      <div className="card-title"><span>📝</span> Menu</div>
                      
                      <div className="category-tabs">
                        {menuCategories.map(cat => (
                          <button
                            key={cat.id}
                            className={`category-tab ${selectedCategoryId === cat.id ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedCategoryId(cat.id);
                              setCurrentProductIndex(0);
                            }}
                            style={{ borderColor: selectedCategoryId === cat.id ? cat.color : undefined }}
                          >
                            {cat.icon} {cat.name}
                          </button>
                        ))}
                      </div>
                      
                      <div className="carousel-container">
                        {currentProducts.length > 0 ? (
                          <div className="carousel-card">
                            <ProductCard
                              product={currentProduct}
                              category={selectedCategory}
                              isEditable={false}
                              showActions={false}
                            />
                          </div>
                        ) : (
                          <div className="empty-products" style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍽️</div>
                            <p>Aucun produit dans cette catégorie</p>
                          </div>
                        )}
                      </div>
                      
                      {currentProducts.length > 1 && (
                        <>
                          <div className="carousel-navigation">
                            <button className="nav-arrow" onClick={prevProduct}>◀</button>
                            <button className="nav-arrow" onClick={nextProduct}>▶</button>
                          </div>
                          <div className="product-counter">
                            {currentProductIndex + 1} / {currentProducts.length}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* المربع 5: كرت المطعم */}
                    <div className="visitor-card">
                      <div className="card-title"><span>🏪</span> Restaurant</div>
                      <RestaurantCard 
                        restaurant={restaurantData}
                        isEditable={false}
                        showActions={false}
                      />
                    </div>
                    
                    {/* المربع 6: الفواتير */}
                    <div className="visitor-card">
                      <div className="card-title"><span>📊</span> Factures</div>
                      
                      <select 
                        className="filter-select"
                        value={filterType} 
                        onChange={(e) => setFilterType(e.target.value)}
                      >
                        <option value="daily">📅 Quotidienne</option>
                        <option value="monthly">📆 Mensuelle</option>
                        <option value="seasonal">🌿 Saisonnière</option>
                      </select>
                      
                      {filterType === "daily" && (
                        <input type="date" className="date-input" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                      )}
                      
                      {filterType === "monthly" && (
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                          <select className="filter-select" value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                            {["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"].map((m, i) => (<option key={i} value={i}>{m}</option>))}
                          </select>
                          <input type="number" className="filter-select" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} />
                        </div>
                      )}
                      
                      {filterType === "seasonal" && (
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                          <select className="filter-select" value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                            <option value="spring">🌸 Printemps</option>
                            <option value="summer">☀️ Été</option>
                            <option value="autumn">🍂 Automne</option>
                            <option value="winter">❄️ Hiver</option>
                          </select>
                          <input type="number" className="filter-select" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} />
                        </div>
                      )}
                      
                      <button className="btn-contact" onClick={() => {
                        generateInvoice();
                        setShowInvoices(!showInvoices);
                      }} style={{ width: '100%', marginBottom: '15px' }}>
                        {showInvoices ? "🙈 Masquer" : "🔍 Afficher"}
                      </button>
                      
                      {showInvoices && invoices.length > 0 && (
                        <div className="invoices-container">
                          <div className="invoice-tabs">
                            <button className={`invoice-tab ${invoiceViewType === 'tables' ? 'active' : ''}`} onClick={() => setInvoiceViewType('tables')}>🍽️ Par tables</button>
                            <button className={`invoice-tab ${invoiceViewType === 'groups' ? 'active' : ''}`} onClick={() => setInvoiceViewType('groups')}>👥 Par groupes</button>
                            <button className={`invoice-tab ${invoiceViewType === 'restaurant' ? 'active' : ''}`} onClick={() => setInvoiceViewType('restaurant')}>🏪 Restaurant</button>
                          </div>
                          
                          {invoiceViewType === 'tables' && (
                            <>
                              <div className="invoice-stats">
                                <h3>{getTotalRevenue()} DA</h3>
                                <p>💰 Revenu total des tables</p>
                                <p style={{ fontSize: '0.7rem' }}>📊 {invoices.length} facture(s)</p>
                              </div>
                              <div className="table-list" style={{ maxHeight: '200px' }}>
                                {invoices.slice(0, 5).map(inv => (
                                  <div key={inv.id} className="invoice-item">
                                    <span>🍽️ Table n° {inv.tableNumber}</span>
                                    <span style={{ color: '#22c55e' }}>{inv.total} DA</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          
                          {invoiceViewType === 'groups' && (
                            <>
                              <div className="invoice-stats" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                                <h3>{groupInvoices.reduce((sum, g) => sum + g.total, 0)} DA</h3>
                                <p>💰 Revenu total des groupes</p>
                              </div>
                              <div className="table-list" style={{ maxHeight: '200px' }}>
                                {groupInvoices.map(group => (
                                  <div key={group.groupId} className="invoice-item group-invoice-item">
                                    <div>
                                      <span style={{ fontWeight: 'bold' }}>👥 {group.groupName}</span>
                                      <div style={{ fontSize: '0.6rem' }}>📊 {group.tableCount} tables</div>
                                    </div>
                                    <span>{group.total} DA</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          
                          {invoiceViewType === 'restaurant' && restaurantInvoice && (
                            <div className="restaurant-invoice" style={{ padding: '15px', textAlign: 'center' }}>
                              <div style={{ fontSize: '2rem' }}>🏪</div>
                              <h3 style={{ color: '#22c55e', fontSize: '1.8rem' }}>{restaurantInvoice.total} DA</h3>
                              <p>💰 Revenu total du restaurant</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-10 py-10 border-t border-white/20 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-white">"{managerInfo.bio}"</p>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                          {managerInfo.skills.map((skill, i) => (<span key={i} className="skill-tag">{skill}</span>))}
                        </div>
                        <div className="flex justify-center gap-2 mt-4 flex-wrap">
                          {managerInfo.languages.map((lang, i) => (<span key={i} className="skill-tag">🌐 {lang}</span>))}
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
      
      <Footer />
    </>
  );
}