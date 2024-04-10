import * as React from "react";
import { Link } from "wouter";
import { useAuth } from '../components/AuthContext'; 

const shopItems = [
  {
    image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.04%20AM.png?v=1712591097170",
    description: "Parrot"
  },
  {
    image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.08%20AM.png?v=1712591095427",
    description: "Bunny"
  },
  {
    image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.11%20AM.png?v=1712591093653",
    description: "Hamster"
  },
  {
    image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.17%20AM.png?v=1712591091604",
    description: "Dog"
  },
  {
    image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.21%20AM.png?v=1712591089820",
    description: "Goldfish"
  },
  {
    image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.26%20AM.png?v=1712591088126",
    description: "Cat"
  }
];

export default function Shop() {
    const { isLoggedIn, username, logout } = useAuth();

    const adoptPet = (petName = "", petType) => {
        if (!isLoggedIn) {
            alert('You must be logged in to adopt a pet.');
            return;
        }
    
        fetch('http://localhost:3001/adopt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, petName, petType }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); 
        })
        .then(text => {
            alert(text);
        })
        
        .catch((error) => {
            console.error('Error:', error);
            alert('Error adopting the pet');
        });
    };
    


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
                <div className="links flex gap-4">
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
            <main role="main" className="wrapper">
                <div className="relative">
                    <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2012.14.24%20AM.png?v=1712549708318" alt="Pets with their owners playing in a park" className="max-w-full h-auto inline-block" />
                    <h1 style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', margin: 0, fontSize: '4rem', width: '80%', color: 'white' }}>
                        <strong>
                            Welcome to the PetShare <span style={{ color: '#fa4e54' }}>shop!</span>
                        </strong>
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {shopItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-full h-64 flex items-center justify-center overflow-hidden">
                                <img src={item.image} alt={`Item ${index + 1}`} className="max-w-full h-full object-cover" />
                            </div>
                            <p className="mt-2">{item.description}</p>
                            <button onClick={() => adoptPet("name me!",item.description)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-150 ease-in-out">Adopt</button>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
