// src/views/pages/APropos.js
import React from 'react';

export default function APropos({ onBack }) {
  return (
    <div className="apropos-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .apropos-page {
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #ffffff;
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
          font-size: 1.2rem;
          color: #ffffff;
          opacity: 0.9;
          max-width: 800px;
          margin: 0 auto;
        }

        .logo {
          text-align: center;
          margin: 30px 0;
        }

        .logo-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(34, 197, 94, 0.5);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }

        .section {
          background: rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 30px;
          margin-bottom: 30px;
          border: 1px solid rgba(34,197,94,0.2);
          transition: all 0.3s;
        }

        .section:hover {
          border-color: #22c55e;
          transform: translateY(-3px);
        }

        .section h2 {
          color: #22c55e;
          margin-bottom: 20px;
          font-size: 1.8rem;
        }

        .section p {
          line-height: 1.8;
          color: #ffffff;
          opacity: 0.85;
          margin-bottom: 15px;
        }

        .section ul {
          list-style: none;
          padding-left: 0;
        }

        .section li {
          padding: 10px 0;
          padding-left: 30px;
          position: relative;
          color: #ffffff;
          opacity: 0.85;
        }

        .section li:before {
          content: "🍽️";
          position: absolute;
          left: 0;
        }

        .highlight {
          color: #22c55e;
          font-weight: bold;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }

        .card {
          background: rgba(255,255,255,0.03);
          padding: 20px;
          border-radius: 16px;
          border-left: 3px solid #22c55e;
        }

        .card h3 {
          color: #22c55e;
          margin-bottom: 10px;
        }

        .card p {
          color: #ffffff;
          opacity: 0.8;
        }
      `}</style>

      <div className="container">
        <button className="btn-retour" onClick={onBack}>
          ← Retour
        </button>

        <div className="header">
          <h1>À propos de RestoSmart</h1>
          <p>Une solution innovante pour la gestion intelligente des restaurants</p>
        </div>

        <div className="logo">
          <img src="/restosmart.jfif" alt="RestoSmart" className="logo-img" />
        </div>

        <div className="section">
          <h2>📌 Introduction Générale</h2>
          <p>
            Le secteur de la restauration est un pilier fondamental de l'économie mondiale, jouant un rôle crucial 
            dans la satisfaction des besoins des personnes et dans la dynamique commerciale. Il allie créativité culinaire, 
            qualité de service et expérience client, contribuant ainsi à la création d'emplois et à la stimulation 
            de l'économie locale et internationale.
          </p>
          <p>
            Cependant, ce secteur fait face à de nombreux défis majeurs, tels que l'amélioration de la gestion des commandes, 
            l'accélération du service, la réduction des erreurs humaines et la garantie d'une expérience fluide alliant 
            rapidité et qualité.
          </p>
          <p>
            Avec l'évolution rapide des technologies numériques, le recours aux systèmes informatiques avancés est devenu 
            une nécessité pour relever ces défis et moderniser le secteur de la restauration.
          </p>
        </div>

        <div className="section">
          <h2>🎯 Notre Mission</h2>
          <p>
            Notre projet vise à développer un <span className="highlight">système intelligent de gestion de restaurant</span> 
            destiné aux propriétaires d'établissements de restauration. Ce système a pour objectif d'améliorer le parcours 
            des commandes, de faciliter la communication entre les serveurs, les clients et la direction, et d'automatiser 
            le processus de facturation.
          </p>
          <p>
            Grâce à une plateforme moderne et intuitive, ce projet permettra aux utilisateurs de suivre l'activité de leur 
            restaurant avec une grande efficacité, renforçant ainsi la réactivité face aux exigences du marché et améliorant 
            la qualité du service offert.
          </p>
        </div>

        <div className="grid-2">
          <div className="card">
            <h3>🏢 Bee Coders</h3>
            <p>Société tunisienne née en 2018, spécialisée en développement web et mobile, composée d'un groupe jeune, dynamique et expérimenté.</p>
          </div>
          <div className="card">
            <h3>💡 RestoSmart</h3>
            <p>Solution 100% tunisienne pour la gestion intelligente des restaurants avec menu QR Code et facturation automatique.</p>
          </div>
        </div>

        <div className="section">
          <h2>💡 Pourquoi RestoSmart ?</h2>
          <ul>
            <li>Gestion optimisée des commandes en salle</li>
            <li>Facturation automatique</li>
            <li>Communication fluide entre les différents acteurs</li>
            <li>Menu QR Code interactif</li>
            <li>Solution 100% tunisienne</li>
            <li>Support technique local et réactif</li>
          </ul>
        </div>
      </div>
    </div>
  );
}