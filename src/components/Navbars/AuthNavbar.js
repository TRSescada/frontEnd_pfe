/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

export default function AuthNavbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  
  return (
    <>
      <style>
        {`
          .navbar-custom {
            background: linear-gradient(135deg, #9b2dff, #7c3aed, #a855f7);
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.3);
          }
          
          .navbar-custom .nav-link {
            transition: all 0.3s ease;
          }
          
          .navbar-custom .nav-link:hover {
            color: #e9d5ff !important;
            transform: translateY(-2px);
          }
          
          .btn-custom {
            background: linear-gradient(135deg, #6b21a5, #581c87);
            transition: all 0.3s ease;
          }
          
          .btn-custom:hover {
            background: linear-gradient(135deg, #7e22ce, #6b21a5);
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
          }
          
          .mobile-menu {
            background: linear-gradient(135deg, #9b2dff, #7c3aed);
          }
        `}
      </style>
    
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-custom shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/landing"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              style={{
                textShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
                letterSpacing: "1px"
              }}
            >
              Notus React
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-white"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
            style={navbarOpen ? { background: "linear-gradient(135deg, #9b2dff, #7c3aed)" } : {}}
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/landing"
                  className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold transition-all duration-300"
                >
                  <span className="inline-block ml-2">🏠 Home</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/restaurants"
                  className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold transition-all duration-300"
                >
                  <span className="inline-block ml-2">🍽️ Restaurants</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/employees2"
                  className="nav-link text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold transition-all duration-300"
                >
                  <span className="inline-block ml-2">👤 Employees</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/auth/login"
                  className="btn-custom text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150 inline-block"
                >
                  Let's go Manager 🚀
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}