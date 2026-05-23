import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// استيراد صفحات المصادقة
import Login from "views/auth/Login.js";
import Forget from "views/auth/Forget.js";  // ✅ ملف بحرف F كبير
import Register from "views/auth/Register.js";

export default function Auth() {
  return (
    <>
      <Switch>
        {/* Login Page */}
        <Route path="/auth/login">
          <main>
            <section className="relative w-full h-full min-h-screen">
              <Login />
            </section>
          </main>
        </Route>

        {/* Forget Password Page */}
        <Route path="/auth/forget">
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
        </Route>

        {/* Register Page */}
        <Route path="/auth/register">
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
        </Route>

        <Redirect from="/auth" to="/auth/login" />
      </Switch>
    </>
  );
}