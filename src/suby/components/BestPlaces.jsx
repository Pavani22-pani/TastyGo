import React, { useState, useEffect } from 'react';
import { API_URL } from '../api'; // Adjust the path based on your project structure


const BestPlaces = () => {
    const [cities, setCities] = useState([]);
    const [visibleCities, setVisibleCities] = useState(9); // Show 9 initially

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`${API_URL}/firm/areas`);
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        };

        fetchCities();
    }, []);

    return (
        <div className="best-places-container">
            <h2>Best Places to Eat Across Cities</h2>
            <div className="city-grid">
                {cities.slice(0, visibleCities).map((city, index) => (
                    <div key={index} className="city-card">
                        Best Restaurants in {city}
                    </div>
                ))}

                {cities.length > visibleCities && (
                    <div
                        className="show-more"
                        onClick={() => setVisibleCities(visibleCities + 6)}
                    >
                        Show More ▼
                    </div>
                )}
            </div>
        </div>
    );
};

export default BestPlaces;
