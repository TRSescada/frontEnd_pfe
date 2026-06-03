import { useState, useEffect } from "react";
import ProductCard from "components/Common/productCard";
import { useHistory, useParams } from "react-router-dom";
import { apiGestionX } from "services/apiGestionX";
import { clientService } from "services/clientService";

export default function Menu() {
  const history = useHistory();
  const { restaurantId, tableNumber } = useParams();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textIndex, setTextIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [waiterInfo, setWaiterInfo] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [cards, setCards] = useState([]);
  const [productsByCard, setProductsByCard] = useState({});
  const [tableId, setTableId] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const backgroundImageUrl = "https://img.freepik.com/photos-premium/banniere-pour-page-menu-table-cuisine-legumes-epices-ustensiles-fond-sombre-vue-dessus-espace-libre-pour-texte_187166-66331.jpg?semt=ais_hybrid&w=740&q=80";

  const texts = ["Bienvenue", "Bonjour", "Découvrez", "Profitez"];

  const defaultIcons = ["🍽️", "🥗", "🍔", "🥤", "🍰", "💨", "🍕", "🌮", "🍜", "☕"];
  const defaultColors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#a29bfe", "#fd79a8", "#00b894", "#e17055", "#6c5ce7", "#fdcb6e"];

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

  const confirmOrder = async (productName, productId, qty, price) => {
    if (!tableId) {
      alert("Erreur : Table non trouvée");
      return;
    }
    setOrderLoading(true);
    try {
      await clientService.addToCart(tableId, productId, qty);
      const result = await clientService.createOrder(tableId, waiterInfo?.workerId || waiterInfo?._id);
      setOrderSuccess({
        orderNumber: result.orderNumber,
        productName,
        qty,
        total: qty * price
      });
      setOrderActive({ ...orderActive, [productId]: false });
      setQuantities({ ...quantities, [productId]: 1 });
    } catch (err) {
      console.error("Order error:", err);
      alert("Erreur lors de la commande. Veuillez réessayer.");
    } finally {
      setOrderLoading(false);
    }
  };

  const goToWaiterProfile = () => {
    if (waiterInfo?._id) {
      history.push(`/waiter-profile/${waiterInfo._id}`, { fromMenu: true, waiterInfo });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const tables = await apiGestionX.getTablesByRestaurant(restaurantId);
        const table = tables.find((t) => String(t.numero) === String(tableNumber));

        if (table) {
          setTableId(table._id);
        }

        if (table?.employe?.user) {
          setWaiterInfo({
            _id: table.employe.user._id,
            workerId: table.employe._id,
            nom: table.employe.user.lastName,
            prenom: table.employe.user.firstName,
            profileImage: table.employe.user.profileImage || table.employe.user.avatar,
            email: table.employe.user.email,
            phone: table.employe.user.phone,
            groupName: table.groupe?.nomgroupe || ""
          });
        } else if (table?.groupe?.employe?.user) {
          const w = table.groupe.employe.user;
          setWaiterInfo({
            _id: w._id,
            workerId: table.groupe.employe._id,
            nom: w.lastName,
            prenom: w.firstName,
            profileImage: w.profileImage || w.avatar,
            email: w.email,
            phone: w.phone,
            groupName: table.groupe?.nomgroupe || ""
          });
        } else {
          try {
            const workersData = await apiGestionX.getWorkersByRestaurant(restaurantId);
            const workers = workersData.workers || [];
            if (workers.length > 0) {
              const w = workers[0].user || {};
              setWaiterInfo({
                _id: w._id || workers[0].user?._id,
                workerId: workers[0]._id,
                nom: w.lastName,
                prenom: w.firstName,
                profileImage: w.profileImage || w.avatar,
                email: w.email,
                phone: w.phone,
                groupName: ""
              });
            }
          } catch (e) {
            // ignore - waiter info is optional
          }
        }

        const restaurant = await apiGestionX.getRestaurantById(restaurantId);
        setRestaurantName(restaurant?.name || "");

        const categories = await apiGestionX.getRestaurantCategories(restaurantId);

        const positions = [
          { top: "15%", left: "10%", rotate: -6 },
          { bottom: "15%", left: "12%", rotate: 4 },
          { top: "18%", right: "10%", rotate: -4 },
          { bottom: "18%", right: "12%", rotate: 5 },
          { top: "25%", left: "35%", rotate: -3 },
          { bottom: "25%", right: "35%", rotate: 6 },
          { top: "10%", left: "50%", rotate: -2 },
          { bottom: "10%", right: "50%", rotate: 3 }
        ];

        const cardsList = categories.map((cat, index) => ({
          id: index + 1,
          backendId: cat._id,
          name: cat.name,
          icon: cat.icon || cat.iconImage || defaultIcons[index % defaultIcons.length],
          color: cat.color || defaultColors[index % defaultColors.length],
          size: 190,
          ...positions[index % positions.length],
          image: cat.iconImage || `https://cdn-icons-png.flaticon.com/512/1998/1998626.png`
        }));

        setCards(cardsList);

        const productsMap = {};
        for (const cat of categories) {
          const catConfig = cardsList.find(c => c.backendId === cat._id);
          if (catConfig && cat.products && cat.products.length > 0) {
            productsMap[catConfig.id] = cat.products.map((p) => ({
              ...p,
              price: p.prix,
              category: { id: catConfig.id, name: catConfig.name, icon: catConfig.icon, color: catConfig.color }
            }));
          }
        }

        setProductsByCard(productsMap);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchData();
    }
  }, [restaurantId, tableNumber]);

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
    setOrderSuccess(null);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🍽️</div>
          <p style={{ color: "#22c55e", fontSize: "1.2rem" }}>Chargement du menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>❌</div>
          <p style={{ color: "#ff4444", fontSize: "1.2rem" }}>{error}</p>
        </div>
      </div>
    );
  }

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

      {!showProducts && waiterInfo && (
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
              src={waiterInfo.profileImage || "https://randomuser.me/api/portraits/men/1.jpg"}
              alt={waiterInfo.nom}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "2px solid #22c55e",
                objectFit: "cover"
              }}
            />
            <div>
              <div style={{ color: "white", fontWeight: "bold", fontSize: "0.85rem" }}>{waiterInfo.nom} {waiterInfo.prenom}</div>
              <div style={{ color: "#22c55e", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "4px" }}>
                <span>👨‍🍳</span> {waiterInfo.groupName || "Serveur"}
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
            {waiterInfo && (
              <div style={{
                marginTop: "10px",
                padding: "8px 16px",
                background: "rgba(0,0,0,0.3)",
                borderRadius: "30px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px"
              }}>
                <img src={waiterInfo.profileImage || "https://randomuser.me/api/portraits/men/1.jpg"} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                <span style={{ color: "white", fontSize: "0.8rem" }}>Votre serveur : <strong>{waiterInfo.nom} {waiterInfo.prenom}</strong></span>
              </div>
            )}
          </div>

          <div className="products-grid-container" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px"
          }}>
            {productsByCard[selectedCard.id]?.map((product) => {
              const isActive = orderActive[product._id || product.id];
              const qty = quantities[product._id || product.id] || 1;

              return (
                <div key={product._id || product.id} style={{
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
                    <button onClick={() => startOrder(product._id || product.id)} style={{
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
                        <button onClick={() => decreaseQty(product._id || product.id)} style={{
                          background: "#ff4444", border: "none", color: "white",
                          width: "35px", height: "35px", borderRadius: "50%", fontSize: "1.3rem", cursor: "pointer"
                        }}>−</button>
                        <span style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>{qty}</span>
                        <button onClick={() => increaseQty(product._id || product.id)} style={{
                          background: "#22c55e", border: "none", color: "white",
                          width: "35px", height: "35px", borderRadius: "50%", fontSize: "1.3rem", cursor: "pointer"
                        }}>+</button>
                      </div>
                      <div style={{ color: "#22c55e", fontSize: "1rem", marginBottom: "10px", textAlign: "center" }}>
                        💰 Total : {qty * product.price} DT
                      </div>
                      <button onClick={() => confirmOrder(product.name, product._id || product.id, qty, product.price)} disabled={orderLoading} style={{
                        background: orderLoading ? "#6b7280" : "#15803d",
                        border: "none",
                        color: "white",
                        padding: "8px",
                        borderRadius: "25px",
                        fontSize: "0.9rem",
                        cursor: orderLoading ? "not-allowed" : "pointer",
                        width: "100%"
                      }}>
                        {orderLoading ? "⏳ Commande..." : "✓ Confirmer"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {orderLoading && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.7)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "15px", animation: "spin 1s linear infinite" }}>⏳</div>
            <p style={{ color: "#22c55e", fontSize: "1.2rem" }}>Commande en cours...</p>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.8)", zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "center"
        }} onClick={() => setOrderSuccess(null)}>
          <div style={{
            background: "linear-gradient(135deg, #22c55e, #15803d)",
            borderRadius: "30px", padding: "40px", textAlign: "center",
            maxWidth: "400px", width: "90%",
            animation: "zoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: "4rem", marginBottom: "10px" }}>✅</div>
            <h2 style={{ color: "white", fontSize: "1.8rem", margin: "10px 0" }}>Commande confirmée !</h2>
            <div style={{ width: "60px", height: "3px", background: "white", margin: "15px auto" }}></div>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", margin: "5px 0" }}>
              {orderSuccess.qty} × {orderSuccess.productName}
            </p>
            <p style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", margin: "10px 0" }}>
              Total : {orderSuccess.total} DT
            </p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", margin: "5px 0" }}>
              Commande N° {orderSuccess.orderNumber}
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", marginTop: "15px" }}>
              👨‍🍳 {waiterInfo?.nom} {waiterInfo?.prenom} a été notifié
            </p>
            <button onClick={() => setOrderSuccess(null)} style={{
              marginTop: "20px", background: "white", color: "#15803d",
              border: "none", padding: "10px 30px", borderRadius: "25px",
              fontSize: "1rem", fontWeight: "bold", cursor: "pointer"
            }}>Fermer</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
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
          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: "15px", fontSize: "0.9rem" }}>✨ {restaurantName || "Restaurant"} ✨</p>
        </div>
      )}

      {!showProducts && (
        <div style={{
          position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)", padding: "6px 14px", borderRadius: "20px",
          color: "white", fontSize: "13px", zIndex: 30, pointerEvents: "none"
        }}>✨ Cliquez sur une carte pour commander ✨</div>
      )}

      {!showProducts && (
        <div style={{
          position: "fixed", bottom: "60px", left: "50%", transform: "translateX(-50%)",
          backgroundColor: "rgba(34,197,94,0.8)", padding: "8px 20px", borderRadius: "25px",
          color: "white", fontSize: "14px", fontWeight: "bold", zIndex: 30, pointerEvents: "none"
        }}>Table N° {tableNumber}</div>
      )}
    </div>
  );
}