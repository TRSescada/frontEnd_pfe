import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// استيراد صفحات المصادقة
import Login from "views/auth/Login.js";
import Forget from "views/auth/Forget.js";  // ✅ ملف بحرف F كبير
import Register from "views/auth/Register.js";

const getUserRole = () => localStorage.getItem("userRole");
const getUserToken = () => localStorage.getItem("token");

const getRoleRedirect = (role) => {
  if (role === "OWNER") return "/profileowner";
  if (role === "MANAGER") return "/profilemanager";
  if (role === "WORKER") return "/profileemploye";
  return "/";
};

function AuthRoute({ children }) {
  const token = getUserToken();
  const role = getUserRole();
  if (token && role) {
    return <Redirect to={getRoleRedirect(role)} />;
  }
  return children;
}

export default function Auth() {
  return (
    <>
      <Switch>
        {/* Login Page */}
        <Route path="/auth/login">
          <AuthRoute>
            <main>
              <section className="relative w-full h-full min-h-screen">
                <Login />
              </section>
            </main>
          </AuthRoute>
        </Route>

        {/* Forget Password Page */}
        <Route path="/auth/forget">
          <AuthRoute>
            <main>
              <section className="relative w-full h-full min-h-screen">
                <div
                  className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/register_bg_2.png").default + ")",
                  }}
                ></div>
                <Forget />
              </section>
            </main>
          </AuthRoute>
        </Route>

        {/* Register Page */}
        <Route path="/auth/register">
          <AuthRoute>
            <main>
              <section className="relative w-full h-full min-h-screen">
                <div
                  className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/register_bg_2.png").default + ")",
                  }}
                ></div>
                <Register />
              </section>
            </main>
          </AuthRoute>
        </Route>

        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </>
  );
}