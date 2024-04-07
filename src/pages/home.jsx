import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";


/**
* The Home function defines the content that makes up the main content of the Home page
*
* This component is attached to the /about path in router.jsx
* The function in app.jsx defines the page wrapper that this appears in along with the footer
*/

export default function Home() {

  return (
    <>
      <main role="main" className="wrapper">
        <div className="relative">
          <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/DALL%C2%B7E%202024-04-07%2016.58.55%20-%20Create%20a%20colorful%2C%20clipart-style%20image%20showing%20pets%20with%20their%20owners%20playing%20in%20a%20park.%20The%20scene%20should%20include%20three%20pairs%20of%20owners_%20one%20male%20and%20.webp?v=1712523599445" alt="Pets with their owners playing in a park" className="max-w-full h-auto inline-block" />
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center w-48">
            <div className="bg-white border-black border rounded p-4">
              <p><strong>Raising a pet is a hard task.</strong></p>
              <p>Whether your apartment doesn't allow pets, worried about vet bills, or you're just busy, PetShare can solve your issues!</p>
            </div>
          </div>
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-center w-48">
            <div className="bg-white border-black border rounded p-4">
              <p><strong>What is PetShare?</strong></p>
              <p>PetShare allows you to raise a virtual pet by yourself, with a friend, or with a significant other, completely free.</p>
              <p>Does your significant other live far away? Surprise her with a virtual pet!</p>
            </div>
          </div>
        </div>
        <div className="content">
          <PageRouter />
        </div>
      </main>
    </>
  );
}
