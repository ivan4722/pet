import React, { useState, useEffect } from "react";
import { Router, Link } from "wouter";

import "./styles/styles.css";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// The component that adds our Meta tags to the page
import Seo from './components/seo.jsx';

// Home function that is reflected across the site
export default function Home() {
  return (
    <Router>
      <Seo />
      <main role="main" className="wrapper">
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
      {/* Footer links to Home and About, Link elements matched in router.jsx */}
      <footer className="footer">
        <div className="links">
          <Link href="/">Home</Link>
          <span className="divider">|</span>
          <Link href="/about">About</Link>
          <span className="divider">|</span>
          <Link href="/register">Register</Link>
          <span className="divider">|</span>
          <Link href="/login">Login</Link>
        </div>

      </footer>
    </Router>
  );
}
