import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Landing2 from "views/landing2.js";
import Landing3 from "views/landing3.js";
import ProfileOwner from "views/owner";
import ProfileManager from "views/Profile.manager";
import VisitorManagerProfile from "views/auth/visiter.manager";
import VisitorProfile from "views/mission.manager";
import Menu from "views/auth/menu"; 
import Profileemploye from "views/profile.employe"; 
import Profile from "views/Profile.js";
import RestaurantsPage from "views/liste.restaurant";
import ListeRestaurant2 from "views/liste.restaurant2";
import ListeRestaurant3 from "views/liste.restaurant3";
import EmployeesPage from "views/liste.profile";
import EmployeesPage2 from "views/liste.profile2"
import WaiterProfile from "views/WaiterProfile";
import EmployeeEvaluation from "views/EmployeeEvaluation";
import ListeOwner from "views/liste.owner";
import Index from "views/Index.js";

const getUserRole = () => localStorage.getItem("userRole");
const getUserToken = () => localStorage.getItem("token");

const getRoleRedirect = (role) => {
  if (role === "OWNER") return "/profileowner";
  if (role === "MANAGER") return "/profilemanager";
  if (role === "WORKER") return "/profileemploye";
  return "/";
};

function RoleRoute({ component: Component, allowedRoles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const role = getUserRole();
        if (!getUserToken() || !role) {
          return <Redirect to="/auth/login" />;
        }
        if (!allowedRoles.includes(role)) {
          return <Redirect to={getRoleRedirect(role)} />;
        }
        return <Component {...props} />;
      }}
    />
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        {/* add routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <Route path="/landing2" exact component={Landing2} />
        <Route path="/landing3" exact component={Landing3} />
        <Route path="/profile" exact component={Profile} />
        <RoleRoute path="/profileowner" exact allowedRoles={["OWNER"]} component={ProfileOwner} />
        <RoleRoute path="/profilemanager" exact allowedRoles={["MANAGER"]} component={ProfileManager} />
        <RoleRoute path="/visitormanagerprofile" exact allowedRoles={["MANAGER"]} component={VisitorManagerProfile} />
        <RoleRoute path="/visitorprofile" exact allowedRoles={["WORKER"]} component={VisitorProfile} />
        <RoleRoute path="/profileemploye" exact allowedRoles={["WORKER"]} component={Profileemploye} />
        <Route path="/menu/:restaurantId/:tableNumber" exact component={Menu} />
        <Route path="/restaurants3" exact component={ListeRestaurant3} />
        <Route path="/restaurants" exact component={RestaurantsPage} />
        <Route path="/restaurants2" exact component={ListeRestaurant2} />
        <Route path="/employees" exact component={EmployeesPage} />
        <Route path="/employees2" exact component={EmployeesPage2} />
        <Route path="/owners" exact component={ListeOwner} />
        <Route path="/waiter-profile/:id" exact component={WaiterProfile} />
        <Route path="/employee-evaluation/:id" exact component={EmployeeEvaluation} />
        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<AppRoutes />, document.getElementById("root"));