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
import Profilemanger from "views/Profile.manager";
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

ReactDOM.render(
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
      <Route path="/profileowner" exact component={ProfileOwner} />
      <Route path="/profilemanger" exact component={Profilemanger} />
      <Route path="/visitormanagerprofile" exact component={VisitorManagerProfile} />
      <Route path="/visitorprofile" exact component={VisitorProfile} />
      <Route path="/profileemploye" exact component={Profileemploye} />
      <Route path="/menu" exact component={Menu} />
      <Route path="/restaurants3" exact component={ListeRestaurant3} />
      <Route path="/restaurants" exact component={RestaurantsPage} />
      <Route path="/restaurants2" exact component={ListeRestaurant2} />
      <Route path="/employees" exact component={EmployeesPage} />
      <Route path="/employees2" exact component={EmployeesPage2} />
      <Route path="/owners" exact component={ListeOwner} />
      <Route path="/waiter-profile/:id" exact component={WaiterProfile} />
      <Route path="/employeeevaluation" exact component={EmployeeEvaluation} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);