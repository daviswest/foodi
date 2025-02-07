import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('Louisville, KY');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/find-restaurants', {
                description,
                location
            });

            setRestaurants(response.data.restaurants);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Restaurant Finder</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Describe the restaurant"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
                    {loading ? 'Searching...' : 'Find Restaurants'}
                </button>
            </form>

            <div>
                {restaurants.map((restaurant, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px 0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.description}</p>
                        <p>{restaurant.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;