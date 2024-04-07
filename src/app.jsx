import React from "react";
import { Router, Link } from "wouter";
import PageRouter from "./components/router.jsx";
import Seo from './components/seo.jsx';
import './styles/styles.css';


export default function Home() {
  return (
    <Router>
      <Seo />
      <header className="header flex justify-between items-center p-4">
        <Link href="/">
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/logo-removebg-preview%20(1).png?v=1712523126097" alt="Logo" className="logo" />
        </Link>
        <div className="links flex gap-4">
          <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out">Register</Link>
          <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-150 ease-in-out">Login</Link>
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

