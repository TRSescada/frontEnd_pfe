// src/views/pages/Services.js
import React from 'react';

export default function Services({ onBack }) {
  const services = [
    {
      id: 1,
      icon: "📦",
      title: "Gestion optimisée des commandes",
      description: "Suivi en temps réel des commandes, réduction des erreurs et des oublis. Centralisation numérique des données pour une meilleure traçabilité.",
      features: ["Commandes en salle", "Suivi en temps réel", "Historique complet"]
    },
    {
      id: 2,
      icon: "🧾",
      title: "Facturation automatique",
      description: "Automatisation du processus de facturation pour gagner du temps et éviter les erreurs de calcul.",
      features: ["Factures instantanées", "Calcul automatique", "Export des données"]
    },
    {
      id: 3,
      icon: "💬",
      title: "Communication fluide",
      description: "Coordination en temps réel entre les serveurs, les clients et la direction pour un service efficace.",
      features: ["Chat intégré", "Notifications", "Coordination salle-caisse"]
    },
    {
      id: 4,
      icon: "📱",
      title: "Menu QR Code interactif",
      description: "Les clients peuvent consulter le menu et passer commande directement depuis leur téléphone.",
      features: ["Sans contact", "Mise à jour facile", "Expérience interactive"]
    },
    {
      id: 5,
      icon: "📊",
      title: "Tableau de bord analytics",
      description: "Visualisation des performances du restaurant avec des données précises et actualisées.",
      features: ["Statistiques en direct", "Rapports détaillés", "Indicateurs de performance"]
    },
    {
      id: 6,
      icon: "🔧",
      title: "Support technique local",
      description: "Une équipe tunisienne à votre écoute pour une assistance rapide et efficace.",
      features: ["Support 24/7", "Formation incluse", "Maintenance régulière"]
    }
  ];

  const benefits = [
    { icon: "⏱️", text: "Gain de temps" },
    { icon: "✅", text: "Réduction des erreurs" },
    { icon: "😊", text: "Expérience client améliorée" },
    { icon: "📊", text: "Meilleure traçabilité" },
    { icon: "💬", text: "Communication fluide" },
    { icon: "📱", text: "Menu QR Code" }
  ];

  return (
    <div className="services-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .services-page {
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .btn-retour {
          background: rgba(255,255,255,0.1);
          border: none;
          padding: 10px 25px;
          border-radius: 30px;
          color: white;
          cursor: pointer;
          margin-bottom: 30px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          transition: all 0.3s;
        }

        .btn-retour:hover {
          background: rgba(255,255,255,0.2);
          transform: translateX(-3px);
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header h1 {
          font-size: 2.5rem;
          color: #22c55e;
          margin-bottom: 15px;
        }

        .header p {
          color: #ffffff;
          opacity: 0.85;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .service-card {
          background: rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 30px;
          transition: all 0.3s ease;
          border: 1px solid rgba(34,197,94,0.2);
          text-align: center;
        }

        .service-card:hover {
          transform: translateY(-5px);
          border-color: #22c55e;
          box-shadow: 0 10px 30px rgba(34,197,94,0.15);
        }

        .service-icon {
          font-size: 3.5rem;
          margin-bottom: 20px;
        }

        .service-title {
          font-size: 1.4rem;
          color: #22c55e;
          margin-bottom: 15px;
        }

        .service-description {
          color: #ffffff;
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .service-features {
          list-style: none;
          padding: 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 15px;
        }

        .service-features li {
          padding: 6px 0;
          color: #ffffff;
          opacity: 0.7;
          font-size: 0.9rem;
        }

        .service-features li:before {
          content: "✓ ";
          color: #22c55e;
          font-weight: bold;
        }

        .benefits-section {
          background: rgba(34,197,94,0.1);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
        }

        .benefits-section h2 {
          color: #22c55e;
          margin-bottom: 30px;
          font-size: 1.8rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }

        .benefit-item {
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 16px;
          transition: all 0.3s;
        }

        .benefit-item:hover {
          background: rgba(34,197,94,0.15);
          transform: scale(1.05);
        }

        .benefit-item span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 10px;
        }

        .benefit-item p {
          color: #ffffff;
          font-weight: bold;
        }
      `}</style>

      <div className="container">
        <button className="btn-retour" onClick={onBack}>
          ← Retour
        </button>

        <div className="header">
          <h1>✨ Nos Services</h1>
          <p>Des solutions complètes pour moderniser votre restaurant et améliorer l'expérience client</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="benefits-section">
          <h2>🏆 Les bénéfices de RestoSmart</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-item">
                <span>{benefit.icon}</span>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}