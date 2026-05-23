import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function LoginPage() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      history.push("/");
    }, 2000);
  };

  const handleForgotPassword = () => {
    history.push("/auth/forget");
  };

  return (
    <div className="login-container">
      <div className="bg-gradient"></div>
      
      <div className="noise-overlay"></div>
      <div className="top-glow"></div>
      <div className="bottom-glow"></div>
      <div className="glow-spot-1"></div>
      <div className="glow-spot-2"></div>

      <div className="card-wrapper">
        <div
          ref={cardRef}
          className="login-card"
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

            <h1 className="title">Welcome Back</h1>
            <p className="subtitle">Sign in to continue to RestoSmart</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <div className={`input-wrapper ${focusedInput === "email" ? "focused" : ""}`}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7L12 13 2 7" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="input-group">
                <div className={`input-wrapper ${focusedInput === "password" ? "focused" : ""}`}>
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <div className="options-row">
                <button type="button" className="forgot-link" onClick={handleForgotPassword}>
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="signin-btn" disabled={isLoading}>
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    Sign In
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              <p className="signup-link">
                Don't have an account? <Link to="/auth/register">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* إزالة المربع الأزرق والخلفية البيضاء من جميع حقول الإدخال */
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
        
        /* إزالة الخلفية البيضاء من autocomplete */
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

        .login-container {
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

        .login-card {
          position: relative;
          transition: transform 0.1s ease-out;
        }

        .card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 28px;
          opacity: 0;
          transition: opacity 0.7s ease;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1), transparent);
        }

        .login-card:hover .card-glow {
          opacity: 0.7;
        }

        .light-beams {
          position: absolute;
          inset: -1px;
          border-radius: 28px;
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
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: 32px 28px;
          border: 1px solid rgba(255, 255, 255, 0.1);
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
          margin-bottom: 24px;
        }

        .logo {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
        }

        .logo span {
          font-size: 26px;
          font-weight: bold;
          background: linear-gradient(180deg, white, rgba(255,255,255,0.7));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .logo-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
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
          color: rgba(255, 255, 255, 0.55);
          margin-bottom: 28px;
        }

        .input-group {
          margin-bottom: 18px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .input-wrapper.focused {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          width: 18px;
          height: 18px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }

        .input-wrapper.focused .input-icon {
          color: white;
        }

        .input-wrapper input {
          width: 100%;
          padding: 14px 42px 14px 44px;
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
          color: rgba(255, 255, 255, 0.35);
          font-size: 14px;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          cursor: pointer;
        }

        .password-toggle svg {
          width: 18px;
          height: 18px;
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }

        .password-toggle:hover svg {
          color: white;
        }

        .options-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin: 20px 0 24px;
        }

        .forgot-link {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .forgot-link:hover {
          color: white;
        }

        .signin-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #a855f7, #7c3aed);
          border: none;
          border-radius: 14px;
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
          width: 16px;
          height: 16px;
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
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
          margin-top: 20px;
        }

        .signup-link a {
          color: #a855f7;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
        }

        .signup-link a:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .card-content {
            padding: 24px 20px;
          }
          
          .top-glow, .bottom-glow {
            width: 100vh;
          }
          
          .card-wrapper {
            max-width: 360px;
          }
          
          .title {
            font-size: 20px;
          }
          
          .subtitle {
            font-size: 12px;
          }
          
          .input-wrapper input {
            padding: 12px 36px 12px 38px;
          }
        }
      `}</style>
    </div>
  );
}