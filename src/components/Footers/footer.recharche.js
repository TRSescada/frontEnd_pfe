// src/components/Footers/footer.recharche.js - شريط بحث ثابت في أسفل الشاشة (تصميم محسن)
import React, { useState } from "react";

export default function FooterRecharche({ type, onSearch, placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    if (type === "restaurants") {
      return "🔍 Rechercher un restaurant par nom, ville ou description...";
    }
    if (type === "employees") {
      return "🔍 Rechercher un employé par nom, métier, ville ou restaurant...";
    }
    return "🔍 Rechercher...";
  };

  const styles = `
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); }
      100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); }
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .search-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: linear-gradient(135deg, rgba(155, 45, 255, 0.98), rgba(124, 58, 237, 0.98), rgba(168, 85, 247, 0.98));
      backdrop-filter: blur(15px);
      padding: 18px 25px;
      box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideUp 0.4s ease-out;
    }
    
    .search-container {
      max-width: 650px;
      margin: 0 auto;
      position: relative;
    }
    
    .search-icon {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
      z-index: 1;
      transition: all 0.3s ease;
    }
    
    .search-input {
      width: 100%;
      padding: 14px 50px 14px 50px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 60px;
      color: white;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
      letter-spacing: 0.3px;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #e9d5ff;
      background: rgba(255, 255, 255, 0.22);
      box-shadow: 0 0 25px rgba(233, 213, 255, 0.3);
      animation: pulse 0.5s ease-out;
    }
    
    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.55);
      font-size: 0.9rem;
      font-style: italic;
    }
    
    .clear-btn {
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      font-size: 0.9rem;
      padding: 6px;
      transition: all 0.2s ease;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .clear-btn:hover {
      color: white;
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }
    
    .search-stats {
      text-align: center;
      margin-top: 10px;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      animation: fadeIn 0.3s ease;
    }
    
    .search-stats i {
      font-size: 0.65rem;
    }
    
    .search-stats .filter-badge {
      background: rgba(255, 255, 255, 0.15);
      padding: 4px 12px;
      border-radius: 30px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    
    .search-stats .clear-filter {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      font-size: 0.7rem;
      padding: 4px 8px;
      border-radius: 20px;
      transition: all 0.2s;
    }
    
    .search-stats .clear-filter:hover {
      color: white;
      background: rgba(255, 255, 255, 0.15);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .search-footer {
        padding: 12px 15px;
      }
      
      .search-input {
        padding: 11px 40px 11px 42px;
        font-size: 0.85rem;
      }
      
      .search-icon {
        left: 14px;
        font-size: 0.9rem;
      }
      
      .clear-btn {
        right: 14px;
        width: 24px;
        height: 24px;
      }
      
      .search-stats {
        font-size: 0.65rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="search-footer">
        <div className="search-container">
          <div className="search-icon">
            <i className={`fas ${isFocused ? "fa-search" : "fa-search"}`}></i>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder={getPlaceholder()}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => handleSearch("")}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="search-stats">
            <span className="filter-badge">
              <i className="fas fa-filter"></i> Filtre actif
            </span>
            <span>“{searchTerm}”</span>
            <button className="clear-filter" onClick={() => handleSearch("")}>
              <i className="fas fa-times-circle"></i> Effacer
            </button>
          </div>
        )}
      </div>
    </>
  );
}