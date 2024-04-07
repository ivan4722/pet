import React from "react";
import { Router, Link } from "wouter";
import PageRouter from "./components/router.jsx";
import Seo from './components/seo.jsx';

export default function Home() {
  return (
    <Router>
      <Seo />
      <header className="header flex justify-between items-center p-4">
        <Link href="/">
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/logo.jpg?v=1712521889673" alt="Logo" className="logo" />
        </Link>
        <div className="links flex gap-4">
          <Link href="/register" className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out">Register</Link>
          <span className="text-gray-300">|</span>
          <Link href="/login" className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out">Login</Link>
        </div>
      </header>
      <main role="main" className="wrapper">
        <div className="content">
          <PageRouter />
        </div>
      </main>
      {/* Footer removed or adapted as necessary */}
    </Router>
  );
}
