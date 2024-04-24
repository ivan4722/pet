import React, { useEffect, useState } from 'react';
import { Link } from "wouter";
import { useAuth } from '../components/AuthContext'; 
import ProgressBarDifferentColour from '../components/ProgressBarDifferentColour';
import "../styles/styles.css"; 

const MyPets = () => {
    const { isLoggedIn, username, logout } = useAuth();
    const [pets, setPets] = useState([]);
    const [petMoods, setPetMoods] = useState({});

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:3001/user-pets?username=${username}`)
                .then(response => response.json())
                .then(data => setPets(data)) 
                .catch(console.error);
        }
    }, [username]);

    const fetchPetMoods = async () => {
        const petMoodData = {};
        for (const pet of pets) {
            try {
                const response = await fetch(`http://localhost:3001/check-last-played/${pet._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch last played date for the pet');
                }
                const data = await response.json();
                const lastPlayedTimestamp = Date.parse(data.lastPlayed || 0);
                const currentTime = new Date().getTime();
                const timeDifferenceHours = (currentTime - lastPlayedTimestamp) / (1000 * 60 * 60);
                petMoodData[pet._id] = timeDifferenceHours <= 24;
            } catch (error) {
                console.error(error);
                petMoodData[pet._id] = false;
            }
        }
        setPetMoods(petMoodData);
    };

    useEffect(() => {
        fetchPetMoods();
    }, [pets]);

    if (!isLoggedIn) {
        return <p>Please log in to see your pets.</p>;
    }
    
    const sharePet = (petId) => {
        const recipientUsername = prompt('Enter the username of the person you want to share this pet with:');
        if (recipientUsername && username) { 
            fetch('http://localhost:3001/share-pet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ownerUsername: username, recipientUsername, petId }),
            })
            .then(response => {
                if (response.ok) {
                    alert('Pet shared successfully');
                } else {
                    alert('Failed to share pet');
                }
            })
            .catch(console.error);
        }
    };
    
    const findPetImage = (petType) => {
        const shopItems = [
            { image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.04%20AM.png?v=1712591097170", description: "Parrot" },
            { image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.08%20AM.png?v=1712591095427", description: "Bunny" },
            { image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.11%20AM.png?v=1712591093653", description: "Hamster" },
            { image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.17%20AM.png?v=1712591091604", description: "Dog" },
            { image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.21%20AM.png?v=1712591089820", description: "Goldfish" },
            { image: "https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2011.44.26%20AM.png?v=1712591088126", description: "Cat" }
        ];
        const item = shopItems.find(item => item.description === petType);
        return item ? item.image : ''; 
    };
    
    const renamePet = (petId) => {
        const newName = prompt('Enter new name for your pet:');
        if (newName) {
            fetch('http://localhost:3001/rename-pet', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ petId, newName }),
            })
            .then(response => {
                if (response.ok) {
                    setPets(pets.map(pet => pet._id === petId ? { ...pet, name: newName } : pet)); 
                    alert('Pet renamed successfully');
                } else {
                    alert('Failed to rename pet');
                }
            })
            .catch(console.error);
        }
    };
    const playWithPet = async (petId) => {
        try {
            const response = await fetch('http://localhost:3001/play-with-pet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ petId })
            });
    
            if (!response.ok) {
                throw new Error('Failed to play with pet');
            }
    
            const data = await response.json();
            if (data.isWithin24Hours) {
                // If the play is successful and within 24 hours, refresh the page
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    
    const feedPet = (petId) => {
        fetch('http://localhost:3001/feed-pet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ petId }),
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Failed to feed pet');
            }
        })
        .catch(console.error);
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
                <div className="links flex gap-4 items-center">
                    <>
                        <span className="a5-cta">Welcome, {username}!</span>
                        <button onClick={logout} className="header-nav-item">Logout</button>
                    </>
                </div>
            </header>
            <div className="relative w-full">
                <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot%202024-04-08%20at%2012.14.24%20AM.png?v=1712549708318" alt="Background" className="w-full h-auto object-cover filter blur-sm" />
                <div className="text-center p-10 absolute top-0 left-0 right-0">
                    <div className="bg-black bg-opacity-50 p-5 rounded-lg inline-block">
                        <h1 className="text-white text-4xl md:text-6xl font-bold">My Pets</h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <div className="bg-white p-5 rounded-lg shadow mt-[-100px] relative">
                    {pets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {pets.map((pet, index) => (
                            <div key={index} className="text-center">
                                {/* Pet image, name, and mood */}
                                <img src={findPetImage(pet.type)} alt={pet.type} className="mx-auto" style={{ width: '100px', height: '100px' }} />
                                <p>{pet.name}</p>
                                {petMoods[pet._id] ? (
                                    <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot_2024-04-23_at_3.59.39_PM-removebg-preview.png?v=1713902511134" alt="Happy Face" className="mx-auto" style={{ width: '50px', height: '50px' }} />
                                ) : (
                                    <img src="https://cdn.glitch.global/dcb52c92-9cfa-4586-a1f5-7105f686edb4/Screenshot_2024-04-23_at_4.00.20_PM-removebg-preview.png?v=1713902509230" alt="Sad Face" className="mx-auto" style={{ width: '50px', height: '50px' }} />
                                )}
                                <button
                                    onClick={() => playWithPet(pet._id)}
                                    className="a7-cta"
                                    >
                                    Play
                                </button>
                                <div className="mb-4 flex justify-center">
                                    <button 
                                        onClick={() => renamePet(pet._id)} 
                                        className="a8-cta"
                                    >
                                        Rename
                                    </button>
                                    <button 
                                        onClick={() => sharePet(pet._id)} 
                                        className="a9-cta"
                                    >
                                        Share
                                    </button>
                                </div>
                                {/* Progress bar */}
                                <ProgressBarDifferentColour currentValue={pet.hunger} maxValue={10} />
                                {/* Feed button */}
                                <button 
                                    onClick={() => feedPet(pet._id)} 
                                    className="a10-cta"
                                >
                                    Feed
                                </button>
                            </div>
                        ))}
                    </div>
                    ) : (
                    <p>You have no pets yet.</p>
                    )}
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <p>Click Feed to feed your pet until your pet is full! Your pet will lose 1 hunger point every 2 hours.</p>
                <p>Click "Play" to play with your pet! If you don't play with your pet for 24 hours, your pet will get bored and sad :(</p>
            </div>

        </>
    );
};

export default MyPets;

