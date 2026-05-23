// src/views/pages/Projet.js
import React from 'react';

export default function Projet({ onBack }) {
  const technologies = ["React.js", "Node.js", "Express.js", "MongoDB", "UML", "Git/GitHub"];
  
  const chapitres = [
    {
      num: 1,
      title: "Étude préalable",
      content: "Introduction du cadre du projet, analyse des besoins des utilisateurs (clients, serveurs, propriétaires) ainsi que description de la démarche à suivre tout au long du processus de développement."
    },
    {
      num: 2,
      title: "Étude conceptuelle",
      content: "Modélisation du système à travers des diagrammes UML (cas d'utilisation, classes, séquence) permettant de structurer les composants du système (commandes, factures, menus, utilisateurs)."
    },
    {
      num: 3,
      title: "Réalisation",
      content: "Présentation des outils de développement et technologies utilisées, implémentation des fonctionnalités clés et captures d'écran de l'interface."
    }
  ];

  const problematiques = [
    "Comment automatiser et centraliser la gestion des commandes pour réduire le risque d'erreurs et d'oublis ?",
    "Comment assurer un meilleur suivi des tables et des menus pour éviter la surcharge et les confusions ?",
    "Comment structurer les échanges entre les clients et les serveurs de manière transparente et en temps réel ?",
    "Comment rendre la solution accessible et facile à utiliser pour tous les employés ?",
    "Comment offrir aux clients une expérience de commande rapide et intuitive sans avoir à attendre le serveur ?"
  ];

  return (
    <div className="projet-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .projet-page {
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
          margin-bottom: 10px;
        }

        .header p {
          color: #ffffff;
          opacity: 0.8;
          font-size: 1.1rem;
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
        }

        .section h2 {
          color: #22c55e;
          margin-bottom: 20px;
          font-size: 1.6rem;
        }

        .section h3 {
          color: #22c55e;
          margin: 20px 0 10px;
        }

        .section p {
          color: #ffffff;
          opacity: 0.85;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .section ul {
          padding-left: 25px;
          color: #ffffff;
          opacity: 0.85;
        }

        .section li {
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .methodologie {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .method-card {
          background: rgba(255,255,255,0.03);
          padding: 20px;
          border-radius: 16px;
          border-left: 3px solid #22c55e;
        }

        .method-card strong {
          color: #22c55e;
        }

        .method-card {
          color: #ffffff;
          opacity: 0.85;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 20px;
        }

        .tech-item {
          background: rgba(34,197,94,0.15);
          padding: 10px 25px;
          border-radius: 40px;
          color: #22c55e;
          font-weight: bold;
          transition: all 0.3s;
        }

        .tech-item:hover {
          background: #22c55e;
          color: white;
          transform: scale(1.05);
        }

        .chapitre {
          background: rgba(34,197,94,0.08);
          padding: 20px;
          border-radius: 16px;
          margin: 15px 0;
        }

        .chapitre h4 {
          color: #22c55e;
          margin-bottom: 10px;
          font-size: 1.2rem;
        }

        .chapitre p {
          color: #ffffff;
          opacity: 0.85;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .problematique-item {
          background: rgba(255,255,255,0.03);
          padding: 15px;
          border-radius: 12px;
          border-left: 3px solid #f59e0b;
        }

        .problematique-item p {
          color: #ffffff;
          opacity: 0.85;
        }
      `}</style>

      <div className="container">
        <button className="btn-retour" onClick={onBack}>
          ← Retour
        </button>

        <div className="header">
          <h1>🚀 RestoSmart</h1>
          <p>Système intelligent de gestion de restaurant</p>
        </div>

        <div className="section">
          <h2>📌 Présentation du projet</h2>
          <p>
            <strong style={{ color: '#22c55e' }}>RestoSmart</strong> est un projet intitulé « Conception et développement d'un système de gestion de restaurant intelligent ». 
            Il s'inscrit dans le cadre du projet de fin d'études et a pour but d'approfondir les connaissances en matière de conception, 
            de langages de programmation et de travail collaboratif.
          </p>
        </div>

        <div className="section">
          <h2>❓ Problématique</h2>
          <p style={{ color: '#ffffff', opacity: 0.85 }}>
            À l'ère de l'ultra-digitalisation, les méthodes traditionnelles de gestion des commandes et de service sont limitées. 
            Les solutions actuelles ne répondent pas pleinement aux besoins des restaurateurs.
          </p>
          <div className="grid-2">
            {problematiques.map((prob, idx) => (
              <div key={idx} className="problematique-item">
                <p>{prob}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>🎯 Objectifs du projet</h2>
          <ul>
            <li>Améliorer le suivi des commandes pour éviter les erreurs et les oublis</li>
            <li>Optimiser la gestion des tables et des menus</li>
            <li>Faciliter la communication entre les différents acteurs</li>
            <li>Offrir un accès rapide et simple aux clients pour passer commande à distance</li>
            <li>Automatiser la facturation pour gagner du temps</li>
            <li>S'intégrer avec les systèmes POS existants</li>
          </ul>
        </div>

        <div className="section">
          <h2>📋 Structure du rapport</h2>
          {chapitres.map(chapitre => (
            <div key={chapitre.num} className="chapitre">
              <h4>📖 Chapitre {chapitre.num} : {chapitre.title}</h4>
              <p>{chapitre.content}</p>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>🛠️ Méthodologie de gestion</h2>
          <p style={{ color: '#ffffff', opacity: 0.85 }}>
            Pour notre projet RestoSmart, nous avons choisi une méthode <strong style={{ color: '#22c55e' }}>AGILE</strong>, plus particulièrement <strong style={{ color: '#22c55e' }}>SCRUM</strong>.
          </p>
          <div className="methodologie">
            <div className="method-card">
              <strong>Product Owner :</strong> Ahmed NEFFATI<br />
              <strong>Scrum Master :</strong> Ahmed NEFFATI<br />
              <strong>Équipe Scrum :</strong> YASSIN ABDELKADER
            </div>
            <div className="method-card">
              <strong>Outils utilisés :</strong><br />
              • Google Meet<br />
              • Git / GitHub<br />
              • Visual Studio Code<br />
              • Word
            </div>
          </div>
        </div>

        <div className="section">
          <h2>📊 Technologies utilisées</h2>
          <div className="tech-stack">
            {technologies.map((tech, idx) => (
              <span key={idx} className="tech-item">{tech}</span>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>🏆 Bénéfices attendus</h2>
          <ul>
            <li>✅ Gain de temps : Automatisation des commandes et de la facturation</li>
            <li>✅ Réduction des erreurs : Moins de risques d'oublis ou de confusion</li>
            <li>✅ Amélioration de l'expérience client : Commande rapide, menu interactif</li>
            <li>✅ Meilleure traçabilité : Historique complet des commandes et factures</li>
            <li>✅ Communication fluide : Coordination en temps réel entre la salle et la caisse</li>
          </ul>
        </div>
      </div>
    </div>
  );
}