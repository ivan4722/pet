import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register"; 

export default () => (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
);
