import React, { useState, useRef } from "react";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [focusedInput, setFocusedInput] = useState(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);
  const codeInputs = useRef([]);

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

  // إرسال الإيميل للحصول على الكود
  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setIsLoading(true);
    
    // محاكاة إرسال الكود
    setTimeout(() => {
      setIsLoading(false);
      const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
      console.log("Code envoyé:", generatedCode);
      alert(`Code de vérification: ${generatedCode}\n(Dans une vraie application, ce code serait envoyé par email)`);
      setStep(2);
    }, 1500);
  };

  // التحقق من الكود
  const handleVerifyCode = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      setCodeError(true);
      return;
    }
    setCodeError(false);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1000);
  };

  // تغيير كلمة المرور
  const handleResetPassword = (e) => {
    e.preventDefault();
    let hasError = false;
    
    if (!newPassword || newPassword.length < 6) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }
    
    if (newPassword !== confirmPassword) {
      setConfirmError(true);
      hasError = true;
    } else {
      setConfirmError(false);
    }
    
    if (hasError) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Mot de passe réinitialisé avec succès! Veuillez vous connecter.");
      window.location.href = "/auth/login";
    }, 1500);
  };

  // التعامل مع إدخال الكود في المربعات
  const handleCodeChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 3) {
      codeInputs.current[index + 1].focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputs.current[index - 1].focus();
    }
  };

  const goToLogin = () => {
    window.location.href = "/auth/login";
  };

  return (
    <div className="forget-container">
      <div className="bg-gradient"></div>
      <div className="noise-overlay"></div>
      <div className="top-glow"></div>
      <div className="bottom-glow"></div>
      <div className="glow-spot-1"></div>
      <div className="glow-spot-2"></div>

      <div className="card-wrapper">
        <div
          ref={cardRef}
          className="forget-card"
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

            {/* Étape 1: Email */}
            {step === 1 && (
              <>
                <h1 className="title">Mot de passe oublié ?</h1>
                <p className="subtitle">Entrez votre email pour recevoir un code</p>

                <form onSubmit={handleSendCode}>
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
                      />
                    </div>
                    {emailError && <p className="error-message">⚠️ Veuillez entrer un email valide</p>}
                  </div>

                  <button type="submit" className="signin-btn" disabled={isLoading}>
                    {isLoading ? <div className="spinner"></div> : "Envoyer le code"}
                  </button>

                  <p className="signup-link">
                    ← <a onClick={goToLogin} style={{ cursor: 'pointer' }}>Retour à la connexion</a>
                  </p>
                </form>
              </>
            )}

            {/* Étape 2: Code de vérification */}
            {step === 2 && (
              <>
                <h1 className="title">Code de vérification</h1>
                <p className="subtitle">Un code à 4 chiffres a été envoyé à <strong>{email}</strong></p>

                <form onSubmit={handleVerifyCode}>
                  <div className="code-container">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className={`code-input ${codeError ? "error" : ""}`}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                        ref={(el) => codeInputs.current[index] = el}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  {codeError && <p className="error-message text-center">⚠️ Veuillez entrer le code complet</p>}

                  <button type="submit" className="signin-btn" disabled={isLoading}>
                    {isLoading ? <div className="spinner"></div> : "Vérifier le code"}
                  </button>

                  <p className="signup-link">
                    ← <a onClick={() => setStep(1)} style={{ cursor: 'pointer' }}>Modifier l'email</a>
                  </p>
                </form>
              </>
            )}

            {/* Étape 3: Nouveau mot de passe */}
            {step === 3 && (
              <>
                <h1 className="title">Nouveau mot de passe</h1>
                <p className="subtitle">Créez un nouveau mot de passe sécurisé</p>

                <form onSubmit={handleResetPassword}>
                  <div className="input-group">
                    <div className={`input-wrapper ${focusedInput === "password" ? "focused" : ""} ${passwordError ? "error" : ""}`}>
                      <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); if (passwordError) setPasswordError(false); }}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </div>
                    {passwordError && <p className="error-message">⚠️ Le mot de passe doit contenir au moins 6 caractères</p>}
                  </div>

                  <div className="input-group">
                    <div className={`input-wrapper ${focusedInput === "confirm" ? "focused" : ""} ${confirmError ? "error" : ""}`}>
                      <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); if (confirmError) setConfirmError(false); }}
                        onFocus={() => setFocusedInput("confirm")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </div>
                    {confirmError && <p className="error-message">⚠️ Les mots de passe ne correspondent pas</p>}
                  </div>

                  <button type="submit" className="signin-btn" disabled={isLoading}>
                    {isLoading ? <div className="spinner"></div> : "Réinitialiser le mot de passe"}
                  </button>

                  <p className="signup-link">
                    ← <a onClick={goToLogin} style={{ cursor: 'pointer' }}>Retour à la connexion</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* إزالة المربع الأزرق من جميع حقول الإدخال */
        input,
        input:focus,
        input:focus-visible,
        input:active,
        textarea,
        textarea:focus,
        textarea:focus-visible,
        button,
        button:focus,
        button:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .forget-container {
          min-height: 100vh;
          width: 100%;
          background: #540887;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .bg-gradient {
          position: absolute;
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
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 1;
        }

        .top-glow {
          position: absolute;
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
          position: absolute;
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
          position: absolute;
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
          position: absolute;
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
          max-width: 420px;
          margin: 0 20px;
        }

        .forget-card {
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

        .forget-card:hover .card-glow {
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
          font-size: 24px;
          font-weight: bold;
          background: linear-gradient(180deg, white, rgba(255,255,255,0.8));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 8px;
        }

        .subtitle {
          text-align: center;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 28px;
        }

        .input-group {
          margin-bottom: 16px;
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
          padding: 14px 12px 14px 40px;
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

        .error-message {
          color: #ef4444;
          font-size: 11px;
          margin-top: 4px;
          margin-left: 4px;
        }

        .text-center {
          text-align: center;
        }

        .code-container {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .code-input {
          width: 60px;
          height: 60px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          outline: none !important;
          box-shadow: none !important;
          transition: all 0.3s;
        }

        .code-input:focus,
        .code-input:focus-visible,
        .code-input:active {
          outline: none !important;
          box-shadow: none !important;
          border-color: #a855f7;
        }

        .code-input.error {
          border-color: #ef4444;
        }

        .signin-btn {
          width: 100%;
          padding: 14px;
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
          margin-top: 20px;
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
          width: 18px;
          height: 18px;
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
          cursor: pointer;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .card-content {
            padding: 24px;
          }
          
          .code-input {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
          
          .top-glow, .bottom-glow {
            width: 100vh;
          }
        }
      `}</style>
    </div>
  );
}