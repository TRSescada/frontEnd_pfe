// src/components/Common/evaluationsection.js
import React, { useState } from "react";

export default function EvaluationSection({ 
  workHistory: initialWorkHistory,
  onAddEvaluation,
  canAddEvaluation = false,
  currentWorkPlace,
  onStatusChange,
  workerStatus,
  availablePlaces,
  onWorkPlaceChange
}) {
  const [workHistory, setWorkHistory] = useState(initialWorkHistory || []);
  const [currentRating, setCurrentRating] = useState(0);
  const [managerComment, setManagerComment] = useState("");
  const [showPlaceSelector, setShowPlaceSelector] = useState(false);

  const addManagerReview = () => {
    if (currentRating > 0 && managerComment) {
      const newHistory = {
        place: currentWorkPlace,
        role: "Employé",
        duration: new Date().toLocaleDateString('fr-FR'),
        rating: currentRating,
        review: managerComment
      };
      const updatedHistory = [newHistory, ...workHistory];
      setWorkHistory(updatedHistory);
      if (onAddEvaluation) onAddEvaluation(updatedHistory);
      setCurrentRating(0);
      setManagerComment("");
      alert("✅ Évaluation ajoutée avec succès !");
    } else {
      alert("⚠️ Veuillez sélectionner une note et ajouter un commentaire");
    }
  };

  const changeWorkPlace = (place) => {
    if (onWorkPlaceChange) onWorkPlaceChange(place);
    setShowPlaceSelector(false);
    alert(`✅ Lieu de travail changé : ${place.name}`);
  };

  const activateWorker = () => setShowPlaceSelector(true);

  const styles = `
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
    
    .work-history-item {
      background: rgba(255,255,255,0.08);
      border-radius: 15px;
      padding: 15px;
      margin-bottom: 15px;
      transition: all 0.3s;
      border-left: 4px solid #22c55e;
    }
    
    .work-history-item:hover {
      background: rgba(255,255,255,0.12);
      transform: translateX(5px);
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
    
    .place-selector {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }
    
    .place-option {
      background: rgba(34,197,94,0.15);
      padding: 12px;
      border-radius: 12px;
      cursor: pointer;
      text-align: center;
      transition: all 0.3s;
      border: 1px solid rgba(34,197,94,0.3);
    }
    
    .place-option:hover {
      background: rgba(34,197,94,0.3);
      transform: scale(1.02);
    }

    .comment-textarea {
      width: 100%;
      padding: 10px;
      border-radius: 12px;
      margin-top: 5px;
      background: rgba(0, 0, 0, 0.4);
      color: white;
      border: 1px solid rgba(34, 197, 94, 0.3);
      resize: vertical;
      font-family: inherit;
    }

    .comment-textarea:focus {
      outline: none;
      border-color: #22c55e;
      background: rgba(0, 0, 0, 0.6);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      <div>
        <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: '20px', padding: '20px', marginBottom: '20px' }}>
          <h3 className="text-lg font-bold text-white mb-3">👨‍💼 Panel Manager</h3>
          <div className="mb-3">
            <p className="text-white">📍 Lieu actuel: {currentWorkPlace || 'Non défini'}</p>
          </div>
          
          <div className="flex gap-3 flex-wrap mb-4">
            {workerStatus !== 'working' && (
              <button onClick={activateWorker} className="btn-primary">✅ Activer</button>
            )}
          </div>
          
          {showPlaceSelector && availablePlaces && (
            <div className="place-selector">
              <h4 className="text-white text-center col-span-full">Choisir un lieu:</h4>
              {availablePlaces.map(place => (
                <div key={place.id} className="place-option" onClick={() => changeWorkPlace(place)}>
                  <div className="text-2xl">{place.icon}</div>
                  <div className="text-white font-bold text-sm">{place.name}</div>
                </div>
              ))}
            </div>
          )}
          
          {canAddEvaluation && (
            <>
              <div className="mt-3">
                <label className="text-white text-sm">⭐ Note (1-5)</label>
                <div className="rating-input">
                  {[1,2,3,4,5].map(star => (
                    <span 
                      key={star} 
                      className={`rating-star ${currentRating >= star ? 'active' : ''}`}
                      onClick={() => setCurrentRating(star)}
                    >★</span>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <label className="text-white text-sm">💬 Commentaire</label>
                <textarea 
                  className="comment-textarea"
                  rows="3"
                  value={managerComment} 
                  onChange={(e) => setManagerComment(e.target.value)}
                  placeholder="Écrivez votre commentaire..."
                ></textarea>
              </div>
              <button onClick={addManagerReview} className="btn-primary w-full mt-3">
                ✅ Ajouter
              </button>
            </>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-white mb-3">📋 Historique</h3>
        {workHistory.map((work, index) => (
          <div key={index} className="work-history-item">
            <div className="flex justify-between items-center flex-wrap">
              <h4 className="text-white font-bold">{work.place}</h4>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < work.rating ? '#ffc107' : '#4a4a4a', fontSize: '16px' }}>★</span>
                ))}
              </div>
            </div>
            <p className="text-white text-sm">{work.role} • {work.duration}</p>
            <p className="text-white text-sm mt-2">"{work.review}"</p>
          </div>
        ))}
      </div>
    </>
  );
}