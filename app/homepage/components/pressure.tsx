'use client';
import { useEffect, useState } from 'react';

export default function PressureDisPlay() {
  const [pressure, setPressure] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // We fetch from our OWN API route now
        const res = await fetch('/api/pressure_sensor');
        const data = await res.json();
        
        // Adafruit returns an array, we want the value of the first item
        if (data && data.length > 0) {
            setPressure(data[0].value);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
    // Optional: Set up an interval to poll every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">DPS310 Pressure</h2>
      <p className="text-3xl font-mono">{pressure ? `${pressure}°C` : 'Loading...'}</p>
    </div>
  );
}