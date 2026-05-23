// src/components/Common/cvsection.js
import React, { useState, useCallback } from "react";

// تعريف EditModal خارج المكون الرئيسي
const EditModalComponent = ({ editedInfo, onClose, onSave, newSkill, setNewSkill, addSkill, removeSkill, handleChange }) => {
  return (
    <div className="modal-overlay-cv" onClick={onClose}>
      <div className="modal-content-cv" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn">✕</button>
        <h2 className="modal-title">✏️ Modifier le CV</h2>
        
        <div className="form-group">
          <label className="form-label">👤 Nom complet</label>
          <input className="form-input" value={editedInfo?.name || ""} onChange={(e) => handleChange("name", e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">💼 Titre du poste</label>
          <input className="form-input" value={editedInfo?.role || ""} onChange={(e) => handleChange("role", e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">📧 Email</label>
          <input className="form-input" value={editedInfo?.email || ""} onChange={(e) => handleChange("email", e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">📱 Téléphone</label>
          <input className="form-input" value={editedInfo?.phone || ""} onChange={(e) => handleChange("phone", e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">📍 Localisation</label>
          <input className="form-input" value={editedInfo?.location || ""} onChange={(e) => handleChange("location", e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">📝 Bio</label>
          <textarea className="form-input" rows="3" value={editedInfo?.bio || ""} onChange={(e) => handleChange("bio", e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">🎓 Expérience</label>
          <input className="form-input" value={editedInfo?.experience || ""} onChange={(e) => handleChange("experience", e.target.value)} />
        </div>
        
        <div className="form-group">
          <label className="form-label">🌐 Langues (séparées par des virgules)</label>
          <input className="form-input" value={editedInfo?.languages?.join(", ") || ""} onChange={(e) => handleChange("languages", e.target.value.split(",").map(l => l.trim()))} />
        </div>
        
        <div className="form-group">
          <label className="form-label">💪 Compétences</label>
          <div className="skills-container">
            {editedInfo?.skills?.map((skill, i) => (
              <span key={i} className="skill-item">
                {skill}
                <button onClick={() => removeSkill(skill)} className="skill-tag-remove">✕</button>
              </span>
            ))}
          </div>
          <div className="add-skill-row">
            <input className="add-skill-input" placeholder="Ajouter une compétence..." value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }} />
            <button onClick={addSkill} className="btn-add">+ Ajouter</button>
          </div>
        </div>
        
        <button onClick={onSave} className="btn-primary">💾 Enregistrer</button>
        <button onClick={onClose} className="btn-cancel">❌ Annuler</button>
      </div>
    </div>
  );
};

export default function CVSection({ workerInfo, isEditable = false, onSave }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedInfo, setEditedInfo] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  const openModal = useCallback(() => {
    setEditedInfo({
      name: workerInfo.name,
      role: workerInfo.role,
      experience: workerInfo.experience,
      skills: [...(workerInfo.skills || [])],
      bio: workerInfo.bio,
      email: workerInfo.email,
      phone: workerInfo.phone,
      location: workerInfo.location,
      languages: [...(workerInfo.languages || [])]
    });
    setShowEditModal(true);
  }, [workerInfo]);

  const closeModal = useCallback(() => {
    setShowEditModal(false);
    setEditedInfo(null);
    setNewSkill("");
  }, []);

  const handleChange = useCallback((field, value) => {
    setEditedInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const addSkill = useCallback(() => {
    if (newSkill.trim() && editedInfo && !editedInfo.skills.includes(newSkill.trim())) {
      setEditedInfo(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  }, [newSkill, editedInfo]);

  const removeSkill = useCallback((skillToRemove) => {
    setEditedInfo(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (onSave && editedInfo) {
      onSave(editedInfo);
    }
    closeModal();
  }, [onSave, editedInfo, closeModal]);

  const styles = `
    .cv-container { text-align: center; }
    .cv-icon { font-size: 4rem; margin-bottom: 1rem; }
    .cv-name { color: white !important; font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; }
    .cv-role { color: #22c55e !important; margin-bottom: 1rem; }
    .cv-section-title { color: white !important; font-size: 1.2rem; font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.75rem; }
    .cv-text { color: rgba(255,255,255,0.85) !important; line-height: 1.5; }
    .cv-contact { color: rgba(255,255,255,0.8) !important; margin: 0.25rem 0; }
    .skill-tag { display: inline-block; padding: 5px 12px; background: rgba(34,197,94,0.2); border-radius: 20px; font-size: 12px; margin: 3px; color: #4ade80 !important; border: 1px solid rgba(34,197,94,0.4); }
    .skill-tag-remove { background: none; border: none; color: #ef4444 !important; cursor: pointer; font-size: 14px; margin-left: 6px; padding: 0; }
    .btn-primary { background: linear-gradient(135deg, #22c55e, #15803d); border: none; padding: 10px 20px; border-radius: 25px; color: white !important; font-weight: bold; cursor: pointer; width: 100%; margin-top: 10px; }
    .btn-primary:hover { transform: scale(1.02); }
    .btn-add { background: #22c55e; border: none; padding: 10px 15px; border-radius: 25px; color: white; cursor: pointer; }
    .btn-cancel { background: #6b7280; border: none; padding: 10px 20px; border-radius: 25px; color: white; cursor: pointer; width: 100%; margin-top: 10px; }
    .modal-overlay-cv {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0, 0, 0, 0.95) !important;
      backdrop-filter: blur(12px) !important;
      z-index: 20000 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .modal-content-cv {
      background: linear-gradient(135deg, #1a1a3a, #0d0d2b);
      border-radius: 30px;
      padding: 30px;
      max-width: 550px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      border: 2px solid #22c55e;
    }
    .modal-content-cv::-webkit-scrollbar { width: 6px; }
    .modal-content-cv::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 10px; }
    .modal-content-cv::-webkit-scrollbar-thumb { background: #22c55e; border-radius: 10px; }
    .close-btn { float: right; background: none; border: none; color: white; font-size: 24px; cursor: pointer; }
    .close-btn:hover { color: #ef4444; }
    .modal-title { color: white; font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 20px; }
    .form-group { margin-bottom: 15px; }
    .form-label { display: block; color: white; font-size: 0.85rem; margin-bottom: 5px; }
    .form-input { width: 100%; padding: 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 15px; color: white; font-size: 0.9rem; }
    .form-input:focus { outline: none; border-color: #22c55e; }
    textarea.form-input { resize: vertical; }
    .skills-container { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
    .skill-item { background: rgba(34,197,94,0.15); border-radius: 20px; padding: 5px 12px; color: #4ade80; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; }
    .add-skill-row { display: flex; gap: 10px; align-items: center; }
    .add-skill-input { flex: 1; padding: 10px; background: rgba(255,255,255,0.1); border: 1px solid rgba(34,197,94,0.3); border-radius: 15px; color: white; }
    @media (max-width: 480px) { .modal-content-cv { padding: 20px; } .add-skill-row { flex-direction: column; } .btn-add { width: 100%; } }
  `;

  // عرض CV (وضع القراءة)
  const CVView = () => (
    <div className="cv-container">
      <div className="cv-icon">👩‍💻</div>
      <h2 className="cv-name">{workerInfo.name}</h2>
      <p className="cv-role">{workerInfo.role}</p>
      <div className="text-left">
        <h3 className="cv-section-title">📋 Profil</h3>
        <p className="cv-text">{workerInfo.bio}</p>
        <h3 className="cv-section-title">💪 Compétences</h3>
        <div className="flex flex-wrap gap-2">
          {workerInfo.skills?.map((skill, i) => (<span key={i} className="skill-tag">{skill}</span>))}
        </div>
        <h3 className="cv-section-title">📞 Contact</h3>
        <p className="cv-contact">📧 {workerInfo.email}</p>
        <p className="cv-contact">📱 {workerInfo.phone}</p>
        <p className="cv-contact">📍 {workerInfo.location}</p>
        <h3 className="cv-section-title">🎓 Expérience</h3>
        <p className="cv-text">{workerInfo.experience}</p>
        {workerInfo.languages && workerInfo.languages.length > 0 && (
          <>
            <h3 className="cv-section-title">🌐 Langues</h3>
            <div className="flex flex-wrap gap-2">
              {workerInfo.languages.map((lang, i) => (<span key={i} className="skill-tag">{lang}</span>))}
            </div>
          </>
        )}
      </div>
      {isEditable && (
        <button onClick={openModal} className="btn-primary mt-4">✏️ Modifier CV</button>
      )}
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <CVView />
      {showEditModal && editedInfo && (
        <EditModalComponent 
          editedInfo={editedInfo}
          onClose={closeModal}
          onSave={handleSave}
          newSkill={newSkill}
          setNewSkill={setNewSkill}
          addSkill={addSkill}
          removeSkill={removeSkill}
          handleChange={handleChange}
        />
      )}
    </>
  );
}