/// src/components/Common/productCard.js
import React from "react";

export default function ProductCard({ 
  product, 
  category, 
  isEditable = false, 
  onEdit, 
  onDelete,
  showActions = true,
  onClick 
}) {
  // صور حقيقية للمنتجات
  const productImages = {
    // Chicha
    "Chicha Pomme": "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300",
    "Chicha Raisin": "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300",
    "Chicha Menthe": "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300",
    // Plats
    "Burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
    "Pizza": "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300",
    // Boissons
    "Coca Cola": "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=300",
    "Jus d'Orange": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300",
    // Desserts
    "Gâteau": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300",
    "Glace": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300"
  };

  // صور افتراضية حسب الفئة
  const categoryDefaultImages = {
    "Chicha": "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=300",
    "Plats": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300",
    "Boissons": "https://images.unsplash.com/photo-1541529083593-d5ae85c29e8e?w=300",
    "Desserts": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300"
  };

  const getProductImage = () => {
    if (product.image && product.image !== "https://cdn-icons-png.flaticon.com/512/1046/1046784.png") {
      return product.image;
    }
    if (productImages[product.name]) {
      return productImages[product.name];
    }
    if (category && categoryDefaultImages[category.name]) {
      return categoryDefaultImages[category.name];
    }
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300";
  };

  // أيقونة المجموعة (صورة وليست ايموجي)
  const categoryIcons = {
    "Chicha": "https://cdn-icons-png.flaticon.com/512/1998/1998626.png",
    "Plats": "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    "Boissons": "https://cdn-icons-png.flaticon.com/512/1046/1046855.png",
    "Desserts": "https://cdn-icons-png.flaticon.com/512/1046/1046790.png"
  };

  return (
    <div 
      className="product-card"
      onClick={() => onClick && onClick(product)}
      style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(15px)',
        borderRadius: '25px',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(34,197,94,0.2)',
        animation: 'fadeIn 0.5s ease-out',
        position: 'relative'
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
      {/* صورة المنتج الرئيسية (صورة حقيقية) */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src={getProductImage()} 
          alt={product.name} 
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        />
        {/* شارة الفئة */}
        {category && (
          <span style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            color: 'white',
            background: category.color || '#22c55e',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            {category.icon} {category.name}
          </span>
        )}
      </div>
      
      {/* أيقونة المجموعة (صورة وليست ايموجي) */}
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        marginTop: '-30px',
        marginLeft: '20px',
        border: '3px solid #22c55e',
        background: '#1a1a3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        <img 
          src={category ? categoryIcons[category.name] : "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"} 
          alt={category?.name || "catégorie"}
          style={{
            width: '35px',
            height: '35px',
            objectFit: 'contain'
          }}
        />
      </div>
      
      {/* معلومات المنتج */}
      <div style={{ padding: '15px' }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: 'white', 
          marginBottom: '5px'
        }}>
          {product.name}
        </h3>
        
        <div style={{ 
          color: '#22c55e', 
          fontSize: '0.9rem', 
          marginBottom: '10px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px',
          fontWeight: 'bold'
        }}>
          <span>💰</span> {product.prix || product.price} DA
        </div>
        
        {product.description && (
          <p style={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '0.85rem', 
            lineHeight: '1.4', 
            marginBottom: '10px'
          }}>
            {product.description}
          </p>
        )}
        
        {/* ========== تم حذف قسم الإحصائيات (⭐ 4.8/5 و 🛒 commandes) ========== */}
        
        {/* أزرار التعديل والحذف */}
        {isEditable && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit && onEdit(product); }}
              style={{ 
                flex: 1,
                background: '#3b82f6', 
                border: 'none', 
                padding: '8px', 
                borderRadius: '15px', 
                color: 'white', 
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(59,130,246,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              ✏️ Modifier
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete && onDelete(product); }}
              style={{ 
                flex: 1,
                background: '#ef4444', 
                border: 'none', 
                padding: '8px', 
                borderRadius: '15px', 
                color: 'white', 
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(239,68,68,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              🗑️ Supprimer
            </button>
          </div>
        )}
        
        {/* زر الإجراء الرئيسي */}
        {showActions && !isEditable && (
          <div style={{ marginTop: '15px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onClick && onClick(product); }}
              style={{ 
                background: 'linear-gradient(135deg, #22c55e, #15803d)', 
                border: 'none', 
                padding: '10px', 
                borderRadius: '20px', 
                color: 'white', 
                cursor: 'pointer', 
                width: '100%',
                transition: 'all 0.2s',
                fontWeight: 'bold',
                fontSize: '0.85rem'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 5px 20px rgba(34,197,94,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              🍽️ Commander →
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}