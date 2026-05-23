// src/components/Common/commentSection.js
import React, { useState } from "react";

export default function CommentSection({ 
  comments: initialComments, 
  onAddComment,
  canAddComment = true,
  targetName,
  isClientMode = false
}) {
  const [comments, setComments] = useState(initialComments || []);
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState({ author: "", text: "", rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addComment = () => {
    if (isSubmitting) return;
    
    if (isClientMode) {
      if (!newComment.text.trim()) {
        alert("⚠️ Veuillez entrer votre commentaire");
        return;
      }
      
      setIsSubmitting(true);
      
      const comment = {
        id: Date.now(),
        author: "Client",
        text: newComment.text.trim(),
        rating: newComment.rating,
        date: new Date().toLocaleDateString('fr-FR'),
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
      };
      
      const updatedComments = [comment, ...comments];
      setComments(updatedComments);
      if (onAddComment) onAddComment(comment);
      
      setNewComment({ author: "", text: "", rating: 5 });
      setShowAddComment(false);
      setIsSubmitting(false);
      alert("✅ Merci pour votre commentaire !");
    } else {
      if (!newComment.author.trim() || !newComment.text.trim()) {
        alert("⚠️ Veuillez entrer votre nom et votre commentaire");
        return;
      }
      
      setIsSubmitting(true);
      
      const comment = {
        id: Date.now(),
        author: newComment.author.trim(),
        text: newComment.text.trim(),
        rating: newComment.rating,
        date: new Date().toLocaleDateString('fr-FR'),
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      };
      
      const updatedComments = [comment, ...comments];
      setComments(updatedComments);
      if (onAddComment) onAddComment(updatedComments);
      
      setNewComment({ author: "", text: "", rating: 5 });
      setShowAddComment(false);
      setIsSubmitting(false);
      alert("✅ Merci pour votre commentaire !");
    }
  };

  const styles = `
    /* ========== STYLES GÉNÉRAUX ========== */
    .stars {
      display: flex;
      gap: 5px;
      justify-content: center;
      margin: 10px 0;
    }
    
    .rating-input {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 10px 0;
    }
    
    .rating-star {
      font-size: 30px;
      cursor: pointer;
      color: #4a4a4a;
      transition: all 0.2s;
    }
    
    .rating-star:hover {
      transform: scale(1.2);
    }
    
    .rating-star.active {
      color: #ffc107;
      text-shadow: 0 0 10px #ffc107;
    }
    
    /* ========== CARTE DE COMMENTAIRE ========== */
    .comment-card {
      background: rgba(255,255,255,0.08);
      border-radius: 15px;
      padding: 15px;
      margin-bottom: 15px;
      transition: all 0.3s;
      border: 1px solid rgba(78,205,196,0.3);
    }
    
    .comment-card:hover {
      background: rgba(255,255,255,0.12);
      transform: translateX(5px);
    }
    
    .comment-author {
      color: white !important;
      font-weight: bold;
    }
    
    .comment-date {
      color: rgba(255,255,255,0.5) !important;
      font-size: 0.7rem;
    }
    
    .comment-text {
      color: rgba(255,255,255,0.85) !important;
      font-size: 0.85rem;
      margin-top: 8px;
      line-height: 1.4;
    }
    
    /* ========== BOUTON PRINCIPAL ========== */
    .btn-primary {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      padding: 12px 20px;
      border-radius: 30px;
      color: white !important;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      font-size: 0.9rem;
    }
    
    .btn-primary:hover {
      transform: scale(1.02);
      filter: brightness(1.1);
    }
    
    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    /* ========== MODAL ========== */
    .modal-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0, 0, 0, 0.95) !important;
      backdrop-filter: blur(12px) !important;
      z-index: 10000 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      animation: fadeIn 0.3s ease !important;
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
      color: white !important;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .close-btn:hover {
      transform: scale(1.1);
      color: #ef4444 !important;
    }
    
    /* ========== FORMULAIRES ========== */
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-label {
      display: block;
      color: white !important;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 8px;
      margin-left: 5px;
    }
    
    .form-input {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.08);
      border: 2px solid rgba(34, 197, 94, 0.3);
      border-radius: 20px;
      color: white !important;
      font-size: 1rem;
      transition: all 0.3s ease;
      font-family: inherit;
      box-sizing: border-box;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #22c55e;
      background: rgba(255, 255, 255, 0.12);
      box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
    }
    
    .form-input::placeholder {
      color: rgba(255, 255, 255, 0.5) !important;
      font-size: 0.9rem;
    }
    
    textarea.form-input {
      resize: vertical;
      min-height: 120px;
    }
    
    /* ========== SECTION NOTE ========== */
    .rating-section {
      margin-bottom: 20px;
    }
    
    .rating-label {
      display: block;
      color: white !important;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 12px;
      margin-left: 5px;
    }
    
    .rating-stars-container {
      display: flex;
      gap: 12px;
      justify-content: center;
      padding: 10px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50px;
    }
    
    .rating-star-input {
      font-size: 32px;
      cursor: pointer;
      color: #4a4a4a;
      transition: all 0.2s ease;
    }
    
    .rating-star-input:hover {
      transform: scale(1.2);
    }
    
    .rating-star-input.active {
      color: #ffc107;
      text-shadow: 0 0 10px #ffc107;
    }
    
    /* ========== BOUTON DE SOUMISSION ========== */
    .submit-button {
      background: linear-gradient(135deg, #22c55e, #15803d);
      border: none;
      padding: 14px 24px;
      border-radius: 40px;
      color: white !important;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
    }
    
    .submit-button:hover:not(:disabled) {
      transform: scale(1.02);
      box-shadow: 0 5px 25px rgba(34, 197, 94, 0.5);
    }
    
    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    /* ========== TITRES ========== */
    .section-title {
      color: white !important;
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 15px;
      text-align: left;
    }
    
    .modal-title {
      color: white !important;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 8px;
    }
    
    .modal-subtitle {
      color: rgba(255,255,255,0.7) !important;
      font-size: 0.85rem;
    }
    
    .empty-state-title {
      color: rgba(255,255,255,0.6) !important;
      font-size: 1rem;
    }
    
    .empty-state-subtitle {
      color: rgba(255,255,255,0.4) !important;
      font-size: 0.75rem;
      margin-top: 5px;
    }
    
    /* ========== ANIMATIONS ========== */
    .spinner-small {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* ========== RESPONSIVE ========== */
    @media (max-width: 480px) {
      .modal-content {
        padding: 20px;
      }
      
      .rating-star-input {
        font-size: 28px;
      }
      
      .form-input {
        padding: 12px 14px;
        font-size: 0.9rem;
      }
      
      .submit-button {
        padding: 12px 20px;
      }
      
      .modal-title {
        font-size: 1.2rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      <div>
        <button 
          onClick={() => setShowAddComment(true)}
          className="btn-primary mb-6"
        >
          ✏️ {isClientMode ? "Ajouter un avis" : "Écrire un commentaire"}
        </button>
        
        <div className="mt-4">
          <h3 className="section-title">
            📖 Commentaires récents ({comments.length})
          </h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="flex justify-between items-start flex-wrap mb-2">
                  <div>
                    <h4 className="comment-author">{comment.author}</h4>
                    <p className="comment-date">{comment.date}</p>
                  </div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ 
                        color: i < comment.rating ? '#ffc107' : '#4a4a4a', 
                        fontSize: '16px',
                        marginLeft: '2px'
                      }}>★</span>
                    ))}
                  </div>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px' }}>
              <div className="text-5xl mb-3">💬</div>
              <p className="empty-state-title">Aucun commentaire pour le moment</p>
              <p className="empty-state-subtitle">Soyez le premier à laisser un commentaire !</p>
            </div>
          )}
        </div>
      </div>
      
      {/* مودال إضافة تعليق */}
      {showAddComment && canAddComment && (
        <div className="modal-overlay" onClick={() => setShowAddComment(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowAddComment(false)} className="close-btn">✕</button>
            
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{isClientMode ? "😊" : "✏️"}</div>
              <h2 className="modal-title">
                {isClientMode ? "Votre avis" : "Nouveau commentaire"}
              </h2>
              <p className="modal-subtitle">
                {isClientMode 
                  ? "Partagez votre expérience avec notre service" 
                  : `Partagez votre expérience avec ${targetName}`}
              </p>
            </div>
            
            {!isClientMode && (
              <div className="form-group">
                <label className="form-label">👤 Votre nom</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={newComment.author} 
                  onChange={(e) => setNewComment({...newComment, author: e.target.value})}
                  placeholder="Entrez votre nom"
                />
              </div>
            )}
            
            <div className="rating-section">
              <label className="rating-label">⭐ Votre note</label>
              <div className="rating-stars-container">
                {[1,2,3,4,5].map(star => (
                  <span 
                    key={star} 
                    className={`rating-star-input ${newComment.rating >= star ? 'active' : ''}`}
                    onClick={() => setNewComment({...newComment, rating: star})}
                  >★</span>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">💬 Votre commentaire</label>
              <textarea 
                className="form-input"
                rows="5"
                value={newComment.text} 
                onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                placeholder={isClientMode ? "Écrivez votre avis ici..." : "Écrivez votre commentaire ici..."}
              />
            </div>
            
            <button 
              onClick={addComment} 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner-small"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  📤 {isClientMode ? "Envoyer mon avis" : "Publier le commentaire"}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}