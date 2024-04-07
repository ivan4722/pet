import React from "react";
import { Router, Link } from "wouter";
import PageRouter from "./components/router.jsx";
import Seo from './components/seo.jsx';
import './styles/styles.css';

export default function Home() {
  return (
    <Router>
      <Seo />
      <header className="flex justify-between items-center p-4 w-full">
        <Link href="/" className="flex items-center">
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/image-removebg-preview%20(1).png?v=1712523257157" alt="Small Logo" className="h-14 w-14 mr-2" />
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/logo.jpg?v=1712521889673" alt="Main Logo" className="h-12 w-auto" />
        </Link>
        <div className="links ml-auto flex gap-4">
          <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out">Register</Link>
          <Link href="/login" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-150 ease-in-out">Login</Link>
        </div>
      </header>
      <main role="main" className="wrapper">
        {/* Adding the new image right below the header, before the PageRouter */}
        <div className="image-container my-8 mx-auto text-center">
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/DALL%C2%B7E%202024-04-07%2016.58.55%20-%20Create%20a%20colorful%2C%20clipart-style%20image%20showing%20pets%20with%20their%20owners%20playing%20in%20a%20park.%20The%20scene%20should%20include%20three%20pairs%20of%20owners_%20one%20male%20and%20.webp?v=1712523599445" alt="Pets with their owners playing in a park" className="max-w-full h-auto inline-block" />
          {/* Placeholder for description */}
          <p className="text-lg mt-4">Raising a pet is a hard task.</p>
          <p className="text-lg mt-4">Whether your apartment doesn't allow pets, worried about vet bills, or you're just busy, PetShare can solve your issues!</p>
          <p className="text-lg mt-4">Raising a pet is a hard task.</p>
        </div>
        <div className="content">
          <PageRouter />
        </div>
      </main>
      {/* Footer removed or adapted as necessary */}
    </Router>
  );
}
