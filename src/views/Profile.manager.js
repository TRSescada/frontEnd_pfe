// src/views/ManagerProfile.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "components/Footers/Footer.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import RestaurantCard from "components/Common/restaurantCard";
import ProductCard from "components/Common/productCard";
import SocialFooter from "components/Common/socialFooter";

export default function ManagerProfile() {
  const history = useHistory();
  
  // ==================== بيانات البروفيل ====================
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
  
  // ==================== SOCIAL LINKS ====================
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tiktok: ""
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
  
  const [showEditRestaurantModal, setShowEditRestaurantModal] = useState(false);
  const [tempRestaurantData, setTempRestaurantData] = useState({ ...restaurantData });
  
  // ==================== STATE MANAGEMENT ====================
  const [tables, setTables] = useState([]);
  const [newTableCount, setNewTableCount] = useState(1);
  const [showQRPlaceholder, setShowQRPlaceholder] = useState(false);
  const [selectedTableForQR, setSelectedTableForQR] = useState(null);
  const [singleTableToDelete, setSingleTableToDelete] = useState("");
  
  const [groups, setGroups] = useState([
    { id: 1, name: "Groupe 1", tableIds: [], tableRange: { start: 1, end: 9 } }
  ]);
  const [newGroupName, setNewGroupName] = useState("");
  
  // ==================== DONNÉES DES EMPLOYÉS ====================
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: "Youssef", 
      role: "Employé", 
      groupId: 1, 
      status: "working",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      location: "Casablanca, Maroc",
      email: "youssef@example.com",
      phone: "+212 6 12 34 56 78",
      skills: ["Service client", "Rapidité", "Polyvalence"],
      bio: "Employé dévoué avec 3 ans d'expérience.",
      currentPlace: { id: 1, name: "Restaurant Andalous", icon: "🏪" }
    },
    { 
      id: 2, 
      name: "Mohamed", 
      role: "Employé", 
      groupId: null, 
      status: "working",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      location: "Rabat, Maroc",
      email: "mohamed@example.com",
      phone: "+212 6 98 76 54 32",
      skills: ["Gestion des stocks", "Organisation", "Travail d'équipe"],
      bio: "Employé sérieux et organisé.",
      currentPlace: { id: 2, name: "Café Parisien", icon: "☕" }
    },
    { 
      id: 3, 
      name: "Fatima", 
      role: "Serveuse", 
      groupId: 1, 
      status: "working",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      location: "Tanger, Maroc",
      email: "fatima@example.com",
      phone: "+212 6 55 55 55 55",
      skills: ["Service client", "Polyvalence", "Rapidité"],
      bio: "Serveuse expérimentée avec 4 ans d'expérience.",
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
        { id: 101, name: "Chicha Pomme", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha à la pomme fraîche" },
        { id: 102, name: "Chicha Raisin", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha au raisin sucré" },
        { id: 103, name: "Chicha Menthe", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha à la menthe rafraîchissante" }
      ] 
    },
    { 
      id: 2, 
      name: "Plats", 
      icon: "🍔", 
      color: "#4ecdc4", 
      iconImage: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
      products: [
        { id: 201, name: "Burger", price: 12, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", description: "Burger artisanal avec frites maison" },
        { id: 202, name: "Pizza", price: 18, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300", description: "Pizza margherita" }
      ] 
    },
    { 
      id: 3, 
      name: "Boissons", 
      icon: "🥤", 
      color: "#45b7d1", 
      iconImage: "https://cdn-icons-png.flaticon.com/512/1046/1046855.png",
      products: [
        { id: 301, name: "Coca Cola", price: 3, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300", description: "Coca Cola 33cl" },
        { id: 302, name: "Jus d'Orange", price: 5, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300", description: "Jus d'orange frais" }
      ] 
    },
    { 
      id: 4, 
      name: "Desserts", 
      icon: "🍰", 
      color: "#f9ca24", 
      iconImage: "https://cdn-icons-png.flaticon.com/512/1046/1046790.png",
      products: [
        { id: 401, name: "Gâteau", price: 7, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", description: "Gâteau au chocolat fondant" },
        { id: 402, name: "Glace", price: 5, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300", description: "Glace vanille" }
      ] 
    }
  ]);
  
  // ==================== CARROUSEL STATE ====================
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [tempProductData, setTempProductData] = useState({ name: "", price: 0, image: "", description: "" });
  const [tempProductImagePreview, setTempProductImagePreview] = useState("");
  
  // ==================== DRAG/SWIPE STATE ====================
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  
  const selectedCategory = menuCategories.find(cat => cat.id === selectedCategoryId);
  const currentProducts = selectedCategory?.products || [];
  const currentProduct = currentProducts[currentProductIndex];
  
  // ==================== MODALS STATE ====================
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedCategoryForProduct, setSelectedCategoryForProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, image: "", description: "" });
  const [productImagePreview, setProductImagePreview] = useState("");
  
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
  
  // ==================== FUNCTIONS TABLES ====================
  const addTables = () => {
    const startId = tables.length + 1;
    const newTables = [];
    for (let i = 0; i < newTableCount; i++) {
      const tableId = startId + i;
      newTables.push({
        id: tableId,
        number: tableId,
        groupId: null,
        status: "free"
      });
    }
    setTables([...tables, ...newTables]);
    alert(`✅ ${newTableCount} nouvelle(s) table(s) ajoutée(s) avec succès!`);
  };
  
  const deleteSingleTable = () => {
    if (!singleTableToDelete.trim()) {
      alert("⚠️ Veuillez entrer le numéro de la table à supprimer");
      return;
    }
    
    const tableNumber = parseInt(singleTableToDelete);
    const tableExists = tables.find(t => t.number === tableNumber);
    
    if (!tableExists) {
      alert(`⚠️ La table ${tableNumber} n'existe pas`);
      return;
    }
    
    if (window.confirm(`🗑️ Supprimer la table ${tableNumber} ?`)) {
      const newTables = tables.filter(table => table.number !== tableNumber);
      setTables(newTables);
      
      const updatedGroups = groups.map(group => ({
        ...group,
        tableIds: group.tableIds.filter(id => id !== tableNumber),
        tableRange: group.tableRange.start && group.tableRange.end ? 
          { start: group.tableRange.start, end: group.tableRange.end } : 
          { start: null, end: null }
      }));
      setGroups(updatedGroups);
      
      setSingleTableToDelete("");
      alert(`✅ Table ${tableNumber} supprimée avec succès`);
    }
  };
  
  const deleteMultipleTables = () => {
    const input = document.getElementById('multipleTablesToDelete');
    if (!input || !input.value.trim()) {
      alert("⚠️ Veuillez entrer les numéros des tables à supprimer");
      return;
    }
    
    let numbersToDelete = [];
    const inputValue = input.value.trim();
    
    if (inputValue.includes('-')) {
      const [start, end] = inputValue.split('-').map(n => parseInt(n));
      for (let i = start; i <= end; i++) numbersToDelete.push(i);
    } else {
      numbersToDelete = inputValue.split(',').map(n => parseInt(n.trim()));
    }
    
    const existingTables = numbersToDelete.filter(num => tables.some(t => t.number === num));
    if (existingTables.length === 0) {
      alert("⚠️ Aucune de ces tables n'existe");
      return;
    }
    
    if (window.confirm(`🗑️ Supprimer les tables: ${existingTables.join(', ')} ?`)) {
      const newTables = tables.filter(table => !existingTables.includes(table.number));
      setTables(newTables);
      
      const updatedGroups = groups.map(group => ({
        ...group,
        tableIds: group.tableIds.filter(id => !existingTables.includes(id)),
        tableRange: group.tableRange.start && group.tableRange.end ? 
          { start: group.tableRange.start, end: group.tableRange.end } : 
          { start: null, end: null }
      }));
      setGroups(updatedGroups);
      
      input.value = '';
      alert(`✅ Tables ${existingTables.join(', ')} supprimées avec succès`);
    }
  };
  
  const showQRPlaceholderFunc = (table) => {
    setSelectedTableForQR(table);
    setShowQRPlaceholder(true);
  };
  
  // ==================== FUNCTIONS GROUPS ====================
  const addGroup = () => {
    if (!newGroupName.trim()) {
      alert("⚠️ Veuillez entrer un nom de groupe");
      return;
    }
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      tableIds: [],
      tableRange: { start: null, end: null }
    };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    alert(`✅ Groupe "${newGroupName}" ajouté avec succès`);
  };
  
  const checkOverlap = (startTable, endTable, currentGroupId = null) => {
    for (const group of groups) {
      if (currentGroupId !== null && group.id === currentGroupId) continue;
      if (group.tableRange.start && group.tableRange.end) {
        if (!(endTable < group.tableRange.start || startTable > group.tableRange.end)) {
          return `Conflit avec ${group.name} (tables ${group.tableRange.start} → ${group.tableRange.end})`;
        }
      }
    }
    return null;
  };
  
  const assignTablesToGroup = (groupId, startTable, endTable) => {
    if (startTable > endTable) {
      alert("⚠️ Le numéro de début doit être inférieur au numéro de fin");
      return;
    }
    
    const overlapError = checkOverlap(startTable, endTable, groupId);
    if (overlapError) {
      alert(`⚠️ Impossible d'assigner ces tables: ${overlapError}`);
      return;
    }
    
    const availableTables = [];
    for (let i = startTable; i <= endTable; i++) {
      const tableExists = tables.find(t => t.number === i);
      if (tableExists) {
        availableTables.push(i);
      }
    }
    
    if (availableTables.length === 0) {
      alert("⚠️ Aucune table dans cette plage. Ajoutez des tables d'abord.");
      return;
    }
    
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          tableIds: availableTables,
          tableRange: { start: startTable, end: endTable }
        };
      }
      return group;
    });
    setGroups(updatedGroups);
    
    const updatedTables = tables.map(table => {
      if (table.number >= startTable && table.number <= endTable) {
        return { ...table, groupId };
      }
      return table;
    });
    setTables(updatedTables);
    
    alert(`✅ Tables ${startTable} à ${endTable} assignées au groupe ${groupId}`);
  };
  
  // ==================== FUNCTIONS EMPLOYEES ====================
  const assignEmployeeToGroup = (employeeId, groupId) => {
    const updatedEmployees = employees.map(emp => {
      if (emp.id === employeeId) {
        return { ...emp, groupId };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
    
    const employee = employees.find(e => e.id === employeeId);
    const group = groups.find(g => g.id === groupId);
    alert(`✅ ${employee?.name} assigné au ${group?.name}`);
  };
  
  // ==================== FUNCTIONS MENU ====================
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProduct({ ...newProduct, image: event.target.result });
        setProductImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleEditProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempProductData({ ...tempProductData, image: event.target.result });
        setTempProductImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      alert("⚠️ Veuillez entrer un nom et un prix valide");
      return;
    }
    
    if (!selectedCategoryForProduct) {
      alert("⚠️ Veuillez sélectionner une catégorie");
      return;
    }
    
    const defaultImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300";
    
    const updatedCategories = menuCategories.map(cat => {
      if (cat.id === selectedCategoryForProduct) {
        const newId = Math.max(...cat.products.map(p => p.id), 0) + 1;
        return {
          ...cat,
          products: [...cat.products, { 
            ...newProduct, 
            id: newId, 
            image: newProduct.image || defaultImage 
          }]
        };
      }
      return cat;
    });
    setMenuCategories(updatedCategories);
    
    setNewProduct({ name: "", price: 0, image: "", description: "" });
    setProductImagePreview("");
    setSelectedCategoryForProduct(null);
    alert(`✅ Produit "${newProduct.name}" ajouté avec succès`);
  };
  
  const deleteProduct = () => {
    if (currentProduct) {
      const updatedCategories = menuCategories.map(cat => {
        if (cat.id === selectedCategoryId) {
          return {
            ...cat,
            products: cat.products.filter(p => p.id !== currentProduct.id)
          };
        }
        return cat;
      });
      setMenuCategories(updatedCategories);
      
      if (currentProductIndex >= updatedCategories.find(c => c.id === selectedCategoryId)?.products.length) {
        setCurrentProductIndex(0);
      }
      
      setShowDeleteConfirmModal(false);
      alert(`✅ Produit "${currentProduct.name}" supprimé avec succès`);
    }
  };
  
  const openDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(true);
  };
  
  const openEditProductModal = () => {
    if (currentProduct) {
      setEditingProduct(currentProduct);
      setEditingCategoryId(selectedCategoryId);
      setTempProductData({
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image || "",
        description: currentProduct.description || ""
      });
      setTempProductImagePreview(currentProduct.image || "");
      setShowEditProductModal(true);
    }
  };
  
  const updateProduct = () => {
    if (!tempProductData.name || tempProductData.price <= 0) {
      alert("⚠️ Veuillez entrer un nom et un prix valide");
      return;
    }
    
    const defaultImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300";
    
    const updatedCategories = menuCategories.map(cat => {
      if (cat.id === editingCategoryId) {
        return {
          ...cat,
          products: cat.products.map(p => 
            p.id === editingProduct.id ? { 
              ...p, 
              name: tempProductData.name,
              price: tempProductData.price,
              image: tempProductData.image || defaultImage,
              description: tempProductData.description
            } : p
          )
        };
      }
      return cat;
    });
    setMenuCategories(updatedCategories);
    setShowEditProductModal(false);
    setEditingProduct(null);
    setEditingCategoryId(null);
    alert(`✅ Produit "${tempProductData.name}" mis à jour avec succès`);
  };
  
  // Carousel navigation
  const nextProduct = () => {
    if (currentProductIndex < currentProducts.length - 1) {
      setCurrentProductIndex(currentProductIndex + 1);
    } else {
      setCurrentProductIndex(0);
    }
    setSwipeDirection("next");
    setTimeout(() => setSwipeDirection(null), 300);
  };
  
  const prevProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex(currentProductIndex - 1);
    } else {
      setCurrentProductIndex(currentProducts.length - 1);
    }
    setSwipeDirection("prev");
    setTimeout(() => setSwipeDirection(null), 300);
  };
  
  // ==================== DRAG/SWIPE FUNCTIONS ====================
  const handleDragStart = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    setDragStartX(clientX);
    setIsDragging(true);
  };
  
  const handleDragEnd = (e) => {
    if (!isDragging) return;
    
    const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const dragDistance = dragStartX - endX;
    
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        nextProduct();
      } else {
        prevProduct();
      }
    }
    
    setIsDragging(false);
  };
  
  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
  };
  
  // ==================== FUNCTIONS RESTAURANT ====================
  const handleRestaurantLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempRestaurantData(prev => ({ ...prev, logo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRestaurantImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempRestaurantData(prev => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const updateRestaurantCard = () => {
    setRestaurantData({ ...tempRestaurantData });
    setShowEditRestaurantModal(false);
    alert(`✅ Carte du restaurant mise à jour avec succès`);
  };
  
  // ==================== FUNCTIONS INVOICES ====================
  const toggleInvoices = () => {
    if (!showInvoices) {
      generateInvoice();
    } else {
      setShowInvoices(false);
      setInvoices([]);
      setGroupInvoices([]);
      setRestaurantInvoice(null);
    }
  };
  
  const generateInvoice = () => {
    const mockInvoices = [];
    const mockGroupInvoices = [];
    
    if (filterType === "daily") {
      for (let i = 1; i <= 20; i++) {
        const groupId = i <= 9 ? 1 : (i <= 16 ? 2 : 3);
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
        const groupId = i <= 9 ? 1 : (i <= 16 ? 2 : 3);
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
        const groupId = i <= 9 ? 1 : (i <= 16 ? 2 : 3);
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
    setShowInvoices(true);
  };
  
  const getTotalRevenue = () => {
    return invoices.reduce((sum, inv) => sum + inv.total, 0);
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
    
    @keyframes slideInNext {
      from { opacity: 0; transform: translateX(100px) rotateY(-30deg); }
      to { opacity: 1; transform: translateX(0) rotateY(0); }
    }
    
    @keyframes slideInPrev {
      from { opacity: 0; transform: translateX(-100px) rotateY(30deg); }
      to { opacity: 1; transform: translateX(0) rotateY(0); }
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
    
    .profile-info-text {
      color: white !important;
      font-weight: 500;
    }
    
    .profile-bio-text {
      color: white !important;
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.95;
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
    
    .manager-cards-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      max-width: 1400px;
      margin: 40px auto 0;
      padding: 0 20px 30px;
      position: relative;
      z-index: 5;
    }
    
    .manager-cards-container::after {
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
    
    .manager-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      border-radius: 30px;
      padding: 25px;
      transition: all 0.3s ease;
      border: 1px solid rgba(34, 197, 94, 0.3);
      animation: fadeIn 0.5s ease-out;
    }
    
    .manager-card:hover {
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
    
    .input-group {
      margin-bottom: 15px;
    }
    
    .input-group label {
      display: block;
      color: white;
      margin-bottom: 5px;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .input-group input, 
    .input-group select, 
    .input-group textarea {
      width: 100%;
      padding: 10px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      border-radius: 15px;
      color: white;
      font-size: 0.9rem;
      transition: all 0.2s;
    }
    
    .input-group select option {
      background: #1a1a3a;
      color: white;
    }
    
    .input-group input:focus, 
    .input-group select:focus, 
    .input-group textarea:focus {
      outline: none;
      border-color: #22c55e;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
    }
    
    .input-group input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    .manager-card select,
    .employee-list select,
    .group-list select,
    .table-list select {
      background: rgba(255, 255, 255, 0.1) !important;
      border: 1px solid rgba(34, 197, 94, 0.3) !important;
      color: white !important;
      border-radius: 15px !important;
      padding: 8px 12px !important;
      cursor: pointer !important;
    }
    
    .manager-card select option,
    .employee-list select option,
    .group-list select option,
    .table-list select option {
      background: #1a1a3a !important;
      color: white !important;
    }
    
    /* ========== STYLES POUR LA GESTION DES EMPLOYÉS ========== */
    .add-employee-btn {
      margin-left: auto;
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      border-radius: 20px;
      padding: 5px 12px;
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .add-employee-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 10px rgba(34,197,94,0.4);
    }
    
    .evaluate-btn {
      background: linear-gradient(135deg, #a855f7, #7c3aed);
      border: none;
      border-radius: 20px;
      padding: 5px 12px;
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .evaluate-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 10px rgba(168,85,247,0.4);
    }
    
    .delete-employee-btn {
      background: linear-gradient(135deg, #ef4444, #b91c1c);
      border: none;
      border-radius: 20px;
      padding: 5px 12px;
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .delete-employee-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 10px rgba(239,68,68,0.4);
    }
    
    .employee-item {
      background: rgba(255,255,255,0.08);
      padding: 10px;
      margin-bottom: 8px;
      border-radius: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
      transition: all 0.2s;
    }
    
    .employee-item:hover {
      background: rgba(34,197,94,0.15);
      transform: translateX(3px);
    }
    
    .employee-list {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    /* ========== SCROLLBAR STYLES (VERT POUR TOUS) ========== */
    .employee-list::-webkit-scrollbar,
    .table-list::-webkit-scrollbar,
    .group-list::-webkit-scrollbar,
    .invoices-container .table-list::-webkit-scrollbar {
      width: 6px;
    }
    
    .employee-list::-webkit-scrollbar-track,
    .table-list::-webkit-scrollbar-track,
    .group-list::-webkit-scrollbar-track,
    .invoices-container .table-list::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
    }
    
    .employee-list::-webkit-scrollbar-thumb,
    .table-list::-webkit-scrollbar-thumb,
    .group-list::-webkit-scrollbar-thumb,
    .invoices-container .table-list::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 10px;
    }
    
    .employee-list::-webkit-scrollbar-thumb:hover,
    .table-list::-webkit-scrollbar-thumb:hover,
    .group-list::-webkit-scrollbar-thumb:hover,
    .invoices-container .table-list::-webkit-scrollbar-thumb:hover {
      background: #15803d;
    }
    
    /* Pour Firefox */
    .employee-list,
    .table-list,
    .group-list,
    .invoices-container .table-list {
      scrollbar-color: #22c55e rgba(255,255,255,0.1);
      scrollbar-width: thin;
    }
    
    .table-list {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    .group-list {
      max-height: 300px;
      overflow-y: auto;
      margin-top: 15px;
    }
    
    .table-item, .group-item {
      background: rgba(255,255,255,0.08);
      padding: 10px;
      margin-bottom: 8px;
      border-radius: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    
    .table-item span, .group-item span {
      color: white;
    }
    
    .qr-placeholder-btn {
      background: #22c55e;
      border: none;
      padding: 5px 12px;
      border-radius: 15px;
      color: white;
      cursor: pointer;
      font-size: 0.8rem;
    }
    
    .add-product-btn {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
    }
    
    .edit-product-btn {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
    }
    
    .delete-product-btn {
      background: linear-gradient(135deg, #ef4444, #b91c1c);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
    }
    
    .add-product-btn:hover, .edit-product-btn:hover, .delete-product-btn:hover {
      transform: scale(1.02);
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      margin-top: 10px;
    }
    
    .btn-primary:hover {
      transform: scale(1.02);
      box-shadow: 0 5px 20px rgba(34,197,94,0.4);
    }
    
    .btn-secondary {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-secondary:hover {
      transform: scale(1.02);
    }
    
    .btn-danger {
      background: linear-gradient(135deg, #ef4444, #b91c1c);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-danger:hover {
      transform: scale(1.02);
      box-shadow: 0 5px 20px rgba(239,68,68,0.4);
    }
    
    .btn-info {
      background: linear-gradient(135deg, #06b6d4, #0891b2);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-info:hover {
      transform: scale(1.02);
      box-shadow: 0 5px 20px rgba(6,182,212,0.4);
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
    
    .invoices-container {
      animation: fadeIn 0.3s ease-out;
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
    
    .restaurant-invoice p, .restaurant-invoice h3 {
      color: white;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.9);
      backdrop-filter: blur(10px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-content {
      background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
      border-radius: 30px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
    }
    
    .modal-content h2, .modal-content h3, .modal-content label {
      color: white;
    }
    
    .modal-content select, .modal-content input, .modal-content textarea {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(34,197,94,0.3);
      color: white;
    }
    
    .modal-content select option {
      background: #1a1a3a;
      color: white;
    }
    
    /* Scrollbar vert pour modals */
    .modal-content::-webkit-scrollbar {
      width: 6px;
    }
    
    .modal-content::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
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
      scrollbar-color: #22c55e rgba(255,255,255,0.1);
      scrollbar-width: thin;
    }
    
    .image-preview {
      width: 100px;
      height: 100px;
      border-radius: 15px;
      object-fit: cover;
      margin: 10px auto;
      display: block;
      border: 2px solid #22c55e;
    }
    
    .qr-placeholder-box {
      background: rgba(0,0,0,0.5);
      border: 2px dashed #22c55e;
      border-radius: 20px;
      padding: 40px;
      text-align: center;
      margin: 20px 0;
    }
    
    .qr-placeholder-box p {
      color: #22c55e;
    }
    
    .delete-section {
      margin-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.2);
      padding-top: 15px;
    }
    
    .delete-label {
      color: #ef4444;
      font-weight: bold;
      display: block;
      margin-bottom: 10px;
    }
    
    .info-text {
      color: white;
      font-size: 0.8rem;
      margin-top: 5px;
      opacity: 0.8;
    }
    
    .group-info {
      color: #22c55e;
      font-size: 0.7rem;
      margin-left: 10px;
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
      min-height: 480px;
      touch-action: pan-y pinch-zoom;
    }
    
    .carousel-card {
      position: relative;
      cursor: grab;
      user-select: none;
    }
    
    .carousel-card:active {
      cursor: grabbing;
    }
    
    .carousel-card.next-animation {
      animation: slideInNext 0.4s ease-out;
    }
    
    .carousel-card.prev-animation {
      animation: slideInPrev 0.4s ease-out;
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
    
    .swipe-instruction {
      text-align: center;
      color: rgba(255,255,255,0.4);
      font-size: 0.7rem;
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .menu-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    .empty-products {
      text-align: center;
      padding: 40px;
      color: rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.05);
      border-radius: 20px;
    }
    
    @media (max-width: 768px) {
      .manager-cards-container {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 15px;
      }
      
      .manager-cards-container::after {
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
      
      .menu-actions {
        flex-direction: column;
      }
      
      .swipe-instruction {
        font-size: 0.6rem;
      }
      
      .employee-item {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }
      
      .employee-item > div:last-child {
        width: 100%;
        justify-content: flex-start;
      }
    }
  `;

  return (
    <>
      <style>{style}</style>
      
      <IndexNavbar 
        managerInfo={managerInfo}
        onUpdateProfile={(updatedInfo) => {
          setManagerInfo(updatedInfo);
          alert("✅ Profil mis à jour!");
        }}
        onLogout={() => {
          window.location.href = "/";
        }}
      />
      
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
              backgroundImage: `url(${managerInfo.coverImage})`,
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
                          <img alt={managerInfo.name} src={managerInfo.profileImage} className="content" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 profile-info-text">
                      {managerInfo.name}
                      <span className="status-badge">👑 Directeur</span>
                    </h3>
                    <div className="text-sm leading-normal mt-2 mb-2 profile-info-text">
                      <i className="fas fa-map-marker-alt mr-2"></i> {managerInfo.location}
                    </div>
                    <div className="mb-2 mt-10 profile-info-text">
                      <i className="fas fa-briefcase mr-2 text-green-400"></i> {managerInfo.role}
                    </div>
                    <div className="mb-2 profile-info-text">
                      <i className="fas fa-calendar-alt mr-2 text-green-400"></i> {managerInfo.experience}
                    </div>
                  </div>
                  
                  <div className="action-buttons">
                    <button className="btn-contact" onClick={() => alert(`📧 Email: ${managerInfo.email}\n📱 Téléphone: ${managerInfo.phone}`)}>
                      📧 Contacter
                    </button>
                  </div>
                  
                  <div className="manager-cards-container">
                    
                    {/* المربع 1: إدارة الطاولات */}
                    <div className="manager-card">
                      <div className="card-title"><span>🍽️</span> Gestion des tables</div>
                      
                      <div className="input-group">
                        <label>📊 Nombre de nouvelles tables à ajouter :</label>
                        <input type="number" min="1" max="50" value={newTableCount} onChange={(e) => setNewTableCount(parseInt(e.target.value))} />
                      </div>
                      <button className="btn-primary" onClick={addTables}>➕ Ajouter des tables</button>
                      
                      <div className="delete-section">
                        <label className="delete-label">🗑️ Supprimer une table :</label>
                        <div className="input-group" style={{ marginTop: '5px' }}>
                          <input 
                            type="number" 
                            placeholder="Ex: 12" 
                            value={singleTableToDelete}
                            onChange={(e) => setSingleTableToDelete(e.target.value)}
                          />
                        </div>
                        <button className="btn-danger" style={{ width: '100%' }} onClick={deleteSingleTable}>
                          🗑️ Supprimer la table
                        </button>
                      </div>
                      
                      <div className="delete-section">
                        <label className="delete-label">🗑️ Supprimer plusieurs tables :</label>
                        <div className="input-group" style={{ marginTop: '5px' }}>
                          <input 
                            type="text" 
                            id="multipleTablesToDelete"
                            placeholder="Ex: 1,2,3 ou 1-5" 
                          />
                        </div>
                        <button className="btn-danger" style={{ width: '100%' }} onClick={deleteMultipleTables}>
                          🗑️ Supprimer les tables
                        </button>
                        <p className="info-text">💡 Entrez les numéros séparés par des virgules (1,2,3) ou une plage (1-5)</p>
                      </div>
                      
                      <div className="table-list">
                        <h4 style={{ color: 'white', marginBottom: '10px' }}>📋 Liste des tables ({tables.length}) :</h4>
                        {tables.map(table => (
                          <div key={table.id} className="table-item">
                            <span>🍽️ Table n° {table.number}</span>
                            <button className="qr-placeholder-btn" onClick={() => showQRPlaceholderFunc(table)}>📱 QR Code</button>
                          </div>
                        ))}
                        {tables.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>⚠️ Aucune table disponible</p>}
                      </div>
                    </div>
                    
                    {/* المربع 2: إدارة المجموعات */}
                    <div className="manager-card">
                      <div className="card-title"><span>👥</span> Gestion des groupes</div>
                      <div className="input-group">
                        <label>📝 Nom du nouveau groupe :</label>
                        <input type="text" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="Ex: Groupe VIP" />
                      </div>
                      <button className="btn-primary" onClick={addGroup}>➕ Ajouter un groupe</button>
                      <div className="group-list">
                        <h4 style={{ color: 'white', marginBottom: '10px' }}>📋 Liste des groupes ({groups.length}) :</h4>
                        {groups.map(group => (
                          <div key={group.id} className="group-item">
                            <div>
                              <span>👥 {group.name}</span>
                              {group.tableRange.start && group.tableRange.end && (
                                <span className="group-info">
                                  📊 Tables : {group.tableRange.start} → {group.tableRange.end}
                                </span>
                              )}
                            </div>
                            <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.7rem' }}
                              onClick={() => {
                                const start = prompt("Entrez le numéro de la première table :");
                                const end = prompt("Entrez le numéro de la dernière table :");
                                if (start && end) assignTablesToGroup(group.id, parseInt(start), parseInt(end));
                              }}>🪑 Assigner des tables</button>
                          </div>
                        ))}
                      </div>
                      <p className="info-text">⚠️ Une table ne peut pas appartenir à deux groupes différents</p>
                    </div>
                    
                    {/* المربع 3: إدارة الموظفين */}
                    <div className="manager-card">
                      <div className="card-title">
                        <span>👨‍🍳</span> Gestion des employés
                        <button 
                          className="add-employee-btn"
                          onClick={() => history.push("/employees")}
                        >
                          ➕ Ajouter un employé
                        </button>
                      </div>
                      
                      <div className="employee-list">
                        <h4 style={{ color: 'white', marginBottom: '10px' }}>📋 Liste des employés ({employees.length}) :</h4>
                        {employees.map(emp => (
                          <div key={emp.id} className="employee-item">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img 
                                src={emp.profileImage} 
                                alt={emp.name}
                                style={{
                                  width: '35px',
                                  height: '35px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: '2px solid #22c55e'
                                }}
                              />
                              <span style={{ color: 'white', fontWeight: 'bold' }}>{emp.name}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <select 
                                value={emp.groupId || ""} 
                                onChange={(e) => { 
                                  assignEmployeeToGroup(emp.id, parseInt(e.target.value)); 
                                }}
                                style={{ 
                                  background: 'rgba(34,197,94,0.2)', 
                                  border: '1px solid #22c55e', 
                                  borderRadius: '10px', 
                                  padding: '5px', 
                                  color: 'white',
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="">Sans groupe</option>
                                {groups.map(g => (<option key={g.id} value={g.id}>{g.name}</option>))}
                              </select>
                              <button 
                                className="evaluate-btn"
                                onClick={() => history.push(`/employee-evaluation/${emp.id}`, { employee: emp })}
                              >
                                ✏️ Évaluer
                              </button>
                              <button 
                                className="delete-employee-btn"
                                onClick={() => {
                                  if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${emp.name} ?`)) {
                                    setEmployees(employees.filter(e => e.id !== emp.id));
                                    alert(`✅ ${emp.name} a été supprimé`);
                                  }
                                }}
                              >
                                🗑️ Supprimer
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <p className="info-text" style={{ marginTop: '10px', fontSize: '0.7rem' }}>
                        💡 Cliquez sur "Évaluer" pour évaluer l'employé
                      </p>
                    </div>
                    
                    {/* المربع 4: تعديل المنيو */}
                    <div className="manager-card">
                      <div className="card-title"><span>📝</span> Gestion du menu</div>
                      
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
                      
                      <div 
                        className="carousel-container"
                        onMouseDown={handleDragStart}
                        onMouseUp={handleDragEnd}
                        onMouseMove={handleDragMove}
                        onTouchStart={handleDragStart}
                        onTouchEnd={handleDragEnd}
                        onTouchMove={handleDragMove}
                      >
                        {currentProducts.length > 0 ? (
                          <div className={`carousel-card ${swipeDirection === "next" ? "next-animation" : swipeDirection === "prev" ? "prev-animation" : ""}`}>
                            <ProductCard
                              product={currentProduct}
                              category={selectedCategory}
                              isEditable={false}
                              showActions={false}
                            />
                          </div>
                        ) : (
                          <div className="empty-products">
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍽️</div>
                            <p>Aucun produit dans cette catégorie</p>
                            <p style={{ fontSize: '0.7rem' }}>Cliquez sur "Ajouter un produit" pour commencer</p>
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
                          <div className="swipe-instruction">
                            <span>👉</span> Glissez pour changer de produit <span>👈</span>
                          </div>
                        </>
                      )}
                      
                      <div className="menu-actions">
                        <button className="add-product-btn" onClick={() => setShowAddProductModal(true)}>
                          ➕ Ajouter un produit
                        </button>
                        {currentProducts.length > 0 && (
                          <>
                            <button className="edit-product-btn" onClick={openEditProductModal}>
                              ✏️ Modifier ce produit
                            </button>
                            <button className="delete-product-btn" onClick={openDeleteConfirmModal}>
                              🗑️ Supprimer ce produit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* المربع 5: كرت المطعم */}
                    <div className="manager-card">
                      <div className="card-title"><span>🏪</span> Carte du restaurant</div>
                      <RestaurantCard 
                        restaurant={restaurantData}
                        isEditable={false}
                        showActions={false}
                      />
                      <button className="btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={() => {
                        setTempRestaurantData({ ...restaurantData });
                        setShowEditRestaurantModal(true);
                      }}>
                        ✏️ Modifier les informations
                      </button>
                    </div>
                    
                    {/* المربع 6: الفواتير */}
                    <div className="manager-card">
                      <div className="card-title"><span>📊</span> Gestion des factures</div>
                      <div className="input-group">
                        <label>📅 Type de rapport :</label>
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                          <option value="daily">📅 Rapport quotidien</option>
                          <option value="monthly">📆 Rapport mensuel</option>
                          <option value="seasonal">🌿 Rapport saisonnier</option>
                        </select>
                      </div>
                      {filterType === "daily" && (
                        <div className="input-group"><label>📅 Date :</label><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></div>
                      )}
                      {filterType === "monthly" && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div className="input-group" style={{ flex: 1 }}><label>📆 Mois :</label><select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
                            {["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"].map((m, i) => (<option key={i} value={i}>{m}</option>))}
                          </select></div>
                          <div className="input-group" style={{ flex: 1 }}><label>📅 Année :</label><input type="number" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} /></div>
                        </div>
                      )}
                      {filterType === "seasonal" && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div className="input-group" style={{ flex: 1 }}><label>🍂 Saison :</label><select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)}>
                            <option value="spring">🌸 Printemps</option><option value="summer">☀️ Été</option><option value="autumn">🍂 Automne</option><option value="winter">❄️ Hiver</option>
                          </select></div>
                          <div className="input-group" style={{ flex: 1 }}><label>📅 Année :</label><input type="number" value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} /></div>
                        </div>
                      )}
                      <button className="btn-primary" onClick={toggleInvoices} style={{ width: '100%' }}>{showInvoices ? "🙈 Masquer les factures" : "🔍 Afficher les factures"}</button>
                      {showInvoices && invoices.length > 0 && (
                        <div className="invoices-container">
                          <div className="invoice-tabs">
                            <button className={`invoice-tab ${invoiceViewType === 'tables' ? 'active' : ''}`} onClick={() => setInvoiceViewType('tables')}>🍽️ Par tables</button>
                            <button className={`invoice-tab ${invoiceViewType === 'groups' ? 'active' : ''}`} onClick={() => setInvoiceViewType('groups')}>👥 Par groupes</button>
                            <button className={`invoice-tab ${invoiceViewType === 'restaurant' ? 'active' : ''}`} onClick={() => setInvoiceViewType('restaurant')}>🏪 Restaurant</button>
                          </div>
                          {invoiceViewType === 'tables' && (
                            <>
                              <div className="invoice-stats"><h3>{getTotalRevenue()} DA</h3><p>💰 Revenu total des tables</p><p style={{ fontSize: '0.7rem' }}>📊 {invoices.length} facture(s)</p></div>
                              <div className="table-list" style={{ maxHeight: '200px' }}>{invoices.slice(0, 5).map(inv => (<div key={inv.id} className="invoice-item"><span>🍽️ Table n° {inv.tableNumber}</span><span style={{ color: '#22c55e' }}>{inv.total} DA</span></div>))}</div>
                            </>
                          )}
                          {invoiceViewType === 'groups' && (
                            <>
                              <div className="invoice-stats" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}><h3>{groupInvoices.reduce((sum, g) => sum + g.total, 0)} DA</h3><p>💰 Revenu total des groupes</p></div>
                              <div className="table-list" style={{ maxHeight: '200px' }}>{groupInvoices.map(group => (<div key={group.groupId} className="invoice-item group-invoice-item"><div><span style={{ fontWeight: 'bold' }}>👥 {group.groupName}</span><div style={{ fontSize: '0.6rem' }}>📊 {group.tableCount} tables</div></div><span>{group.total} DA</span></div>))}</div>
                            </>
                          )}
                          {invoiceViewType === 'restaurant' && restaurantInvoice && (
                            <div className="restaurant-invoice" style={{ padding: '15px', textAlign: 'center' }}><div style={{ fontSize: '2rem' }}>🏪</div><h3 style={{ color: '#22c55e', fontSize: '1.8rem' }}>{restaurantInvoice.total} DA</h3><p>💰 Revenu total du restaurant</p></div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-10 py-10 border-t border-white/20 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed profile-bio-text">"{managerInfo.bio}"</p>
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
      
      {/* Modal Confirmation QR */}
      {showQRPlaceholder && selectedTableForQR && (
        <div className="modal-overlay" onClick={() => setShowQRPlaceholder(false)}>
          <div className="modal-content">
            <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>📱 Code QR - Table {selectedTableForQR.number}</h2>
            <div className="qr-placeholder-box">
              <div style={{ fontSize: '4rem' }}>📱</div>
              <p style={{ color: '#22c55e' }}>Code QR pour la table {selectedTableForQR.number}</p>
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => setShowQRPlaceholder(false)}>Fermer</button>
          </div>
        </div>
      )}
      
      {/* Modal Ajouter un produit */}
      {showAddProductModal && (
        <div className="modal-overlay" onClick={() => setShowAddProductModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>➕ Ajouter un produit</h2>
            <div className="input-group"><label>📂 Catégorie :</label><select onChange={(e) => setSelectedCategoryForProduct(parseInt(e.target.value))} value={selectedCategoryForProduct || ""}>
              <option value="">Choisir une catégorie</option>
              {menuCategories.map(cat => (<option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>))}
            </select></div>
            <div className="input-group"><label>📝 Nom du produit :</label><input type="text" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} placeholder="Ex: Pizza Margherita" /></div>
            <div className="input-group"><label>💰 Prix (DA) :</label><input type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} placeholder="Ex: 1200" /></div>
            <div className="input-group"><label>📝 Description :</label><textarea rows="2" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} placeholder="Description du produit" /></div>
            <div className="input-group">
              <label>🖼️ Image du produit :</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleProductImageChange}
                style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '15px', color: 'white' }}
              />
            </div>
            {productImagePreview && <img src={productImagePreview} className="image-preview" alt="preview" />}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={addProduct}>💾 Enregistrer</button>
              <button className="btn-danger" style={{ flex: 1 }} onClick={() => setShowAddProductModal(false)}>❌ Fermer</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Modifier un produit */}
      {showEditProductModal && editingProduct && (
        <div className="modal-overlay" onClick={() => setShowEditProductModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>✏️ Modifier le produit</h2>
            <div className="input-group"><label>📝 Nom du produit :</label><input type="text" value={tempProductData.name} onChange={(e) => setTempProductData({...tempProductData, name: e.target.value})} /></div>
            <div className="input-group"><label>💰 Prix (DA) :</label><input type="number" value={tempProductData.price} onChange={(e) => setTempProductData({...tempProductData, price: parseFloat(e.target.value)})} /></div>
            <div className="input-group"><label>📝 Description :</label><textarea rows="2" value={tempProductData.description} onChange={(e) => setTempProductData({...tempProductData, description: e.target.value})} /></div>
            <div className="input-group">
              <label>🖼️ Image du produit :</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleEditProductImageChange}
                style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '15px', color: 'white' }}
              />
            </div>
            {tempProductImagePreview && <img src={tempProductImagePreview} className="image-preview" alt="preview" />}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={updateProduct}>💾 Sauvegarder</button>
              <button className="btn-danger" style={{ flex: 1 }} onClick={() => setShowEditProductModal(false)}>❌ Annuler</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Confirmation suppression produit */}
      {showDeleteConfirmModal && currentProduct && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirmModal(false)}>
          <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>⚠️</div>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>Êtes-vous sûr ?</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '25px' }}>
              Voulez-vous vraiment supprimer le produit <strong style={{ color: '#22c55e' }}>"{currentProduct.name}"</strong> ?
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                className="btn-danger" 
                style={{ flex: 1, padding: '12px' }}
                onClick={deleteProduct}
              >
                🗑️ Oui, supprimer
              </button>
              <button 
                className="btn-secondary" 
                style={{ flex: 1, padding: '12px' }}
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                ❌ Non, annuler
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Modifier les informations du restaurant - CORRIGÉ */}
      {showEditRestaurantModal && (
        <div className="modal-overlay" onClick={() => setShowEditRestaurantModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: 'white' }}>✏️ Modifier les informations du restaurant</h2>
            
            <div className="input-group">
              <label>🏪 Nom :</label>
              <input 
                type="text" 
                value={tempRestaurantData.name} 
                onChange={(e) => setTempRestaurantData(prev => ({ ...prev, name: e.target.value }))} 
              />
            </div>
            
            <div className="input-group">
              <label>📍 Location :</label>
              <input 
                type="text" 
                value={tempRestaurantData.location} 
                onChange={(e) => setTempRestaurantData(prev => ({ ...prev, location: e.target.value }))} 
              />
            </div>
            
            <div className="input-group">
              <label>📝 Description :</label>
              <textarea 
                rows="2" 
                value={tempRestaurantData.description} 
                onChange={(e) => setTempRestaurantData(prev => ({ ...prev, description: e.target.value }))} 
              />
            </div>
            
            <div className="input-group">
              <label>📞 Téléphone :</label>
              <input 
                type="text" 
                value={tempRestaurantData.phone} 
                onChange={(e) => setTempRestaurantData(prev => ({ ...prev, phone: e.target.value }))} 
              />
            </div>
            
            <div className="input-group">
              <label>📧 Email :</label>
              <input 
                type="email" 
                value={tempRestaurantData.email} 
                onChange={(e) => setTempRestaurantData(prev => ({ ...prev, email: e.target.value }))} 
              />
            </div>
            
            <div className="input-group">
              <label>🖼️ Logo (fichier) :</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleRestaurantLogoFileChange}
                style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '15px', color: 'white' }}
              />
            </div>
            
            <div className="input-group">
              <label>🖼️ Image principale (fichier) :</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleRestaurantImageFileChange}
                style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '15px', color: 'white' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={updateRestaurantCard}>💾 Enregistrer</button>
              <button className="btn-danger" style={{ flex: 1 }} onClick={() => setShowEditRestaurantModal(false)}>❌ Annuler</button>
            </div>
          </div>
        </div>
      )}
      
      <SocialFooter socialLinks={socialLinks} />
      <Footer />
    </>
  );
}