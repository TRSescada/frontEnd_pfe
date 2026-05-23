import React from "react";

export default function Footer() {
  return (
    <>
      <style>
        {`
          .custom-footer {
            background: linear-gradient(135deg, #000000, #1a1a1a, #0a0a0a);
            padding: 30px 20px;
            margin-top: 0;
            width: 100%;
            position: relative;
            box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
          }
          
          .custom-footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #1877F2, #fd1d1d, #fffc00, #4de8f4, #25d366);
            background-size: 200% 100%;
            animation: gradient 3s ease infinite;
          }
          
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .footer-container {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-wrap: wrap;
            gap: 40px;
            margin: 0 auto;
            max-width: 700px;
          }
          
          .footer-container a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 3.5rem;
            color: var(--color);
            position: relative;
          }
          
          .footer-container a::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: var(--color);
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          
          .footer-container a:hover {
            transform: translateY(-10px) scale(1.15);
            text-shadow: 0 0 15px var(--color),
                        0 0 30px var(--color),
                        0 0 60px var(--color);
          }
          
          .footer-container a:hover::before {
            opacity: 0.2;
            transform: scale(1.3);
          }
          
          .copyright {
            text-align: center;
            margin-top: 40px;
            padding-top: 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
          }
          
          .copyright p {
            margin: 5px 0;
          }
          
          .copyright p:last-child {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.4);
          }
          
          @media (max-width: 768px) {
            .footer-container a {
              font-size: 2.5rem;
            }
            
            .footer-container {
              gap: 30px;
              max-width: 500px;
            }
            
            .custom-footer {
              padding: 20px 15px;
            }
            
            .copyright {
              margin-top: 30px;
              padding-top: 20px;
              font-size: 0.8rem;
            }
          }
          
          @media (max-width: 480px) {
            .footer-container a {
              font-size: 2rem;
            }
            
            .footer-container {
              gap: 20px;
              max-width: 350px;
            }
            
            .custom-footer {
              padding: 15px 12px;
            }
            
            .copyright {
              margin-top: 25px;
              padding-top: 15px;
              font-size: 0.7rem;
            }
          }
        `}
      </style>
      
      <footer className="custom-footer">
        <div className="footer-container">
          <a href="#" style={{ "--color": "#1877F2" }}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" style={{ "--color": "#fd1d1d" }}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" style={{ "--color": "#fffc00" }}>
            <i className="fab fa-snapchat"></i>
          </a>
          <a href="#" style={{ "--color": "#4de8f4" }}>
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="#" style={{ "--color": "#25d366" }}>
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
        
        <div className="copyright">
          <p>© 2024 Yassin Abdelkader - Tous droits réservés</p>
          <p>Système de gestion de restaurant intelligent</p>
        </div>
      </footer>
    </>
  );
}