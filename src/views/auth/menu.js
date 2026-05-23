// menu.js - نسخة معدلة
import { useState, useEffect } from "react";
import ProductCard from "components/Common/productCard";
import { useHistory } from "react-router-dom";
import { categoryService } from "services/categoryService";

export default function Menu() {
  const history = useHistory();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textIndex, setTextIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showProducts, setShowProducts] = useState(false);

  // معلومات النادل (تأتي من QR Code)
  const [waiterInfo, setWaiterInfo] = useState({
    id: 5,
    name: "Karim El Fassi",
    role: "Serveur en chef",
    profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
    location: "Casablanca, Maroc",
    rating: 4.9,
    experience: "8 ans d'expérience",
    skills: ["Service client", "Gestion des commandes", "Travail d'équipe", "Multilingue"],
    status: "active",
    email: "karim.elfassi@restaurant.com",
    phone: "+212 6 12 34 56 78",
    groupName: "Groupe 1",
    restaurantName: "Restaurant Andalous"
  });

  const backgroundImageUrl = "https://img.freepik.com/photos-premium/banniere-pour-page-menu-table-cuisine-legumes-epices-ustensiles-fond-sombre-vue-dessus-espace-libre-pour-texte_187166-66331.jpg?semt=ais_hybrid&w=740&q=80";

  const texts = ["Bienvenue", "Bonjour", "Découvrez", "Profitez"];

  const cards = [
    { id: 1, name: "Chicha", icon: "💨", color: "#ff6b6b", size: 200, top: "15%", left: "10%", rotate: -6, image: "https://cdn-icons-png.flaticon.com/512/1998/1998626.png" },
    { id: 2, name: "Plats", icon: "🍔", color: "#4ecdc4", size: 190, bottom: "15%", left: "12%", rotate: 4, image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
    { id: 3, name: "Boissons", icon: "🥤", color: "#45b7d1", size: 195, top: "18%", right: "10%", rotate: -4, image: "https://cdn-icons-png.flaticon.com/512/1046/1046855.png" },
    { id: 4, name: "Desserts", icon: "🍰", color: "#f9ca24", size: 185, bottom: "18%", right: "12%", rotate: 5, image: "https://cdn-icons-png.flaticon.com/512/1046/1046790.png" }
  ];

  const productsByCard = {
    1: [
      { id: 101, name: "Chicha Pomme", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha à la pomme fraîche - goût fruité et rafraîchissant", category: { id: 1, name: "Chicha", icon: "💨", color: "#ff6b6b" } },
      { id: 102, name: "Chicha Raisin", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha au raisin sucré - arôme naturel de raisin", category: { id: 1, name: "Chicha", icon: "💨", color: "#ff6b6b" } },
      { id: 103, name: "Chicha Menthe", price: 15, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha à la menthe rafraîchissante - sensation de fraîcheur", category: { id: 1, name: "Chicha", icon: "💨", color: "#ff6b6b" } },
      { id: 104, name: "Chicha Mangue", price: 18, image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300", description: "Chicha à la mangue exotique", category: { id: 1, name: "Chicha", icon: "💨", color: "#ff6b6b" } }
    ],
    2: [
      { id: 201, name: "Burger", price: 12, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", description: "Burger artisanal avec frites maison", category: { id: 2, name: "Plats", icon: "🍔", color: "#4ecdc4" } },
      { id: 202, name: "Pizza", price: 18, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300", description: "Pizza margherita avec mozzarella fondante", category: { id: 2, name: "Plats", icon: "🍔", color: "#4ecdc4" } },
      { id: 203, name: "Sandwich", price: 8, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", description: "Sandwich maison avec frites", category: { id: 2, name: "Plats", icon: "🍔", color: "#4ecdc4" } },
      { id: 204, name: "Salade", price: 6, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300", description: "Salade fraîche du jour", category: { id: 2, name: "Plats", icon: "🍔", color: "#4ecdc4" } }
    ],
    3: [
      { id: 301, name: "Coca Cola", price: 3, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300", description: "Coca Cola 33cl fraîchement servi", category: { id: 3, name: "Boissons", icon: "🥤", color: "#45b7d1" } },
      { id: 302, name: "Jus d'Orange", price: 5, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300", description: "Jus d'orange frais pressé", category: { id: 3, name: "Boissons", icon: "🥤", color: "#45b7d1" } },
      { id: 303, name: "Jus de Citron", price: 4, image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300", description: "Jus de citron frais", category: { id: 3, name: "Boissons", icon: "🥤", color: "#45b7d1" } },
      { id: 304, name: "Eau", price: 2, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300", description: "Eau minérale", category: { id: 3, name: "Boissons", icon: "🥤", color: "#45b7d1" } }
    ],
    4: [
      { id: 401, name: "Gâteau", price: 7, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", description: "Gâteau au chocolat fondant", category: { id: 4, name: "Desserts", icon: "🍰", color: "#f9ca24" } },
      { id: 402, name: "Glace", price: 5, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300", description: "Glace vanille avec coulis", category: { id: 4, name: "Desserts", icon: "🍰", color: "#f9ca24" } },
      { id: 403, name: "Kunafa", price: 8, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", description: "Kunafa traditionnelle", category: { id: 4, name: "Desserts", icon: "🍰", color: "#f9ca24" } },
      { id: 404, name: "Fruits", price: 6, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300", description: "Assiette de fruits frais", category: { id: 4, name: "Desserts", icon: "🍰", color: "#f9ca24" } }
    ]
  };

  const [orderActive, setOrderActive] = useState({});
  const [quantities, setQuantities] = useState({});

  const startOrder = (productId) => {
    setOrderActive({ ...orderActive, [productId]: true });
    setQuantities({ ...quantities, [productId]: 1 });
  };

  const increaseQty = (productId) => {
    setQuantities({ ...quantities, [productId]: (quantities[productId] || 1) + 1 });
  };

  const decreaseQty = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities({ ...quantities, [productId]: quantities[productId] - 1 });
    }
  };

  const confirmOrder = (productName, productId, qty, price) => {
    alert(`✅ Commande confirmée : ${qty} × ${productName}\n💰 Total : ${qty * price} DT\n👨‍🍳 Serveur : ${waiterInfo.name}`);
    setOrderActive({ ...orderActive, [productId]: false });
    setQuantities({ ...quantities, [productId]: 1 });
  };

  const goToWaiterProfile = () => {
    history.push(`/waiter-profile/${waiterInfo.id}`, { fromMenu: true, waiterInfo });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showProducts) setTextIndex((prev) => (prev + 1) % texts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [showProducts]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!showProducts) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 40,
          y: (e.clientY / window.innerHeight - 0.5) * 40
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showProducts]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowProducts(true);
  };

  const handleCloseProducts = () => {
    setShowProducts(false);
    setSelectedCard(null);
    setOrderActive({});
    setQuantities({});
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      position: "relative",
      overflow: "hidden",
      fontFamily: "sans-serif"
    }}>

      {/* كرت النادل في الأعلى */}
      {!showProducts && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 100,
          cursor: "pointer"
        }} onClick={goToWaiterProfile}>
          <div style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "60px",
            padding: "8px 16px 8px 8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid rgba(34,197,94,0.4)",
            transition: "all 0.3s",
            boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.borderColor = "#22c55e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; }}>
            <img
              src={waiterInfo.profileImage}
              alt={waiterInfo.name}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "2px solid #22c55e",
                objectFit: "cover"
              }}
            />
            <div>
              <div style={{ color: "white", fontWeight: "bold", fontSize: "0.85rem" }}>{waiterInfo.name}</div>
              <div style={{ color: "#22c55e", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "4px" }}>
                <span>👨‍🍳</span> {waiterInfo.role} • {waiterInfo.groupName}
              </div>
            </div>
          </div>
        </div>
      )}

      {showProducts && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.85)",
          zIndex: 40,
          animation: "fadeIn 0.3s ease"
        }} onClick={handleCloseProducts}></div>
      )}

      {showProducts && selectedCard && (
        <div className="products-modal-container" style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          maxWidth: "1000px",
          maxHeight: "85vh",
          background: `linear-gradient(135deg, ${selectedCard.color}, ${selectedCard.color}dd)`,
          borderRadius: "40px",
          padding: "30px",
          zIndex: 50,
          animation: "zoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          overflowY: "auto",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.3)"
        }}>

          <button onClick={handleCloseProducts} style={{
            position: "sticky",
            top: 0,
            right: 0,
            float: "right",
            background: "rgba(0,0,0,0.5)",
            border: "none",
            color: "white",
            fontSize: "22px",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 60
          }}>✕</button>

          <div style={{ textAlign: "center", marginBottom: "30px", clear: "both" }}>
            <span style={{ fontSize: "4rem" }}>{selectedCard.icon}</span>
            <h2 style={{ color: "white", fontSize: "2rem", margin: "10px 0" }}>{selectedCard.name}</h2>
            <div style={{ width: "80px", height: "3px", background: "#22c55e", margin: "10px auto" }}></div>
            <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "10px" }}>✨ Choisissez votre produit ✨</p>
            <div style={{
              marginTop: "10px",
              padding: "8px 16px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "30px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <img src={waiterInfo.profileImage} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
              <span style={{ color: "white", fontSize: "0.8rem" }}>Votre serveur : <strong>{waiterInfo.name}</strong></span>
            </div>
          </div>

          <div className="products-grid-container" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px"
          }}>
            {productsByCard[selectedCard.id]?.map((product) => {
              const isActive = orderActive[product.id];
              const qty = quantities[product.id] || 1;

              return (
                <div key={product.id} style={{
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: "25px",
                  padding: "20px",
                  transition: "0.3s"
                }}>
                  <ProductCard
                    product={product}
                    category={product.category}
                    isEditable={false}
                    showActions={false}
                  />

                  {!isActive ? (
                    <button onClick={() => startOrder(product.id)} style={{
                      background: "#22c55e",
                      border: "none",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      fontSize: "1rem",
                      cursor: "pointer",
                      width: "100%",
                      marginTop: "10px"
                    }}>
                      🛒 Commander
                    </button>
                  ) : (
                    <div style={{ marginTop: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", marginBottom: "10px" }}>
                        <button onClick={() => decreaseQty(product.id)} style={{
                          background: "#ff4444", border: "none", color: "white",
                          width: "35px", height: "35px", borderRadius: "50%", fontSize: "1.3rem", cursor: "pointer"
                        }}>−</button>
                        <span style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>{qty}</span>
                        <button onClick={() => increaseQty(product.id)} style={{
                          background: "#22c55e", border: "none", color: "white",
                          width: "35px", height: "35px", borderRadius: "50%", fontSize: "1.3rem", cursor: "pointer"
                        }}>+</button>
                      </div>
                      <div style={{ color: "#22c55e", fontSize: "1rem", marginBottom: "10px", textAlign: "center" }}>
                        💰 Total : {qty * product.price} DT
                      </div>
                      <button onClick={() => confirmOrder(product.name, product.id, qty, product.price)} style={{
                        background: "#15803d",
                        border: "none",
                        color: "white",
                        padding: "8px",
                        borderRadius: "25px",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        width: "100%"
                      }}>
                        ✓ Confirmer
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        
        /* ========== SCROLLBAR VERT POUR LE MODAL DES PRODUITS ========== */
        .products-modal-container::-webkit-scrollbar {
          width: 8px;
        }
        
        .products-modal-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        
        .products-modal-container::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 10px;
        }
        
        .products-modal-container::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
        
        /* Pour Firefox */
        .products-modal-container {
          scrollbar-color: #22c55e rgba(0, 0, 0, 0.3);
          scrollbar-width: thin;
        }
      `}</style>

      {!showProducts && cards.map((card) => (
        <div key={card.id} onClick={() => handleCardClick(card)} style={{
          position: "fixed", top: card.top, left: card.left, right: card.right, bottom: card.bottom,
          transform: `translate(${mousePosition.x * (card.id % 2 === 0 ? 0.6 : -0.5)}px, ${mousePosition.y * (card.id % 2 === 0 ? -0.5 : 0.6)}px) rotate(${card.rotate}deg)`,
          transition: "transform 0.2s ease-out", zIndex: 15, cursor: "pointer"
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`,
            width: `${card.size}px`, padding: "30px 18px", borderRadius: "40px", textAlign: "center",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.3)", transition: "all 0.3s"
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = `scale(1.1) rotate(${card.rotate + 8}deg)`; e.currentTarget.style.border = "2px solid #22c55e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; e.currentTarget.style.border = "2px solid rgba(255,255,255,0.3)"; }}>
            <img src={card.image} alt={card.name} style={{ width: "85px", height: "85px", marginBottom: "12px", filter: "drop-shadow(2px 4px 10px black)" }} />
            <h3 style={{ color: "white", margin: "10px 0 5px", fontSize: "1.8rem", fontWeight: "bold" }}>{card.name}</h3>
            <span style={{ fontSize: "2.8rem" }}>{card.icon}</span>
          </div>
        </div>
      ))}

      {!showProducts && (
        <div style={{
          position: "fixed", top: "50%", left: "50%",
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
          textAlign: "center", zIndex: 25, pointerEvents: "none"
        }}>
          <h1 style={{ fontSize: "7rem", fontWeight: "900", color: "#22c55e", margin: 0, letterSpacing: "6px", textShadow: "0 0 30px rgba(34,197,94,0.8)" }}>{texts[textIndex]}</h1>
          <div style={{ width: "120px", height: "4px", background: "linear-gradient(90deg, #22c55e, #4ade80, #22c55e)", margin: "25px auto 0" }}></div>
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "15px", fontSize: "0.9rem" }}>✨ Restaurant Gourmet ✨</p>
        </div>
      )}

      {!showProducts && (
        <div style={{
          position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)", padding: "6px 14px", borderRadius: "20px",
          color: "white", fontSize: "13px", zIndex: 30, pointerEvents: "none"
        }}>✨ Cliquez sur une carte pour commander ✨</div>
      )}
    </div>
  );
}