// src/components/Common/restaurantCard.js
import React from "react";

export default function RestaurantCard({ 
  restaurant, 
  isEditable = false, 
  onEdit, 
  onDelete,
  showActions = true,
  onClick 
}) {
  return (
    <div 
      className="restaurant-card"
      onClick={() => onClick && onClick(restaurant)}
      style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(15px)',
        borderRadius: '25px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(34,197,94,0.2)',
        animation: 'fadeIn 0.5s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)';
      }}
    >
      <img 
        src={restaurant.image} 
        alt={restaurant.name} 
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <img 
        src={restaurant.logo} 
        alt="logo" 
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          marginTop: '-30px',
          marginLeft: '20px',
          border: '3px solid #22c55e',
          background: '#1a1a3a',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '15px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>
          {restaurant.name}
        </h3>
        <div style={{ color: '#22c55e', fontSize: '0.8rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <i className="fas fa-map-marker-alt"></i> {restaurant.location}
        </div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: '1.4', marginBottom: '10px' }}>
          {restaurant.description?.substring(0, 80)}...
        </p>
        
        {/* ========== تم حذف قسم التقييمات (النجوم وعدد الموظفين) ========== */}
        
        {isEditable && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit && onEdit(restaurant); }}
              style={{ background: '#3b82f6', border: 'none', padding: '5px 12px', borderRadius: '15px', color: 'white', cursor: 'pointer' }}
            >
              ✏️ Modifier
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete && onDelete(restaurant); }}
              style={{ background: '#ef4444', border: 'none', padding: '5px 12px', borderRadius: '15px', color: 'white', cursor: 'pointer' }}
            >
              🗑️ Supprimer
            </button>
          </div>
        )}
        {showActions && !isEditable && (
          <div style={{ marginTop: '15px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onClick && onClick(restaurant); }}
              style={{ background: 'linear-gradient(135deg, #22c55e, #15803d)', border: 'none', padding: '8px', borderRadius: '20px', color: 'white', cursor: 'pointer', width: '100%' }}
            >
              🏪 Voir le restaurant →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}