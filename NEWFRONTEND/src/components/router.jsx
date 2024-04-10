import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register"; 
import Shop from "../pages/shop"; 
import MyPets from "../pages/MyPets"

export default () => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/shop" component={Shop} />
      <Route path="/mypets" component={MyPets} />
    </Switch>
);
