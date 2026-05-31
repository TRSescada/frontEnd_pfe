// src/views/RegisterPage.js
import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";

export default function RegisterPage() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const maxRotate = 10;
    const rotateYValue = (mouseX / (rect.width / 2)) * maxRotate;
    const rotateXValue = (mouseY / (rect.height / 2)) * -maxRotate;
    
    setRotateY(rotateYValue);
    setRotateX(rotateXValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!firstName || firstName.trim().length < 2) {
      setFirstNameError(true);
      isValid = false;
    } else {
      setFirstNameError(false);
    }
    
    if (!lastName || lastName.trim().length < 2) {
      setLastNameError(true);
      isValid = false;
    } else {
      setLastNameError(false);
    }
    
    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }
    
    if (!password || password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }
    
    if (!phoneNumber || phoneNumber.trim().length < 8) {
      setPhoneNumberError(true);
      isValid = false;
    } else {
      setPhoneNumberError(false);
    }
    
    if (!role) {
      setRoleError(true);
      isValid = false;
    } else {
      setRoleError(false);
    }
    
    if (!acceptTerms) {
      setTermsError(true);
      isValid = false;
    } else {
      setTermsError(false);
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        const payload = {
          email,
          password,
          firstName,
          lastName,
          phone: phoneNumber,
          role: role.toUpperCase() // 'MANAGER', 'WORKER', 'OWNER'
        };
        const response = await axiosInstance.post("../auth/register", payload);
        alert(`✅ Compte créé avec succès ! Bienvenue.`);
        history.push("/auth/login");
      } catch (error) {
        const message = error.response?.data?.message || error.message || "Une erreur est survenue lors de l'inscription";
        alert(`❌ ${message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (roleError) setRoleError(false);
  };

  const handleTermsChange = (e) => {
    setAcceptTerms(e.target.checked);
    if (termsError) setTermsError(false);
  };

  return (
    <div className="register-container">
      <div className="bg-gradient"></div>
      <div className="noise-overlay"></div>
      <div className="top-glow"></div>
      <div className="bottom-glow"></div>
      <div className="glow-spot-1"></div>
      <div className="glow-spot-2"></div>

      <div className="card-wrapper">
        <div
          ref={cardRef}
          className="register-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.1s ease-out"
          }}
        >
          <div className="card-glow"></div>
          
          <div className="light-beams">
            <div className="light-beam-top"></div>
            <div className="light-beam-right"></div>
            <div className="light-beam-bottom"></div>
            <div className="light-beam-left"></div>
            <div className="corner-glow corner-tl"></div>
            <div className="corner-glow corner-tr"></div>
            <div className="corner-glow corner-br"></div>
            <div className="corner-glow corner-bl"></div>
          </div>

          <div className="card-content">
            <div className="logo-wrapper">
              <div className="logo">
                <span>S</span>
                <div className="logo-glow"></div>
              </div>
            </div>

            <h1 className="title">Join Us</h1>
            <p className="subtitle">Create your account to get started</p>

            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-group half">
                  <div className={`input-wrapper ${focusedInput === "firstName" ? "focused" : ""} ${firstNameError ? "error" : ""}`}>
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); if (firstNameError) setFirstNameError(false); }}
                      onFocus={() => setFocusedInput("firstName")}
                      onBlur={() => setFocusedInput(null)}
                      autoComplete="off"
                    />
                  </div>
                  {firstNameError && <p className="error-message">⚠️ First name is required</p>}
                </div>

                <div className="input-group half">
                  <div className={`input-wrapper ${focusedInput === "lastName" ? "focused" : ""} ${lastNameError ? "error" : ""}`}>
                    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); if (lastNameError) setLastNameError(false); }}
                      onFocus={() => setFocusedInput("lastName")}
                      onBlur={() => setFocusedInput(null)}
                      autoComplete="off"
                    />
                  </div>
                  {lastNameError && <p className="error-message">⚠️ Last name is required</p>}
                </div>
              </div>

              <div className="input-group">
                <div className={`input-wrapper ${focusedInput === "email" ? "focused" : ""} ${emailError ? "error" : ""}`}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7L12 13 2 7" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(false); }}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    autoComplete="off"
                  />
                </div>
                {emailError && <p className="error-message">⚠️ Please enter a valid email address</p>}
              </div>

              <div className="input-group">
                <div className={`input-wrapper ${focusedInput === "phoneNumber" ? "focused" : ""} ${phoneNumberError ? "error" : ""}`}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => { setPhoneNumber(e.target.value); if (phoneNumberError) setPhoneNumberError(false); }}
                    onFocus={() => setFocusedInput("phoneNumber")}
                    onBlur={() => setFocusedInput(null)}
                    autoComplete="off"
                  />
                </div>
                {phoneNumberError && <p className="error-message">⚠️ Please enter a valid phone number</p>}
              </div>

              <div className="input-group">
                <div className={`input-wrapper ${focusedInput === "password" ? "focused" : ""} ${passwordError ? "error" : ""}`}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(false); }}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    autoComplete="off"
                  />
                  <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </div>
                </div>
                {passwordError && <p className="error-message">⚠️ Password must be at least 6 characters</p>}
              </div>

              <div className="role-section">
                <label className="role-label">INSCRIVEZ-VOUS EN TANT QUE</label>
                <div className="role-buttons">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("manager")}
                    className={`role-btn ${role === "manager" ? "active" : ""}`}
                  >
                    <span>👔</span>
                    Manager
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("worker")}
                    className={`role-btn ${role === "worker" ? "active" : ""}`}
                  >
                    <span>🔧</span>
                    Worker
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("owner")}
                    className={`role-btn ${role === "owner" ? "active" : ""}`}
                  >
                    <span>👑</span>
                    Propriétaire
                  </button>
                </div>
                {roleError && <p className="error-message">⚠️ Veuillez sélectionner un rôle</p>}
              </div>

              <div className="options-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={handleTermsChange}
                  />
                  <span className="checkmark"></span>
                  <span>J'accepte la politique de confidentialité</span>
                </label>
                {termsError && <p className="error-message" style={{ marginTop: '5px', textAlign: 'center' }}>⚠️ Vous devez accepter la politique de confidentialité</p>}
              </div>

              <button type="submit" className="signin-btn" disabled={isLoading}>
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    Créer un compte
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              <p className="signup-link">
                Vous avez déjà un compte ? <Link to="/auth/login">Se connecter</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        input,
        input:focus,
        input:focus-visible,
        input:active,
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active,
        textarea,
        textarea:focus,
        textarea:focus-visible,
        button,
        button:focus,
        button:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px rgba(0, 0, 0, 0.5) inset !important;
          -webkit-text-fill-color: white !important;
          background-color: transparent !important;
          background: transparent !important;
          transition: background-color 9999s ease-in-out 0s;
        }
      `}</style>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .register-container {
          min-height: 100vh;
          width: 100%;
          background: #540887;
          position: relative;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px 20px;
        }

        .bg-gradient {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at 50% 30%, 
            #19022a 0%,
            #1c084b 30%,
            #1a0b2e 60%,
            #0a0a0a 85%,
            #050505 100%
          );
          z-index: 0;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 1;
        }

        .top-glow {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120vh;
          height: 60vh;
          border-radius: 0 0 50% 50%;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3), rgba(107, 70, 193, 0.1), transparent);
          filter: blur(80px);
          z-index: 0;
          animation: pulseGlow 8s ease-in-out infinite;
        }

        .bottom-glow {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90vh;
          height: 90vh;
          border-radius: 50% 50% 0 0;
          background: radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25), rgba(126, 34, 206, 0.1), transparent);
          filter: blur(60px);
          z-index: 0;
          animation: pulseGlowBottom 6s ease-in-out infinite;
        }

        .glow-spot-1 {
          position: fixed;
          left: 20%;
          top: 30%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15), rgba(107, 70, 193, 0.05), transparent);
          border-radius: 50%;
          filter: blur(100px);
          animation: pulse 4s ease-in-out infinite;
          z-index: 0;
        }

        .glow-spot-2 {
          position: fixed;
          right: 20%;
          bottom: 20%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.12), rgba(124, 58, 237, 0.04), transparent);
          border-radius: 50%;
          filter: blur(100px);
          animation: pulse 4s ease-in-out infinite 1s;
          z-index: 0;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(0.98); }
          50% { opacity: 0.7; transform: translateX(-50%) scale(1.02); }
        }

        @keyframes pulseGlowBottom {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(1.08); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.12); }
        }

        .card-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 550px;
          margin: 0 auto;
        }

        .register-card {
          position: relative;
          transition: transform 0.1s ease-out;
        }

        .card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 24px;
          opacity: 0;
          transition: opacity 0.7s ease;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1), transparent);
        }

        .register-card:hover .card-glow {
          opacity: 0.7;
        }

        .light-beams {
          position: absolute;
          inset: -1px;
          border-radius: 24px;
          overflow: hidden;
          pointer-events: none;
        }

        .light-beam-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 3px;
          background: linear-gradient(90deg, transparent, white, transparent);
          opacity: 0.7;
          filter: blur(2px);
          animation: beamHorizontal 2.5s ease-in-out infinite;
        }

        .light-beam-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 3px;
          height: 50%;
          background: linear-gradient(180deg, transparent, white, transparent);
          opacity: 0.7;
          filter: blur(2px);
          animation: beamVertical 2.5s ease-in-out infinite 0.6s;
        }

        .light-beam-bottom {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50%;
          height: 3px;
          background: linear-gradient(90deg, transparent, white, transparent);
          opacity: 0.7;
          filter: blur(2px);
          animation: beamHorizontal 2.5s ease-in-out infinite 1.2s;
        }

        .light-beam-left {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 3px;
          height: 50%;
          background: linear-gradient(180deg, transparent, white, transparent);
          opacity: 0.7;
          filter: blur(2px);
          animation: beamVertical 2.5s ease-in-out infinite 1.8s;
        }

        @keyframes beamHorizontal {
          0% { left: -50%; opacity: 0.3; }
          50% { left: 100%; opacity: 0.7; }
          100% { left: 200%; opacity: 0.3; }
        }

        @keyframes beamVertical {
          0% { top: -50%; opacity: 0.3; }
          50% { top: 100%; opacity: 0.7; }
          100% { top: 200%; opacity: 0.3; }
        }

        .corner-glow {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
          filter: blur(2px);
          animation: cornerPulse 2s ease-in-out infinite;
        }

        .corner-tl { top: 0; left: 0; }
        .corner-tr { top: 0; right: 0; animation-delay: 0.5s; }
        .corner-br { bottom: 0; right: 0; animation-delay: 1s; }
        .corner-bl { bottom: 0; left: 0; animation-delay: 1.5s; }

        @keyframes cornerPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.5); }
        }

        .card-content {
          position: relative;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .card-content::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px);
          background-size: 30px 30px;
          pointer-events: none;
        }

        .logo-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
        }

        .logo span {
          font-size: 20px;
          font-weight: bold;
          background: linear-gradient(180deg, white, rgba(255,255,255,0.7));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .logo-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0.5;
        }

        .title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(180deg, white, rgba(255,255,255,0.8));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 8px;
        }

        .subtitle {
          text-align: center;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 28px;
        }

        .input-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .input-group {
          margin-bottom: 16px;
          flex: 1;
        }

        .input-group.half {
          flex: 1;
          margin-bottom: 0;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .input-wrapper.focused {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
        }

        .input-wrapper.error {
          border-color: #ef4444;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          width: 16px;
          height: 16px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }

        .input-wrapper.focused .input-icon {
          color: white;
        }

        .input-wrapper input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          background: transparent;
          border: none;
          color: white;
          font-size: 14px;
          outline: none !important;
          box-shadow: none !important;
        }

        .input-wrapper input:focus,
        .input-wrapper input:focus-visible,
        .input-wrapper input:active {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }

        .input-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          cursor: pointer;
        }

        .password-toggle svg {
          width: 16px;
          height: 16px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }

        .password-toggle:hover svg {
          color: white;
        }

        .error-message {
          color: #ef4444;
          font-size: 11px;
          margin-top: 4px;
          margin-left: 4px;
        }

        .role-section {
          margin-top: 24px;
          margin-bottom: 16px;
        }

        .role-label {
          display: block;
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .role-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .role-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .role-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(139, 92, 246, 0.5);
        }

        .role-btn.active {
          background: linear-gradient(135deg, #7c3aed, #6b46c1);
          border-color: #a855f7;
          color: white;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        }

        .role-btn span {
          font-size: 16px;
        }

        .options-row {
          display: flex;
          align-items: center;
          margin: 20px 0;
          flex-direction: column;
          align-items: flex-start;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
        }

        .checkbox-label input {
          display: none;
        }

        .checkmark {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          position: relative;
          transition: all 0.2s ease;
        }

        .checkbox-label input:checked + .checkmark {
          background: #a855f7;
          border-color: #a855f7;
        }

        .checkbox-label input:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 10px;
          color: white;
        }

        .signin-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .signin-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
        }

        .signin-btn:active {
          transform: scale(0.98);
        }

        .signin-btn svg {
          width: 14px;
          height: 14px;
          transition: transform 0.3s ease;
        }

        .signin-btn:hover svg {
          transform: translateX(3px);
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .signup-link {
          text-align: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 24px;
        }

        .signup-link a {
          color: #a855f7;
          text-decoration: none;
          font-weight: 500;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .card-content {
            padding: 24px;
          }
          .input-row {
            flex-direction: column;
            gap: 16px;
          }
          .card-wrapper {
            max-width: 400px;
          }
          .role-buttons {
            flex-direction: column;
            gap: 10px;
          }
          .role-btn {
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}