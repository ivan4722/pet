import React from "react";
import { Router } from "wouter";
import PageRouter from "./components/router.jsx";
import Seo from './components/seo.jsx';
import { AuthProvider } from "./components/AuthContext"; 
import './styles/styles.css';

export default function App() {
  return (
    <AuthProvider> 
      <Router>
        <Seo />
        <main role="main" className="wrapper">
          <div className="content">
            <PageRouter />
          </div>
        </main>
      </Router>
    </AuthProvider>
  );
}