// src/views/pages/Blog.js
import React, { useState } from 'react';

export default function Blog({ onBack }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Les défis de la gestion de restaurant à l'ère numérique",
      date: "15 Avril 2026",
      category: "Innovation",
      excerpt: "Découvrez comment les technologies numériques transforment la gestion des restaurants et les défis à relever...",
      fullContent: `À l'ère de l'ultra-digitalisation, le secteur de la restauration connaît une transformation sans précédent. Les méthodes traditionnelles de gestion des commandes et de service montrent leurs limites face aux nouvelles attentes des clients.

Les principaux défis sont :
• L'amélioration de la gestion des commandes
• L'accélération du service
• La réduction des erreurs humaines
• La garantie d'une expérience client fluide

L'automatisation et le suivi en temps réel permettent aux propriétaires de restaurants d'optimiser leurs performances et de réduire les temps d'attente.`
    },
    {
      id: 2,
      title: "Pourquoi choisir une solution tunisienne pour votre restaurant ?",
      date: "10 Avril 2026",
      category: "Témoignage",
      excerpt: "Les avantages d'une solution locale adaptée aux besoins spécifiques du marché tunisien...",
      fullContent: `Choisir une solution tunisienne comme RestoSmart présente de nombreux avantages :

✅ Adaptation aux besoins locaux : Les logiciels développés à l'étranger ne prennent pas toujours en compte les spécificités du marché tunisien.

✅ Support technique réactif : Avec une équipe locale, le support est plus rapide et plus efficace.

✅ Coût abordable : Les solutions tunisiennes sont généralement plus accessibles que les logiciels internationaux.

✅ Personnalisation : Possibilité d'adapter la solution à vos besoins spécifiques.`
    },
    {
      id: 3,
      title: "Les avantages du menu QR Code pour les restaurants",
      date: "5 Avril 2026",
      category: "Technologie",
      excerpt: "Comment le QR Code révolutionne l'expérience client en restauration...",
      fullContent: `Le menu QR Code est une innovation majeure pour le secteur de la restauration :

🔹 Commande sans contact : Les clients peuvent consulter le menu et passer commande directement depuis leur téléphone.

🔹 Gain de temps : Réduction des temps d'attente et fluidification du service.

🔹 Mise à jour facile : Modification des menus en temps réel sans réimpression.

🔹 Expérience interactive : Possibilité d'ajouter des photos, descriptions et suggestions.

🔹 Écologique : Réduction de l'utilisation du papier.`
    },
    {
      id: 4,
      title: "Comparatif des solutions de gestion de restaurant",
      date: "28 Mars 2026",
      category: "Analyse",
      excerpt: "Analyse des solutions existantes sur le marché : r_keeper, ASM POS, Merii RCM, Megasoft ERP...",
      fullContent: `Notre analyse des solutions existantes a révélé plusieurs limites :

📊 r_keeper : Coût élevé, dépendance au support technique local

📊 ASM POS : Pas de plateforme publique, clients ne peuvent pas commander directement

📊 Merii RCM : Expérience client non intégrée

📊 Megasoft ERP : Absence de menu QR Code et commande via téléphone

RestoSmart vient combler ces lacunes avec une solution complète et adaptée.`
    }
  ];

  return (
    <div className="blog-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .blog-page {
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

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .article-card {
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(34,197,94,0.2);
        }

        .article-card:hover {
          transform: translateY(-5px);
          border-color: #22c55e;
          box-shadow: 0 10px 30px rgba(34,197,94,0.2);
        }

        .category {
          color: #22c55e;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: bold;
        }

        .title {
          font-size: 1.3rem;
          color: #ffffff;
          margin: 12px 0 8px;
        }

        .date {
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem;
          margin-bottom: 15px;
        }

        .excerpt {
          color: #ffffff;
          opacity: 0.7;
          line-height: 1.5;
        }

        .read-more {
          color: #22c55e;
          margin-top: 15px;
          display: inline-block;
          font-weight: bold;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
          border-radius: 30px;
          max-width: 700px;
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          padding: 35px;
          border: 2px solid #22c55e;
          position: relative;
        }

        .close-modal {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .close-modal:hover { color: #ef4444; }

        .modal-title {
          color: #22c55e;
          margin-bottom: 15px;
          font-size: 1.8rem;
        }

        .modal-meta {
          color: rgba(255,255,255,0.5);
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .modal-body {
          color: #ffffff;
          opacity: 0.85;
          line-height: 1.8;
          white-space: pre-line;
        }
      `}</style>

      <div className="container">
        <button className="btn-retour" onClick={onBack}>
          ← Retour
        </button>

        <div className="header">
          <h1>📝 Blog RestoSmart</h1>
          <p>Actualités, conseils et innovations pour la restauration</p>
        </div>

        <div className="articles-grid">
          {articles.map(article => (
            <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
              <div className="category">{article.category}</div>
              <h3 className="title">{article.title}</h3>
              <div className="date">{article.date}</div>
              <p className="excerpt">{article.excerpt}</p>
              <span className="read-more">Lire la suite →</span>
            </div>
          ))}
        </div>

        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedArticle(null)}>✕</button>
              <h2 className="modal-title">{selectedArticle.title}</h2>
              <div className="modal-meta">{selectedArticle.date} • {selectedArticle.category}</div>
              <div className="modal-body">{selectedArticle.fullContent}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}