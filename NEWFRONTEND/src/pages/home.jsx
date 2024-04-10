import * as React from "react";
import { Link } from "wouter";
import { useAuth } from '../components/AuthContext';
import "../styles/styles.css";

export default function Home() {
    const { isLoggedIn, username, logout } = useAuth();

    return (
        <>
            <header className="flex justify-between items-center p-4 w-full">
                <Link href="/" className="flex items-center">
                    <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/image-removebg-preview%20(1).png?v=1712523257157" alt="Small Logo" className="h-14 w-14 mr-2" />
                    <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/logo.jpg?v=1712521889673" alt="Main Logo" className="h-12 w-auto" />
                </Link>
                <div className="flex-grow text-center">
                    <Link href="/shop" className="header-nav-item">Shop</Link>
                    <Link href="/mypets" className="header-nav-item">My Pets</Link>
                </div>
                <div className="links flex">
                    {isLoggedIn ? (
                        <>
                            <span className="a5-cta"> Welcome, {username}!</span>
                            <button onClick={logout} className="header-nav-item">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="header-nav-item">Login</Link>
                            <Link href="/register" className="a5-cta">Register</Link>
                        </>
                    )}
                </div>
            </header>
            <main role="main" className="wrapper relative">
                <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2012.14.24%20AM.png?v=1712549708318" alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
                <div className="relative text-center p-10">
                    <div className="bg-black bg-opacity-50 p-5 rounded-lg inline-block">
                        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                            Raising a pet is <span style={{ color: '#fa4e54' }}>hard</span>.
                        </h1>
                        <p className="text-white text-xl md:text-3xl mb-4">
                            Why not raise your own online pet <span style={{ color: '#fa4e54' }}>hassle-free</span>? Try it, it's <span style={{ color: '#fa4e54' }}>fun</span>!
                        </p>
                        <Link href="/shop" className="a5-cta">Start your journey</Link>
                    </div>
                </div>
            </main>
            <section className="py-10 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">About PetShare</h2>
                    <p className="text-lg text-center">
                        PetShare is an innovative platform designed to bring pet lovers together. Whether you're looking to raise a virtual pet or connect with other pet enthusiasts, PetShare offers a unique online experience. Dive into a world where caring for your digital companion can be as rewarding as the real thing—without the same level of commitment or responsibility. Join our community and share the joy of pet ownership with others who share your passion.
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">How it Works</h2>
                    <p className="text-lg text-center">
                        Getting started with PetShare is easy and fun! Simply register an account, and you're ready to adopt your very first online pet. Browse our extensive selection of virtual pets in the shop, pick your favorite, and begin your journey. Care for your pet by feeding, playing, and attending to its needs. Experience the joy of pet ownership in a whole new way with PetShare.
                    </p>
                </div>
            </section>

            <section className="py-10 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Sharing Pets</h2>
                    <p className="text-lg text-center">
                        PetShare allows you to raise your online pet with a friend, significant other, or by yourself! To share your pet, simply click the "Share Pet" button and enter the other person's username. This way, you can share the excitement of your online pet with others around you!
                    </p>
                </div>
            </section>
        </>
    );
}