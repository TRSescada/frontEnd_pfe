import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// components
import Navbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footers/Footer.js";

// Import des 4 pages
import APropos from "./pages/APropos";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import Projet from "./pages/Projet";

export default function Landing() {
  const texts = [
     "Ciao" ,"Salut", "Hola", "こんにちは", "你好", "안녕하세요", "नमस्ते", "Hello"
  ];

  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [hoveredPosition, setHoveredPosition] = useState(null);
  
  // États pour afficher les pages
  const [currentPage, setCurrentPage] = useState(null); // null = afficher le contenu normal

  const timeoutRef = useRef(null);
  const containerRef = useRef(null);
  const greenLineRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnyHovered) {
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isAnyHovered]);

  useEffect(() => {
    const update = () => {
      const navbar = document.querySelector("nav");
      if (navbar) setNavbarHeight(navbar.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const images = [
    {
      id: 1,
      position: "left",
      url: "https://kinsta.com/fr/wp-content/uploads/sites/4/2019/03/code-qr-kinsta.png",
      title: "Code QR",
      icon: "📱",
      description: "Une façon intelligente de passer commande sans attendre le serveur",
      fullDescription: "Le client scanne le code QR sur la table, ce qui ouvre le menu numérique directement sur son téléphone. Il choisit ses plats préférés et les ajoute au panier en toute simplicité, puis envoie la commande directement à la cuisine.",
      features: ["⚡ Scan rapide en une seconde", "📱 Menu interactif", "🚀 Envoi direct en cuisine"],
      explainText: "📱 **Scan du Code QR** | En scannant le code QR sur la table, le menu numérique s'ouvre directement sur votre téléphone. Parcourez tous les plats avec leurs photos et prix, ajoutez ce que vous souhaitez au panier, puis envoyez la commande en un clic à la cuisine. Une expérience rapide et fluide sans attendre le serveur ! ✨"
    },
    {
      id: 2,
      position: "center",
      url: "https://png.pngtree.com/thumb_back/fw800/background/20220213/pngtree-smiling-waiter-serving-coffee-with-pleasure-at-the-counter-photo-image_29446900.jpg",
      title: "Le Serveur",
      icon: "👨‍🍳",
      description: "Gestion efficace et rapide des commandes",
      fullDescription: "Le serveur reçoit les commandes directement sur sa tablette, avec les détails de chaque commande : nom du plat, quantité, remarques spéciales. L'emplacement de la table est précisément identifié et le prix de chaque commande s'affiche instantanément.",
      features: ["📍 Localisation précise de la table", "💰 Affichage instantané des prix", "📝 Remarques pour le chef"],
      explainText: "👨‍🍳 **Gestion Intelligente des Commandes** | Le serveur reçoit toutes les commandes instantanément sur sa tablette avec des détails précis : numéro de table, plats commandés, quantités et remarques spéciales pour le chef. Il peut suivre l'état de chaque commande et la mettre à jour en temps réel pour garantir un service rapide et précis."
    },
    {
      id: 3,
      position: "right",
      url: "https://png.pngtree.com/thumb_back/fw800/background/20221004/pngtree-closeup-of-100dollar-bill-with-inflation-and-economy-concept-photo-image_48961572.jpg",
      title: "Facture Intelligente",
      icon: "💰",
      description: "Calcul automatique et précis du total",
      fullDescription: "Le système calcule automatiquement le total des commandes avec la taxe, et affiche les détails de chaque article et son prix. Le client peut payer la facture électroniquement via l'application ou demander une facture papier.",
      features: ["🧮 Calcul du total avec taxe", "📊 Détails de chaque article", "💳 Paiement électronique sécurisé"],
      explainText: "💰 **Facture Précise et Rapide** | Le système calcule automatiquement le total des commandes en ajoutant la taxe, et affiche clairement les détails de chaque article et son prix. Le client peut payer la facture électroniquement via l'application de manière sécurisée, ou demander une facture papier au serveur. Transparence totale et rapidité d'exécution !"
    }
  ];

  const handleMouseEnter = (id, position) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredId(id);
    setHoveredPosition(position);
    setIsAnyHovered(true);

    const container = containerRef.current;
    if (!container) return;
    const items = container.children;

    if (position === "left") {
      items[0].style.flex = "0 1 50%";
      items[1].style.flex = "0 0 25%";
      items[2].style.flex = "0 0 25%";
      
      if (greenLineRef.current) {
        greenLineRef.current.style.width = "33.33%";
        greenLineRef.current.style.transform = "translateX(0%)";
        greenLineRef.current.style.opacity = "1";
      }
    } else if (position === "center") {
      items[0].style.flex = "0 0 20%";
      items[1].style.flex = "0 1 60%";
      items[2].style.flex = "0 0 20%";
      
      if (greenLineRef.current) {
        greenLineRef.current.style.width = "33.33%";
        greenLineRef.current.style.transform = "translateX(100%)";
        greenLineRef.current.style.opacity = "1";
      }
    } else {
      items[0].style.flex = "0 0 25%";
      items[1].style.flex = "0 0 25%";
      items[2].style.flex = "0 1 50%";
      
      if (greenLineRef.current) {
        greenLineRef.current.style.width = "33.33%";
        greenLineRef.current.style.transform = "translateX(200%)";
        greenLineRef.current.style.opacity = "1";
      }
    }

    if (items[0]) items[0].style.zIndex = position === "left" ? "10" : "1";
    if (items[1]) items[1].style.zIndex = position === "center" ? "10" : "1";
    if (items[2]) items[2].style.zIndex = position === "right" ? "10" : "1";
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredId(null);
      setHoveredPosition(null);
      setIsAnyHovered(false);
      const container = containerRef.current;
      if (!container) return;
      for (let item of container.children) {
        item.style.flex = "1";
        item.style.zIndex = "1";
      }
      
      if (greenLineRef.current) {
        greenLineRef.current.style.opacity = "0";
      }
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  // Fonction pour naviguer vers une page
  const goToPage = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0);
  };

  // Fonction pour revenir à l'accueil
  const goBackToHome = () => {
    setCurrentPage(null);
  };

  const glassStyle = `
    .glass-container {
      position: relative;
      width: 90%;
      max-width: 900px;
      padding: 40px 50px;
      border-radius: 20px;
      backdrop-filter: blur(15px);
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4);
      z-index: 10;
      overflow: hidden;
      margin: 0 auto;
      transition: all 0.3s ease;
    }
    
    .glass-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transform: skewX(-15deg);
      transition: 0.6s ease;
      pointer-events: none;
    }
    
    .glass-container:hover::before {
      left: 120%;
    }
    
    @media (max-width: 768px) {
      .glass-container {
        padding: 30px 25px;
        width: 95%;
      }
    }
  `;

  const morphingStyle = `
    .morphing-bg {
      width: 100%;
      max-width: 1100px;
      min-height: 420px;
      background: linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ad);
      background-size: 400% 400%;
      animation: gradient 8s ease infinite, morph 8s ease-in-out infinite;
      border-radius: 30px;
      transform-style: preserve-3d;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      border: 2px solid rgba(255,255,255,0.2);
      margin: 0 auto;
      padding: 90px 20px 30px 20px;
      position: relative;
      margin-top: 90px;
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes morph {
      0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }
    
    .image-wrapper {
      position: absolute;
      top: -90px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
    }
    
    .image-wrapper img {
      display: block;
      margin: 0 auto;
    }
    
    @media (max-width: 768px) {
      .morphing-bg {
        min-height: 500px;
        border-radius: 20px;
        padding: 75px 15px 25px 15px;
        margin-top: 75px;
      }
      
      .image-wrapper {
        top: -75px;
      }
    }
  `;

  const profileImageUrl = "https://scontent.fnbe1-2.fna.fbcdn.net/v/t39.30808-1/570088560_1892287584661197_1770332595867547250_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=1d2534&_nc_ohc=OQu7a7orcOcQ7kNvwG-Bvy2&_nc_oc=Ado1rWj0oZUuJ1xwLhnZipoOsoroO7YP5CLfCaPrrzIlMMd9raMY3pH8epYVCjffS9U&_nc_zt=24&_nc_ht=scontent.fnbe1-2.fna&_nc_gid=KWCq_RjBxXrez9bDcFk4nA&_nc_ss=7b2a8&oh=00_Af6ysqD_KcDPEcKcl8Ahd01uliN3F4-xkB1V2gYrWr7S_A&oe=6A14F956";

  const cards = [
    {
      id: 1,
      title: "À propos",
      icon: "👤",
      description: "Découvrez mon parcours et mes compétences",
      bgColor: "#ee7752",
      hoverColor: "#f28f6b",
      textColor: "#ffffff",
      page: "apropos"
    },
    {
      id: 2,
      title: "Blog",
      icon: "📝",
      description: "Articles et tutoriels récents",
      bgColor: "#e73c7e",
      hoverColor: "#ec5a95",
      textColor: "#ffffff",
      page: "blog"
    },
    {
      id: 3,
      title: "Services",
      icon: "⚙️",
      description: "Ce que je peux vous offrir",
      bgColor: "#23a6d5",
      hoverColor: "#3eb8e3",
      textColor: "#ffffff",
      page: "services"
    },
    {
      id: 4,
      title: "Projet",
      icon: "🚀",
      description: "Mes réalisations et travaux",
      bgColor: "#23d5ad",
      hoverColor: "#3ee2bd",
      textColor: "#ffffff",
      page: "projet"
    }
  ];

  // Si une page est sélectionnée, on l'affiche
  if (currentPage === "apropos") {
    return <APropos onBack={goBackToHome} />;
  }
  if (currentPage === "blog") {
    return <Blog onBack={goBackToHome} />;
  }
  if (currentPage === "services") {
    return <Services onBack={goBackToHome} />;
  }
  if (currentPage === "projet") {
    return <Projet onBack={goBackToHome} />;
  }

  // Sinon, afficher la page d'accueil normale
  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
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
          
          @keyframes shoot {
            0% {
              transform: translateX(0) translateY(0) rotate(45deg);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            100% {
              transform: translateX(-300px) translateY(300px) rotate(45deg);
              opacity: 0;
            }
          }
          
          .star {
            position: absolute;
            background: white;
            border-radius: 50%;
            opacity: 0.6;
            animation: twinkle 3s ease-in-out infinite;
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          .hero-section {
            position: relative;
            background: linear-gradient(135deg, #0a0a2a, #1a1a3a, #0d0d2b, #0f0c29, #1a1a4a);
            background-size: 400% 400%;
            animation: gradientShift 12s ease infinite;
          }
          
          .glass-cards-wrapper {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
            border-radius: 32px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            padding: 30px 24px;
            margin: 20px auto;
            transition: all 0.3s ease;
          }
          
          .glass-cards-wrapper:hover {
            background: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.3);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
          }
          
          .cards-container {
            padding: 0;
            margin: 0 auto;
            max-width: 1200px;
          }
          
          .card-item {
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            cursor: pointer;
            border-radius: 20px;
            padding: 30px 20px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            background: transparent;
          }
          
          .card-item:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          }
          
          .card-icon {
            font-size: 52px;
            display: inline-block;
            margin-bottom: 15px;
            transition: transform 0.3s ease;
          }
          
          .card-item:hover .card-icon {
            transform: scale(1.1);
          }
          
          .card-title {
            font-size: 1.6rem;
            font-weight: bold;
            margin-bottom: 12px;
            color: #ffffff;
          }
          
          .card-description {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.85);
            line-height: 1.5;
          }
          
          .card-link {
            display: inline-block;
            margin-top: 15px;
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.7);
            transition: opacity 0.3s ease;
            text-decoration: underline;
          }
          
          .card-item:hover .card-link {
            opacity: 1;
            color: rgba(255, 255, 255, 1);
          }
          
          .cards-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
          }
          
          @media (min-width: 768px) {
            .cards-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 24px;
            }
          }
          
          @media (min-width: 1024px) {
            .cards-grid {
              grid-template-columns: repeat(4, 1fr);
              gap: 28px;
            }
          }
          
          .image-slide {
            position: relative;
            overflow: hidden;
            cursor: pointer;
            border-radius: 24px;
            margin: 12px;
            border: 3px solid #22c55e;
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
            transition: all 0.3s ease;
          }
          
          .image-slide:hover {
            border-color: #4ade80;
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
            transform: scale(1.02);
          }
          
          .image-slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .image-slide:hover img {
            transform: scale(1.05);
          }
        `}
      </style>
      
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51CK+w+/U6swU2Im1vVX0SVK9ABhg=="
        crossOrigin="anonymous" 
        referrerPolicy="no-referrer"
      />
      
      <Navbar transparent />
      
      <div className="hero-section" style={{ position: 'relative', minHeight: '100vh' }}>
        <div className="shooting-stars">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
          
          {[...Array(8)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="shooting-star"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 40}%`,
                width: `${Math.random() * 60 + 40}px`,
                height: '2px',
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 2 + 1.5}s`,
                transform: `rotate(${Math.random() * 60 + 30}deg)`,
                background: `linear-gradient(90deg, 
                  rgba(255,255,255,1) 0%, 
                  rgba(255,255,150,0.8) 30%,
                  rgba(255,255,255,0) 100%)`
              }}
            />
          ))}
        </div>
        
        <main style={{ position: 'relative', zIndex: 10 }}>
          <div 
            className="relative flex content-center items-center justify-center"
            style={{ paddingTop: `${navbarHeight}px`, minHeight: "100vh" }}
          >
            <div className="absolute top-0 w-full h-full z-10" style={{ paddingTop: `${navbarHeight}px` }}>
              <ul 
                ref={containerRef}
                className="w-full h-full flex m-0 p-0" 
                style={{ listStyle: "none" }}
              >
                {images.map((image, idx) => (
                  <li
                    key={image.id}
                    className="image-slide"
                    style={{
                      flex: 1,
                      transition: "flex 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      margin: "10px",
                      willChange: "flex",
                      background: "transparent",
                    }}
                    onClick={() => openModal(image)}
                    onMouseEnter={() => handleMouseEnter(image.id, image.position)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="absolute transition-all duration-500"
                      style={{
                        top: hoveredId === image.id ? "20px" : "50%",
                        right: hoveredId === image.id ? "20px" : "auto",
                        left: hoveredId === image.id ? "auto" : "50%",
                        transform: hoveredId === image.id ? "translate(0, 0)" : "translate(-50%, -50%)",
                        width: hoveredId === image.id ? "80px" : "100%",
                        height: hoveredId === image.id ? "80px" : "100%",
                        objectFit: hoveredId === image.id ? "contain" : "cover",
                        borderRadius: hoveredId === image.id ? "12px" : "16px",
                        boxShadow: hoveredId === image.id ? "0 0 20px rgba(34, 197, 94, 0.5)" : "none",
                        zIndex: hoveredId === image.id ? 20 : 1,
                      }}
                    />
                    
                    <div 
                      className="absolute inset-0 transition-all duration-500 flex items-center justify-center"
                      style={{
                        opacity: hoveredId === image.id ? 1 : 0,
                        visibility: hoveredId === image.id ? "visible" : "hidden",
                        transition: "all 0.5s ease",
                      }}
                    >
                      <style>{glassStyle}</style>
                      <div className="glass-container">
                        <div className="text-center">
                          <span className="text-7xl md:text-8xl drop-shadow-lg block mb-5">{image.icon}</span>
                          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-5" style={{
                            textShadow: "0 2px 15px rgba(0,0,0,0.5)",
                            background: "linear-gradient(135deg, #22c55e, #ffffff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            letterSpacing: "1px"
                          }}>
                            {image.title}
                          </h2>
                          <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed" style={{
                            textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                            lineHeight: "1.5",
                            fontWeight: "500"
                          }}>
                            {image.explainText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div 
              className="container relative mx-auto transition-all duration-500"
              style={{
                opacity: isAnyHovered ? 0 : 1,
                visibility: isAnyHovered ? "hidden" : "visible",
                transform: isAnyHovered ? "scale(0.95)" : "scale(1)",
                zIndex: 50
              }}
            >
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1
                      key={texts[index]}
                      className="text-white font-bold text-5xl md:text-6xl transition-all duration-500 mb-6"
                      style={{
                        textShadow: "0 0 30px rgba(34, 197, 94, 0.5), 0 0 60px rgba(34, 197, 94, 0.3)",
                        background: "linear-gradient(135deg, #ffffff 0%, #22c55e 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      {texts[index]}
                    </h1>
                    <div className="mt-6 flex justify-center gap-4">
                      <div className="w-12 h-1 bg-green-500 rounded-full"></div>
                      <div className="w-12 h-1 bg-gray-500 rounded-full"></div>
                      <div className="w-12 h-1 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-4 bg-transparent">
            <div className="relative w-full px-4">
              <div 
                className="w-full h-2 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #1e3a5f, #3b82f6, #1e3a5f)",
                  boxShadow: "0 0 8px rgba(59,130,246,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              ></div>
              
              <div 
                ref={greenLineRef}
                className="absolute top-0 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: "33.33%",
                  left: "0%",
                  transform: "translateX(0%)",
                  background: "linear-gradient(90deg, #22c55e, #15803d, #22c55e)",
                  boxShadow: "0 0 12px rgba(34,197,94,0.8), 0 0 20px rgba(34,197,94,0.4)",
                  opacity: 0,
                  transition: "transform 0.5s ease-in-out, opacity 0.3s ease",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  width: "calc(33.33% - 2rem)",
                }}
              ></div>
            </div>
          </div>

          <div className="relative w-full py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-center items-center">
                <style>{morphingStyle}</style>
                
                <div className="morphing-bg relative">
                  <div className="image-wrapper">
                    <img 
                      src={profileImageUrl}
                      alt="Yassin Abdelkader"
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/144x144?text=Yassin";
                      }}
                    />
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="w-full text-white text-center px-4 mt-10">
                      <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-green-400 to-white bg-clip-text text-transparent">
                        Yassin Abdelkader
                      </h1>
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
                          <span className="font-semibold text-md text-green-400">🎓 Formation:</span>
                          <span className="text-gray-200 text-sm md:text-base">ISG - Institut Supérieur de Gestion</span>
                        </div>
                        
                        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
                          <span className="font-semibold text-md text-green-400">💻 Filière:</span>
                          <span className="text-gray-200 text-sm md:text-base">Informatique Appliquée à la Gestion (IAG)</span>
                        </div>
                        
                        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
                          <span className="font-semibold text-md text-green-400">📌 Projet:</span>
                          <span className="text-gray-200 text-sm md:text-base">Projet de Fin d'Études - Soutenance</span>
                        </div>
                      </div>

                      <div className="mt-4 px-3">
                        <p className="text-xs md:text-sm leading-relaxed text-gray-100 max-w-2xl mx-auto">
                          <span className="text-green-400 font-bold">✨</span> Ce projet représente mon travail de fin d'études en 
                          <span className="text-green-400 font-semibold"> Informatique Appliquée à la Gestion</span>. 
                          Il illustre les compétences acquises durant ma formation à l'<span className="text-green-400 font-semibold">ISG</span>, 
                          alliant les technologies modernes et les besoins de gestion d'entreprise.
                          <span className="text-green-400 font-bold"> ✨</span>
                        </p>
                      </div>
                      
                      <div className="mt-3 flex justify-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                          🚀 Full Stack
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                          📊 Gestion
                        </span>
                        <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                          💡 Innovation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* المربعات الأربعة */}
          <div className="container mx-auto px-4 pb-20">
            <div className="glass-cards-wrapper">
              <div className="cards-container">
                <div className="cards-grid">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="card-item"
                      style={{
                        backgroundColor: card.bgColor,
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = card.hoverColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = card.bgColor;
                      }}
                      onClick={() => goToPage(card.page)}
                    >
                      <div className="card-icon">{card.icon}</div>
                      <h3 className="card-title">{card.title}</h3>
                      <p className="card-description">{card.description}</p>
                      <div className="card-link">
                        En savoir plus →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-95 backdrop-blur-md transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-100 border border-green-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-400"></div>
            
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 hover:bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-green-500/50"
            >
              ✕
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gradient-to-br from-gray-800 to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/10"></div>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-64 md:h-full object-cover relative z-10"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{selectedImage.icon}</span>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    {selectedImage.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedImage.fullDescription}
                </p>
                <div className="space-y-3 mb-8">
                  {selectedImage.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-200 group">
                      <span className="text-green-500 text-lg group-hover:scale-110 transition-transform">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-green-500/30 pt-4">
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <span className="animate-pulse">✨</span>
                    Système de gestion intelligent
                    <span className="animate-pulse">✨</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}