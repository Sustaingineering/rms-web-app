'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function TempDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/temp_sensor');
        const json = await res.json();

        setData(json); // already formatted
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentTemp =
    data.length > 0 ? data[data.length - 1].temp : null;

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">SHT45 Temperature</h2>

      {/* Current value */}
      <p className="text-3xl font-mono mb-4">
        {currentTemp !== null ? `${currentTemp}°C` : 'Loading...'}
      </p>

      {/* Graph */}
      <div style={{ width: '90%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#000000" strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke='#ffffff'/>
            <YAxis domain={['auto', 'auto']} stroke="#ffffff"/>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#ff0000"
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}