import React, { useState, useEffect } from 'react';

const Heartbeat = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/heartbeat')  // Matches the proxy key in vite.config.js
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Heartbeat Data</h1>
            {/* Aquí puedes renderizar la información como prefieras */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Heartbeat;
