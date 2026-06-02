// src/views/Profileemploye.js
import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useLocation } from "react-router-dom";
import apiUser from "services/apiUser";
import apiGestionX from "services/apiGestionX";
import jobOfferService from "services/jobOfferService";
import Footer from "components/Footers/Footer.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import CommentSection from "components/Common/commentSection.js";
import EvaluationSection from "components/Common/evaluationsection.js";
import CVSection from "components/Common/cvsection.js";
import SocialFooter from "components/Common/socialFooter.js";

// ==================== Compteur global pour les numéros de commande ====================
let globalOrderCounter = 0;

// ==================== Fonction pour créer une nouvelle commande ====================
const createNewOrder = (orderData) => {
  globalOrderCounter++;
  return {
    ...orderData,
    orderNumber: globalOrderCounter
  };
};

// ==================== Composant Checkmark de confirmation ====================
const CheckmarkConfirmation = ({ show, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);
  
  if (!show) return null;
  
  return (
    <div className="checkmark-overlay">
      <div className="checkmark-container">
        <svg className="checkmark" viewBox="0 0 52 52">
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>
    </div>
  );
};

// ==================== Modal de détails - Premier système (Commandes) ====================
const GroupDetailModal = memo(({ groupId, orders, onUpdateOrderStatus, onClose }) => {
  const [showIndividualOrders, setShowIndividualOrders] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  
  const currentGroup = useMemo(() => {
    const groups = {};
    orders.forEach(order => {
      const key = `${order.name}_${order.price}_${order.tableId}`;
      if (!groups[key]) {
        groups[key] = {
          id: key,
          name: order.name,
          price: order.price,
          quantity: 0,
          orders: [],
          status: order.status,
          tableId: order.tableId
        };
      }
      groups[key].quantity++;
      groups[key].orders.push(order);
    });
    return Object.values(groups).find(g => g.id === groupId);
  }, [orders, groupId]);
  
  const handleUpdateSingleOrder = useCallback((orderId, newStatus, e) => {
    if (e) e.stopPropagation();
    setPendingAction({ orderId, newStatus });
    setShowCheckmark(true);
  }, []);
  
  const handleUpdateAllOrders = useCallback((newStatus, e) => {
    if (e) e.stopPropagation();
    setPendingAction({ all: true, newStatus });
    setShowCheckmark(true);
  }, []);
  
  const handleCheckmarkComplete = useCallback(() => {
    if (pendingAction) {
      if (pendingAction.all) {
        currentGroup?.orders.forEach(order => onUpdateOrderStatus(order.id, pendingAction.newStatus));
      } else {
        onUpdateOrderStatus(pendingAction.orderId, pendingAction.newStatus);
      }
      setPendingAction(null);
    }
    setShowCheckmark(false);
  }, [pendingAction, currentGroup, onUpdateOrderStatus]);
  
  if (!currentGroup) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-order" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', width: '90%', maxHeight: '85vh', overflowY: 'auto' }}>
        <button onClick={onClose} className="close-btn">✕</button>
        <div className="text-center">
          <div className="text-5xl mb-3">📦</div>
          <h3 className="text-xl font-bold text-white mb-2">{currentGroup.name}</h3>
          <div className="order-detail-info">
            <p><span className="detail-label">🍽️ Table:</span> {currentGroup.tableId}</p>
            <p><span className="detail-label">💰 Prix unitaire:</span> {currentGroup.price} DA</p>
            <p><span className="detail-label">🔢 Quantité totale:</span> {currentGroup.quantity}</p>
            <p><span className="detail-label">💵 Prix total:</span> {currentGroup.price * currentGroup.quantity} DA</p>
          </div>
          
          <div className="order-detail-buttons" style={{ marginBottom: '15px', flexWrap: 'wrap' }}>
            <button onClick={(e) => handleUpdateAllOrders('completed', e)} className="btn-livre">✅ Livrée (Tous)</button>
            <button onClick={(e) => handleUpdateAllOrders('cancelled', e)} className="btn-annule">❌ Annulée (Tous)</button>
          </div>
          
          <button onClick={() => setShowIndividualOrders(!showIndividualOrders)} className="btn-primary w-full mb-3" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
            {showIndividualOrders ? '📋 Masquer les détails' : '🔍 Voir les détails de chaque commande'}
          </button>
          
          {showIndividualOrders && (
            <div className="individual-orders-list" style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
              <h4 className="text-white font-bold mb-3 text-center">📋 Commandes individuelles:</h4>
              {currentGroup.orders.map((order) => (
                <div key={order.id} className="individual-order-item" style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: `3px solid ${order.status === 'cancelled' ? '#ef4444' : order.status === 'completed' ? '#3b82f6' : '#22c55e'}`
                }}>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div className="text-white text-sm">🆔 Commande #{order.orderNumber}</div>
                    <div className="text-gray-400 text-xs">🕐 {order.time || 'Maintenant'}</div>
                    {order.notes && <div className="text-yellow-400 text-xs">📝 {order.notes}</div>}
                    <div className="text-xs text-blue-400 mt-1">🍽️ Table: {order.tableId}</div>
                    <div className="text-xs mt-1">
                      <span className={`status-badge-detail ${order.status}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                        {order.status === 'pending' ? '⏳ En attente' : order.status === 'completed' ? '✅ Livrée' : '❌ Annulée'}
                      </span>
                    </div>
                  </div>
                  <div className="individual-order-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={(e) => handleUpdateSingleOrder(order.id, 'completed', e)} className="btn-livre" style={{ padding: '5px 12px', fontSize: '12px' }}>✅ Livrée</button>
                    <button onClick={(e) => handleUpdateSingleOrder(order.id, 'cancelled', e)} className="btn-annule" style={{ padding: '5px 12px', fontSize: '12px' }}>❌ Annulée</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 text-sm text-gray-400">
            <p>📌 {currentGroup.orders.filter(o => o.status === 'pending').length} / {currentGroup.quantity} commande(s) en attente</p>
            <p className="text-xs mt-1">💡 La fenêtre reste ouverte - Vous pouvez modifier l'état à tout moment</p>
          </div>
        </div>
      </div>
      
      <CheckmarkConfirmation show={showCheckmark} onComplete={handleCheckmarkComplete} />
    </div>
  );
});

// ==================== Modal de détails - Deuxième système (Tables) ====================
const TableDetailModal = ({ table, onLiberateTable, onClose }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [pendingLiberate, setPendingLiberate] = useState(false);
  
  const handleLiberate = () => {
    setPendingLiberate(true);
    setShowCheckmark(true);
  };
  
  const handleCheckmarkComplete = () => {
    if (pendingLiberate) {
      onLiberateTable(table.id);
      setPendingLiberate(false);
    }
    setShowCheckmark(false);
    onClose();
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-order" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px', width: '90%', maxHeight: '85vh', overflowY: 'auto' }}>
        <button onClick={onClose} className="close-btn">✕</button>
        <div className="text-center">
          <div className="text-5xl mb-3">🍽️</div>
          <h3 className="text-xl font-bold text-white mb-2">Table N° {table.tableNumber}</h3>
          <div className="order-detail-info">
            <p><span className="detail-label">📋 Nombre de commandes:</span> {table.orderCount}</p>
            <p><span className="detail-label">💰 Total:</span> {table.total} DA</p>
          </div>
          
          <button onClick={() => setShowOrderDetails(!showOrderDetails)} className="btn-primary w-full mb-3" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            {showOrderDetails ? '📋 Masquer les détails' : '🔍 Voir les détails des commandes'}
          </button>
          
          {showOrderDetails && (
            <div className="individual-orders-list" style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
              <h4 className="text-white font-bold mb-3 text-center">📋 Liste des produits:</h4>
              {table.items.map((item, idx) => (
                <div key={idx} className="individual-order-item" style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div className="text-white text-sm">🍽️ {item.name}</div>
                    <div className="text-gray-400 text-xs">Quantité: {item.quantity}</div>
                    <div className="text-orange-400 text-xs">{item.price} DA × {item.quantity} = {item.total} DA</div>
                  </div>
                  <div className="text-orange-400 font-bold">{item.total} DA</div>
                </div>
              ))}
              <div className="text-center mt-3 pt-3 border-t border-white/20">
                <p className="text-white font-bold">💰 Total général: {table.total} DA</p>
              </div>
            </div>
          )}
          
          <button onClick={handleLiberate} className="btn-liberer w-full mt-3" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', padding: '12px 20px', borderRadius: '25px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            🔓 Libérer la table
          </button>
          <p className="text-xs text-gray-400 mt-3">⚠️ Après la libération, les commandes sont définitivement validées et ne peuvent plus être modifiées</p>
        </div>
      </div>
      
      <CheckmarkConfirmation show={showCheckmark} onComplete={handleCheckmarkComplete} />
    </div>
  );
};

// ==================== Composant Liste des commandes (Premier système) - Couleur BLEU ====================
const OrderList = ({ orders, onUpdateOrderStatus, onModalOpenChange }) => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (onModalOpenChange) {
      onModalOpenChange(!!selectedGroupId);
    }
  }, [selectedGroupId, onModalOpenChange]);

  const orderGroups = useMemo(() => {
    const groups = {};
    orders.forEach(order => {
      const key = `${order.name}_${order.price}_${order.tableId}`;
      if (!groups[key]) {
        groups[key] = {
          id: key,
          name: order.name,
          price: order.price,
          quantity: 0,
          orders: [],
          status: order.status,
          tableId: order.tableId,
          orderNumbers: []
        };
      }
      groups[key].quantity++;
      groups[key].orders.push(order);
      groups[key].orderNumbers.push(order.orderNumber);
      if (order.status === 'cancelled') groups[key].status = 'cancelled';
      else if (order.status === 'completed') groups[key].status = 'completed';
      else groups[key].status = 'pending';
    });
    return Object.values(groups);
  }, [orders]);

  useEffect(() => {
    if (containerRef.current && !selectedGroupId) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [orders, selectedGroupId]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setShowScrollButton(scrollHeight - scrollTop > clientHeight + 50);
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="order-list-container blue-list" style={{ width: '100%', maxWidth: '1100px', margin: '30px auto' }}>
        <div className="order-list-header blue-header">
          <h3 className="order-list-title">
            📋 Liste des commandes en attente
            <span className="order-count-badge-blue">{orders.filter(o => o.status === 'pending').length}</span>
          </h3>
          <div className="header-actions">
            <button className="refresh-btn-blue" onClick={() => window.location.reload()}>🔄</button>
          </div>
        </div>
        
        <div ref={containerRef} className="order-list-scroll" onScroll={handleScroll} style={{ maxHeight: '550px', overflowY: 'auto' }}>
          {orderGroups.length === 0 ? (
            <div className="empty-orders">
              <div className="empty-icon">🍽️</div>
              <p>Aucune commande pour le moment</p>
            </div>
          ) : (
            orderGroups.map((group) => (
              <div key={group.id} className={`order-item order-item-blue ${group.status} animate-slide-up`}>
                <div className="order-item-content">
                  <div className="order-info" onClick={() => setSelectedGroupId(selectedGroupId === group.id ? null : group.id)} style={{ cursor: 'pointer', flex: 1 }}>
                    <span className="order-icon">🍽️</span>
                    <div className="order-details">
                      <div className="order-name">{group.name}</div>
                      <div className="order-meta">
                        <span className="order-price-blue">{group.price} DA</span>
                        {group.quantity > 1 && <span className="order-quantity-badge-blue">×{group.quantity}</span>}
                        <span className="order-table-badge-blue">🍽️ Table {group.tableId}</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-actions">
                    <div className={`order-status ${group.status}`}>
                      {group.status === 'pending' ? '⏳' : group.status === 'completed' ? '✅' : '❌'}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {showScrollButton && <button className="scroll-to-top-blue" onClick={scrollToTop}>↑</button>}
      </div>
      
      {selectedGroupId && (
        <GroupDetailModal 
          groupId={selectedGroupId}
          orders={orders}
          onUpdateOrderStatus={onUpdateOrderStatus}
          onClose={() => setSelectedGroupId(null)}
        />
      )}
    </>
  );
};

// ==================== Composant Liste des tables (Deuxième système) - Couleur ORANGE ====================
const TablesList = ({ completedOrders, onTableClick }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef(null);

  const tableGroups = useMemo(() => {
    const groups = {};
    
    completedOrders.forEach(order => {
      const tableId = order.tableId;
      if (!tableId) return;
      
      const productKey = `${tableId}_${order.name}_${order.price}`;
      
      if (!groups[productKey]) {
        groups[productKey] = {
          id: productKey,
          tableNumber: tableId,
          name: order.name,
          price: order.price,
          quantity: 0,
          orders: [],
          total: 0,
          orderNumbers: []
        };
      }
      
      groups[productKey].quantity++;
      groups[productKey].orders.push(order);
      groups[productKey].orderNumbers.push(order.orderNumber);
      groups[productKey].total += order.price;
    });
    
    const tablesMap = {};
    Object.values(groups).forEach(group => {
      const tableId = group.tableNumber;
      if (!tablesMap[tableId]) {
        tablesMap[tableId] = {
          id: tableId,
          tableNumber: tableId,
          items: [],
          total: 0,
          orderCount: 0,
          orderNumbers: []
        };
      }
      tablesMap[tableId].items.push(group);
      tablesMap[tableId].total += group.total;
      tablesMap[tableId].orderCount += group.quantity;
      tablesMap[tableId].orderNumbers.push(...group.orderNumbers);
    });
    
    return Object.values(tablesMap);
  }, [completedOrders]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setShowScrollButton(scrollHeight - scrollTop > clientHeight + 50);
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (tableGroups.length === 0) {
    return (
      <div className="order-list-container orange-list" style={{ width: '100%', maxWidth: '1100px', margin: '30px auto' }}>
        <div className="order-list-header orange-header">
          <h3 className="order-list-title">🍽️ Liste des commandes livrées <span className="order-count-badge-orange">0</span></h3>
        </div>
        <div className="empty-orders"><div className="empty-icon">🍽️</div><p>Aucune commande livrée pour le moment</p><p className="empty-sub">Les commandes apparaîtront ici lorsque vous les marquerez comme livrées</p></div>
      </div>
    );
  }

  return (
    <div className="order-list-container orange-list" style={{ width: '100%', maxWidth: '1100px', margin: '30px auto' }}>
      <div className="order-list-header orange-header">
        <h3 className="order-list-title">🍽️ Liste des commandes livrées <span className="order-count-badge-orange">{completedOrders.length}</span></h3>
      </div>
      <div ref={containerRef} className="order-list-scroll" onScroll={handleScroll} style={{ maxHeight: '550px', overflowY: 'auto' }}>
        {tableGroups.map((table) => (
          <div key={table.id} className="order-item order-item-orange">
            <div className="order-item-content">
              <div className="order-info" onClick={() => onTableClick(table.id)} style={{ cursor: 'pointer', flex: 1 }}>
                <span className="order-icon">🍽️</span>
                <div className="order-details">
                  <div className="order-name">Table N° {table.tableNumber}</div>
                  <div className="order-meta">
                    <span className="order-price-orange">{table.orderCount} commande(s)</span>
                    <span className="order-table-badge-orange">💰 {table.total} DA</span>
                  </div>
                  <div className="order-items-details" style={{ marginTop: '5px' }}>
                    {table.items.map((item, idx) => (
                      <div key={idx} className="order-item-detail" style={{ fontSize: '11px', color: '#f59e0b', display: 'inline-block', marginRight: '10px' }}>
                        {item.name} {item.quantity > 1 && `×${item.quantity}`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-actions">
                <div className="order-price-orange" style={{ fontSize: '14px', fontWeight: 'bold' }}>{table.total} DA</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showScrollButton && <button className="scroll-to-top-orange" onClick={scrollToTop}>↑</button>}
    </div>
  );
};

// ==================== Composant principal ====================
export default function Profileemploye() {
  // ==================== STATE ====================
  const [showWorkerCV, setShowWorkerCV] = useState(false);
  const [showManagerCV, setShowManagerCV] = useState(false);
  const [showCommentsList, setShowCommentsList] = useState(false);
  const [workerStatus, setWorkerStatus] = useState("working");
  const [currentWorkPlace, setCurrentWorkPlace] = useState("Le Café Paris");
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const location = useLocation();
  const [cvKey, setCvKey] = useState(0); // ✅ مفتاح لإعادة تحميل CVSection فقط عند الحاجة
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tiktok: ""
  });
  
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

  useEffect(() => {
    const employee = location.state?.employee;
    if (employee) {
      setWorkerInfo(prev => ({
        ...prev,
        name: employee.name || prev.name,
        role: employee.role || prev.role,
        experience: employee.experience || prev.experience,
        skills: employee.skills || prev.skills,
        bio: employee.bio || prev.bio,
        email: employee.email || prev.email,
        phone: employee.phone || prev.phone,
        location: employee.location || prev.location,
        languages: employee.languages || prev.languages,
        coverImage: employee.coverImage || prev.coverImage,
        profileImage: employee.profileImage || prev.profileImage
      }));

      if (employee.status) {
        setWorkerStatus(employee.status);
      }
      if (employee.currentPlace?.name) {
        setCurrentWorkPlace(employee.currentPlace.name);
      }
    }
  }, [location.state]);

  // If the page is opened by the signed-in worker, fetch the Worker doc from backend
  useEffect(() => {
    const shouldFetch = !location.state?.employee;
    if (!shouldFetch) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await jobOfferService.getWorkerByUser(userId);
        const worker = res?.worker || res;
        if (!worker || cancelled) return;
        setWorkerInfo(prev => ({
          ...prev,
          id: worker._id,
          name: worker.user?.firstName && worker.user?.lastName
            ? `${worker.user.firstName} ${worker.user.lastName}`
            : worker.user?.firstName || worker.user?.name || prev.name,
          role: worker.role || prev.role,
          experience: worker.experience || prev.experience,
          skills: worker.skills || prev.skills,
          bio: worker.bio || worker.user?.bio || prev.bio,
          email: worker.user?.email || prev.email,
          phone: worker.user?.phone || worker.phone || prev.phone,
          location: worker.user?.location || worker.location || prev.location,
          languages: worker.languages || prev.languages,
          coverImage: worker.coverImage || worker.user?.coverImage || prev.coverImage,
          profileImage: worker.profileImage || worker.user?.avatar || prev.profileImage
        }));

        if (worker.status) setWorkerStatus(worker.status.toLowerCase());
        if (worker.comments) setComments(worker.comments || []);
        if (worker.socialLinks) setSocialLinks(worker.socialLinks || {});

        // Load evaluations from backend
        try {
          const evalResp = await apiGestionX.getEvaluationsByWorker(worker._id);
          const evals = evalResp?.evaluations || [];
          const mappedHistory = evals.map(ev => ({
            id: ev._id,
            place: ev.restaurant?.name || "Restaurant",
            role: "Employé",
            duration: ev.period || `${new Date(ev.startDate).toLocaleDateString()} - ${ev.isCurrentlyWorking ? 'Présent' : new Date(ev.endDate).toLocaleDateString()}`,
            rating: ev.rating,
            review: ev.comment,
            manager: ev.manager?.user?.firstName ? `${ev.manager.user.firstName} ${ev.manager.user.lastName}` : "Manager"
          }));
          setWorkHistory(mappedHistory);
        } catch (evalErr) {
          console.warn('Évaluations non trouvées:', evalErr);
        }

        // Load CV data (skills, experience, etc.)
        try {
          const cvResp = await apiGestionX.getWorkerCV(worker._id);
          if (cvResp?.cv) {
            const cv = cvResp.cv;
            setWorkerInfo(prev => ({
              ...prev,
              skills: cv.skills?.length > 0 ? cv.skills : prev.skills,
              experience: cv.experience || prev.experience,
              languages: cv.languages?.length > 0 ? cv.languages : prev.languages,
              bio: cv.bio || prev.bio
            }));
          }
        } catch (cvErr) {
          console.warn('CV non trouvé:', cvErr);
        }
      } catch (err) {
        console.error('Erreur fetching worker by user:', err);
      }
    })();

    return () => { cancelled = true; };
  }, [location.state]);
  
  // ==================== COMMENTAIRES (affichage seulement) ====================
  const [comments, setComments] = useState([
    { id: 1, author: "Sophie Martin", text: "Excellente prestation ! Je recommande vivement 👍", rating: 5, date: "2024-03-15" },
    { id: 2, author: "Thomas Dubois", text: "Service rapide et professionnel. Très satisfait.", rating: 4, date: "2024-03-10" },
    { id: 3, author: "Marie Lambert", text: "Super expérience, à refaire ! 🌟", rating: 5, date: "2024-03-05" }
  ]);
  
  // ==================== HISTORIQUE DE TRAVAIL (affichage seulement) ====================
  const [workHistory, setWorkHistory] = useState([
    { place: "Le Café Paris", role: "Serveuse", duration: "2023 - Présent", rating: 5, review: "Excellente serveuse, très professionnelle !" },
    { place: "Restaurant La Mer", role: "Barmaid", duration: "2021 - 2023", rating: 4, review: "Bon travail, équipe sympathique." },
    { place: "Café Central", role: "Stagiaire Serveuse", duration: "2020 - 2021", rating: 4.5, review: "Apprentissage rapide, très motivée." }
  ]);
  
  // ==================== SYSTÈME DE COMMANDES ====================
  globalOrderCounter = 0;
  
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  
  const [completedOrders, setCompletedOrders] = useState([]);
  
  useEffect(() => {
    const newCompletedOrders = orders.filter(order => order.status === 'completed');
    setCompletedOrders(newCompletedOrders);
  }, [orders]);
  
  // ==================== FUNCTIONS ====================
  const fetchWorkerOrders = useCallback(async () => {
    const workerId = location.state?.employee?.id || location.state?.employee?._id || workerInfo.id || workerInfo._id;
    if (!workerId) {
      setIsLoadingOrders(false);
      return;
    }

    try {
      setIsLoadingOrders(true);
      const workerOrders = await apiUser.getOrdersByWorker(workerId);
      const mappedOrders = workerOrders.map(order => {
        const firstItem = Array.isArray(order.items) && order.items.length > 0 ? order.items[0] : {};
        const tableObj = order.tableId;
        const tableNumber = tableObj?.numero || tableObj?.number || tableObj || 'N/A';
        const tableObjectId = tableObj?._id || null;
        return {
          id: order._id || order.id,
          name: firstItem.name || `Commande #${order.orderNumber}`,
          price: order.total || firstItem.total || firstItem.prix || 0,
          status: order.status === 'en attente' || order.status === 'partiellement livre' || order.status === 'partiellement annule' ? 'pending' :
                  order.status === 'complete' ? 'completed' :
                  order.status === 'annule' ? 'cancelled' : 'pending',
          time: order.createdAt ? new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '',
          notes: firstItem.notes || '',
          tableId: tableNumber,
          tableObjectId: tableObjectId,
          orderNumber: order.orderNumber || order._id || Date.now()
        };
      });
      setOrders(mappedOrders);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes du backend :', error);
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  }, [location.state, workerInfo]);

  useEffect(() => {
    fetchWorkerOrders();
  }, [fetchWorkerOrders]);
  
  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    const backendStatus = newStatus === 'completed' ? 'livree' : newStatus === 'cancelled' ? 'annule' : 'en attente';
    try {
      await apiUser.updateAllItemsStatus(orderId, backendStatus);
      await fetchWorkerOrders();
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
      alert('❌ Erreur lors de la mise à jour du statut');
    }
  }, [fetchWorkerOrders]);
  
  const liberateTable = useCallback(async (tableId) => {
    const ordersToLiberate = completedOrders.filter(order => order.tableId === tableId);
    
    if (ordersToLiberate.length === 0) {
      alert(`⚠️ Aucune commande à libérer pour la table N° ${tableId}`);
      return;
    }
    
    const totalAmount = ordersToLiberate.reduce((sum, o) => sum + o.price, 0);
    
    if (window.confirm(`✅ Confirmer la libération de la table N° ${tableId}?\n\n📊 Nombre de commandes: ${ordersToLiberate.length}\n💰 Total: ${totalAmount} DA\n\n⚠️ Cette action est irréversible!`)) {
      try {
        const tableObj = ordersToLiberate.find(o => o.tableObjectId)?.tableObjectId;
        if (tableObj) {
          await apiGestionX.updateTableStatus(tableObj, 'libre');
          await apiUser.deleteCompletedOrdersByTable(tableObj);
        }
        await fetchWorkerOrders();
        alert(`✅ Table ${tableId} libérée avec succès`);
      } catch (error) {
        console.error('Erreur libération table:', error);
        alert(`❌ Erreur lors de la libération: ${error?.message || JSON.stringify(error)}`);
      }
    }
  }, [completedOrders, fetchWorkerOrders]);
  
  // Fonctions vides pour les props requises mais inutilisées (read-only)
  const emptyFunction = useCallback(() => {}, []);
  const emptyUpdateFunction = useCallback((data) => { console.log("Read-only mode:", data); }, []);
  
  // ✅ Fonction pour mettre à jour le profil depuis AdminNavbar
  const updateProfile = useCallback((updatedInfo) => {
    setWorkerInfo(updatedInfo);
    localStorage.setItem("workerInfo", JSON.stringify(updatedInfo));
    alert("✅ Profil mis à jour avec succès!");
  }, []);
  
  // ✅ Fonction pour sauvegarder le CV sans fermer le modal prématurément
  const handleSaveCV = useCallback(async (updatedInfo) => {
    const workerId = updatedInfo.id || workerInfo.id;
    if (!workerId) {
      alert("❌ ID employé manquant");
      return;
    }

    try {
      await apiGestionX.updateCV(workerId, {
        name: updatedInfo.name,
        role: updatedInfo.role,
        bio: updatedInfo.bio,
        email: updatedInfo.email,
        phone: updatedInfo.phone,
        location: updatedInfo.location,
        experience: updatedInfo.experience,
        skills: updatedInfo.skills,
        languages: updatedInfo.languages,
        coverImage: updatedInfo.coverImage,
        profileImage: updatedInfo.profileImage
      });
      setWorkerInfo(updatedInfo);
      setShowWorkerCV(false);
      setCvKey(prev => prev + 1);
      alert("✅ CV mis à jour avec succès!");
    } catch (error) {
      console.error('❌ Erreur mise à jour CV:', error);
      alert(`❌ Échec de la mise à jour: ${error?.message || JSON.stringify(error)}`);
    }
  }, [workerInfo.id]);
  
  const updateSocialLinks = (links) => {
    setSocialLinks(links);
    localStorage.setItem("socialLinks", JSON.stringify(links));
  };
  
  const tableGroupsForModal = useMemo(() => {
    const groups = {};
    
    completedOrders.forEach(order => {
      const tableId = order.tableId;
      if (!tableId) return;
      
      const productKey = `${tableId}_${order.name}_${order.price}`;
      
      if (!groups[productKey]) {
        groups[productKey] = {
          id: productKey,
          tableNumber: tableId,
          tableObjectId: order.tableObjectId,
          name: order.name,
          price: order.price,
          quantity: 0,
          orders: [],
          total: 0
        };
      }
      
      groups[productKey].quantity++;
      groups[productKey].orders.push(order);
      groups[productKey].total += order.price;
    });
    
    const tablesMap = {};
    Object.values(groups).forEach(group => {
      const tableId = group.tableNumber;
      if (!tablesMap[tableId]) {
        tablesMap[tableId] = {
          id: tableId,
          tableNumber: tableId,
          tableObjectId: group.tableObjectId,
          items: [],
          total: 0,
          orderCount: 0
        };
      }
      tablesMap[tableId].items.push(group);
      tablesMap[tableId].total += group.total;
      tablesMap[tableId].orderCount += group.quantity;
    });
    
    return Object.values(tablesMap);
  }, [completedOrders]);
  
  const selectedTable = useMemo(() => {
    return tableGroupsForModal.find(t => t.id === selectedTableId);
  }, [tableGroupsForModal, selectedTableId]);
  
  const availablePlaces = [
    { id: 1, name: "Le Café Paris", location: "Paris", type: "Café", icon: "☕" },
    { id: 2, name: "Restaurant La Mer", location: "Marseille", type: "Restaurant", icon: "🍽️" },
    { id: 3, name: "Tech Hub Lyon", location: "Lyon", type: "Bureau", icon: "💻" },
    { id: 4, name: "Startup Factory", location: "Toulouse", type: "Coworking", icon: "🚀" }
  ];
  
  const changeWorkPlace = (place) => {
    setCurrentWorkPlace(place.name);
    setWorkerStatus("working");
    localStorage.setItem("currentWorkPlace", place.name);
    localStorage.setItem("workerStatus", "working");
  };
  
  const changeWorkerStatus = (status) => {
    setWorkerStatus(status);
    if (status === "free") setCurrentWorkPlace("");
    localStorage.setItem("workerStatus", status);
    if (status === "free") localStorage.setItem("currentWorkPlace", "");
  };
  
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
    
    .checkmark-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
      z-index: 20000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease;
    }
    
    .checkmark-container {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: bounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .checkmark {
      width: 70px;
      height: 70px;
      display: block;
      stroke-width: 3;
      stroke: #22c55e;
    }
    
    .checkmark__check {
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
      animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.2s forwards;
    }
    
    @keyframes stroke {
      100% { stroke-dashoffset: 0; }
    }
    
    @keyframes bounceIn {
      0% { transform: scale(0); opacity: 0; }
      60% { transform: scale(1.2); }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
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
    
    .order-list-container {
      position: relative;
      width: 100% !important;
      max-width: 1100px !important;
      margin: 30px auto !important;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(20px);
      border-radius: 30px;
      border: 1px solid rgba(34, 197, 94, 0.3);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.2);
      transition: all 0.3s ease;
      padding: 10px;
    }
    
    .order-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 25px;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05));
      border-radius: 30px 30px 0 0;
      border-bottom: 1px solid rgba(34, 197, 94, 0.3);
    }
    
    .order-list-title {
      color: white;
      font-size: 1.3rem;
      font-weight: bold;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .order-count-badge {
      background: #22c55e;
      color: white;
      border-radius: 25px;
      padding: 4px 12px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .refresh-btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 15px;
      font-size: 0.9rem;
      transition: all 0.2s;
    }
    
    .refresh-btn:hover {
      background: rgba(34, 197, 94, 0.3);
      transform: scale(1.02);
    }
    
    .order-list-scroll {
      padding: 15px;
      transition: max-height 0.3s ease;
      max-height: 550px;
      overflow-y: auto;
    }
    
    /* ========== SCROLLBAR VERT POUR TOUTES LES LISTES ========== */
    .order-list-scroll::-webkit-scrollbar,
    .individual-orders-list::-webkit-scrollbar,
    .modal-content::-webkit-scrollbar,
    .modal-content-order::-webkit-scrollbar {
      width: 6px;
    }
    
    .order-list-scroll::-webkit-scrollbar-track,
    .individual-orders-list::-webkit-scrollbar-track,
    .modal-content::-webkit-scrollbar-track,
    .modal-content-order::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    .order-list-scroll::-webkit-scrollbar-thumb,
    .individual-orders-list::-webkit-scrollbar-thumb,
    .modal-content::-webkit-scrollbar-thumb,
    .modal-content-order::-webkit-scrollbar-thumb {
      background: #22c55e;
      border-radius: 10px;
    }
    
    .order-list-scroll::-webkit-scrollbar-thumb:hover,
    .individual-orders-list::-webkit-scrollbar-thumb:hover,
    .modal-content::-webkit-scrollbar-thumb:hover,
    .modal-content-order::-webkit-scrollbar-thumb:hover {
      background: #15803d;
    }
    
    /* Pour Firefox */
    .order-list-scroll,
    .individual-orders-list,
    .modal-content,
    .modal-content-order {
      scrollbar-color: #22c55e rgba(255, 255, 255, 0.1);
      scrollbar-width: thin;
    }
    
    .order-item {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      margin-bottom: 14px;
      transition: all 0.2s;
      border-left: 3px solid #22c55e;
      animation: slideUp 0.3s ease-out forwards;
      opacity: 0;
    }
    
    .order-item:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateX(8px);
    }
    
    .order-item.cancelled {
      border-left-color: #ef4444;
      opacity: 0.7;
    }
    
    .order-item.completed {
      border-left-color: #3b82f6;
      opacity: 0.7;
    }
    
    .order-item-content {
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .order-info {
      display: flex;
      align-items: center;
      gap: 15px;
      flex: 1;
      cursor: pointer;
    }
    
    .order-icon {
      font-size: 2rem;
    }
    
    .order-details {
      flex: 1;
    }
    
    .order-name {
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }
    
    .order-meta {
      display: flex;
      gap: 12px;
      margin-top: 6px;
      flex-wrap: wrap;
    }
    
    .order-price {
      color: #22c55e;
      font-size: 0.85rem;
      font-weight: bold;
    }
    
    .order-quantity-badge {
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
      padding: 3px 10px;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: bold;
    }
    
    .order-table-badge {
      background: rgba(34,197,94,0.2);
      color: #22c55e;
      padding: 3px 10px;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: bold;
      margin-left: 8px;
    }
    
    .order-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .order-status {
      font-size: 1.3rem;
    }
    
    .order-status.completed {
      filter: drop-shadow(0 0 3px #3b82f6);
    }
    
    .order-status.cancelled {
      filter: drop-shadow(0 0 3px #ef4444);
    }
    
    .empty-orders {
      text-align: center;
      padding: 50px 20px;
      color: rgba(255, 255, 255, 0.5);
    }
    
    .empty-icon {
      font-size: 3.5rem;
      margin-bottom: 12px;
      opacity: 0.5;
    }
    
    .empty-sub {
      font-size: 0.8rem;
      margin-top: 8px;
    }
    
    .scroll-to-top {
      position: absolute;
      bottom: 15px;
      right: 15px;
      background: #22c55e;
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.2s;
      box-shadow: 0 2px 10px rgba(34, 197, 94, 0.4);
    }
    
    .scroll-to-top:hover {
      transform: scale(1.1);
      background: #15803d;
    }
    
    .blue-list {
      border: 1px solid rgba(59,130,246,0.6);
      box-shadow: 0 0 40px rgba(59,130,246,0.3);
    }
    
    .blue-header {
      background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05));
      border-bottom: 1px solid rgba(59,130,246,0.4);
    }
    
    .order-count-badge-blue {
      background: #3b82f6;
      color: white;
      border-radius: 25px;
      padding: 4px 12px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .order-item-blue {
      border-left-color: #3b82f6;
    }
    
    .order-price-blue {
      color: #60a5fa;
    }
    
    .order-quantity-badge-blue {
      background: rgba(59,130,246,0.25);
      color: #60a5fa;
    }
    
    .order-table-badge-blue {
      background: rgba(59,130,246,0.2);
      color: #60a5fa;
    }
    
    .refresh-btn-blue {
      background: rgba(255,255,255,0.15);
    }
    
    .refresh-btn-blue:hover {
      background: rgba(59,130,246,0.4);
    }
    
    .scroll-to-top-blue {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      box-shadow: 0 3px 15px rgba(59,130,246,0.5);
    }
    
    .scroll-to-top-blue:hover {
      background: linear-gradient(135deg, #60a5fa, #3b82f6);
    }
    
    .orange-list {
      border: 1px solid rgba(245,158,11,0.6);
      box-shadow: 0 0 40px rgba(245,158,11,0.3);
    }
    
    .orange-header {
      background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05));
      border-bottom: 1px solid rgba(245,158,11,0.4);
    }
    
    .order-count-badge-orange {
      background: #f59e0b;
      color: white;
      border-radius: 25px;
      padding: 4px 12px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    
    .order-item-orange {
      border-left-color: #f59e0b;
    }
    
    .order-price-orange {
      color: #fbbf24;
    }
    
    .order-table-badge-orange {
      background: rgba(245,158,11,0.2);
      color: #fbbf24;
    }
    
    .scroll-to-top-orange {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      box-shadow: 0 3px 15px rgba(245,158,11,0.5);
    }
    
    .scroll-to-top-orange:hover {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
    }
    
    .modal-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0, 0, 0, 0.9) !important;
      backdrop-filter: blur(12px) !important;
      z-index: 10000 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      animation: fadeIn 0.3s ease !important;
    }
    
    .modal-content-order {
      background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
      border-radius: 30px;
      padding: 30px;
      border: 2px solid #22c55e;
      box-shadow: 0 0 40px rgba(34, 197, 94, 0.3);
      animation: slideUp 0.4s ease;
      position: relative !important;
      z-index: 10001 !important;
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
      box-shadow: 0 0 40px rgba(34, 197, 94, 0.3);
      animation: slideUp 0.4s ease;
      position: relative !important;
      z-index: 10001 !important;
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
    
    .order-detail-info {
      text-align: left;
      margin: 20px 0;
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 15px;
    }
    
    .order-detail-info p {
      margin: 8px 0;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .detail-label {
      font-weight: bold;
      color: #22c55e;
      display: inline-block;
      width: 110px;
    }
    
    .order-detail-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    
    .btn-livre {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-annule {
      background: linear-gradient(135deg, #ef4444, #b91c1c);
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-livre:hover, .btn-annule:hover {
      transform: scale(1.02);
      filter: brightness(1.1);
    }
    
    .status-badge-detail {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 15px;
      font-size: 0.75rem;
      margin-left: 8px;
    }
    
    .status-badge-detail.pending {
      background: #f59e0b;
      color: white;
    }
    
    .status-badge-detail.completed {
      background: #22c55e;
      color: white;
    }
    
    .status-badge-detail.cancelled {
      background: #ef4444;
      color: white;
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
    }
    
    .btn-primary:hover {
      transform: scale(1.02);
      filter: brightness(1.1);
    }
    
    .animate-slide-up {
      animation: slideUp 0.3s ease-out forwards;
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
    
    .cards-container {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-top: 40px;
      flex-wrap: wrap;
      position: relative;
      padding-bottom: 30px;
      z-index: 1;
      transition: transform 0.3s ease-in-out;
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
      box-shadow: 0 0 15px rgba(255,0,0,0.5), 0 0 8px rgba(0,255,255,0.3);
    }
    
    .cv-card {
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
      z-index: 5;
      animation: float 4s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-8px) translateX(4px); }
      75% { transform: translateY(8px) translateX(-4px); }
    }
    
    .cv-card:nth-child(1) {
      background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FF6B6B 100%);
      background-size: 200% 200%;
      box-shadow: 0 15px 35px rgba(255, 107, 107, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.4);
      animation-delay: 0s;
    }
    
    .cv-card:nth-child(1):hover {
      background-position: 100% 100%;
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 45px rgba(255, 107, 107, 0.5);
    }
    
    .cv-card:nth-child(2) {
      background: linear-gradient(135deg, #4ECDC4 0%, #556270 50%, #4ECDC4 100%);
      background-size: 200% 200%;
      box-shadow: 0 15px 35px rgba(78, 205, 196, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.4);
      animation-delay: 0.5s;
    }
    
    .cv-card:nth-child(2):hover {
      background-position: 100% 100%;
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 45px rgba(78, 205, 196, 0.5);
    }
    
    .cv-card::before {
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
    
    .cv-card:hover::before {
      opacity: 1;
      animation: shine 1.5s;
    }
    
    @keyframes shine {
      0% { transform: translate(-30%, -30%) rotate(0deg); }
      100% { transform: translate(30%, 30%) rotate(180deg); }
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
    
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    
    .status-badge {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
    }
    
    .status-working {
      background: #22c55e;
      color: white;
    }
    
    .status-free {
      background: #ef4444;
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
      transition: all 0.2s;
      border: 1px solid rgba(34,197,94,0.4);
    }
    
    .skill-tag:hover {
      background: rgba(34,197,94,0.35);
      transform: scale(1.05);
    }
    
    .btn-danger {
      background: linear-gradient(135deg, #ef4444, #b91c1c);
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .btn-danger:hover {
      transform: scale(1.02);
      filter: brightness(1.1);
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
    
    .bg-white-card {
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      border-radius: 28px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0) 50%, rgba(26,26,58,0.6) 100%);
    }
    
    .hero-image {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center 40%;
      filter: brightness(0.85) contrast(1.05);
      transition: transform 0.5s ease;
    }
    
    .hero-image:hover {
      transform: scale(1.01);
    }
    
    .workplace-text {
      font-size: 1.3rem !important;
      font-weight: 600 !important;
      color: #4ade80 !important;
      margin-top: 8px !important;
      text-shadow: 0 0 10px rgba(74, 222, 128, 0.3) !important;
    }
    
    .location-text {
      font-size: 1.1rem !important;
      font-weight: 500 !important;
      color: #a0aec0 !important;
      margin-top: 4px !important;
    }
    
    .role-text {
      font-size: 1.2rem !important;
      font-weight: 500 !important;
      color: #cbd5e1 !important;
      margin-top: 8px !important;
    }
    
    .bio-text {
      font-size: 1.05rem !important;
      line-height: 1.6 !important;
      color: #e2e8f0 !important;
      font-style: italic !important;
      max-width: 800px !important;
      margin: 0 auto !important;
      padding: 0 20px !important;
    }
    
    @media (max-width: 768px) {
      .order-list-container {
        width: 95% !important;
        margin: 15px auto !important;
      }
      .cards-container {
        flex-direction: column;
      }
      .gradient-border-box {
        width: 120px;
        height: 120px;
        margin-top: -50px;
        margin-left: 0;
      }
      .order-detail-buttons {
        flex-direction: column;
        gap: 10px;
      }
      .order-actions {
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .action-buttons {
        flex-direction: column;
        gap: 10px;
        align-items: center;
      }
      .cards-container::after {
        width: 90%;
        left: 5%;
        bottom: -10px;
      }
      .cv-card {
        min-width: 250px;
        padding: 30px 20px;
      }
      .modal-content, .modal-content-order {
        padding: 20px;
        width: 95%;
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
      
      <AdminNavbar 
        employeeInfo={workerInfo}
        onUpdateProfile={updateProfile}
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
                      <div className="profile-image-wrapper">
                        <div className="profile-glow"></div>
                        <div className="gradient-border-box">
                          <img alt={workerInfo.name} src={workerInfo.profileImage} className="content" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1"></div>
                  </div>
                  
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-white">
                      {workerInfo.name}
                      <span className={`status-badge ${workerStatus === 'working' ? 'status-working' : 'status-free'}`}>
                        {workerStatus === 'working' ? '✅ En poste' : '📢 En recherche'}
                      </span>
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
                  
                  <OrderList 
                    orders={orders} 
                    onUpdateOrderStatus={updateOrderStatus} 
                    onModalOpenChange={setIsAnyModalOpen}
                  />
                  
                  <TablesList 
                    completedOrders={completedOrders} 
                    onTableClick={(tableId) => setSelectedTableId(tableId)}
                  />
                  
                  <div className="cards-container" style={{ transform: isAnyModalOpen || selectedTableId ? 'translateY(120px)' : 'translateY(0)', transition: 'transform 0.3s ease-in-out' }}>
                    
                    <div className="cv-card" onClick={() => setShowWorkerCV(true)}>
                      <div className="text-6xl mb-4">📄</div>
                      <h3 className="text-xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Mon CV</h3>
                      <p className="text-white/90 text-sm">Découvrez mon parcours professionnel</p>
                    </div>
                    
                    <div className="cv-card" onClick={() => setShowManagerCV(true)}>
                      <div className="text-6xl mb-4">📊</div>
                      <h3 className="text-xl font-bold text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Évaluations</h3>
                      <p className="text-white/90 text-sm">Historique et retours des managers</p>
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
      
      {selectedTableId && selectedTable && (
        <TableDetailModal 
          table={selectedTable} 
          onLiberateTable={(tableId) => { liberateTable(tableId); setSelectedTableId(null); }}
          onClose={() => setSelectedTableId(null)}
        />
      )}
      
      {/* ✅ MODAL CV MODIFIÉ - مع مفتاح فريد لمنع إعادة التحميل */}
      {showWorkerCV && (
        <div className="modal-overlay" onClick={() => setShowWorkerCV(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowWorkerCV(false)} className="close-btn">✕</button>
            <CVSection 
              key={cvKey}
              workerInfo={workerInfo}
              isEditable={true}
              onSave={handleSaveCV}
            />
          </div>
        </div>
      )}
      
      {/* ✅ MODIFIÉ: canAddEvaluation=false pour lecture seule */}
      {showManagerCV && (
        <div className="modal-overlay" onClick={() => setShowManagerCV(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', width: '90%' }}>
            <button onClick={() => setShowManagerCV(false)} className="close-btn">✕</button>
            <EvaluationSection 
              workHistory={workHistory}
              onAddEvaluation={emptyUpdateFunction}
              canAddEvaluation={false}
              currentWorkPlace={currentWorkPlace}
              onStatusChange={emptyFunction}
              workerStatus={workerStatus}
              availablePlaces={availablePlaces}
              onWorkPlaceChange={emptyFunction}
            />
          </div>
        </div>
      )}
      
      {/* ✅ MODIFIÉ: canAddComment=false pour lecture seule */}
      {showCommentsList && (
        <div className="modal-overlay" onClick={() => setShowCommentsList(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowCommentsList(false)} className="close-btn">✕</button>
            <CommentSection 
              comments={comments}
              onAddComment={emptyUpdateFunction}
              canAddComment={false}
              targetName={workerInfo.name}
            />
          </div>
        </div>
      )}
      
      <SocialFooter socialLinks={socialLinks} />
      <Footer />
    </>
  );
}