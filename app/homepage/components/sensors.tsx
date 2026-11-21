
'use client';

import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function SensorDisplay({ title, unit, data, color }) {
    // Convert timestamps to Vancouver local time for graph labels
    const formattedData = data.map((item) => ({
        ...item,
        time: new Date(item.timestamp).toLocaleTimeString("en-CA", {
            timeZone: "America/Vancouver",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        })
    }));

    return (
        <div className="sensor-card">
            <div className="sensor-header">
                <h2>{title}</h2>
            </div>

            <div className="sensor-content">
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <LineChart data={formattedData}>
                            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                            <XAxis dataKey="time" stroke="#ffffff" />
                            <YAxis domain={['auto', 'auto']} stroke="#ffffff" />
                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={3}
                                dot={true}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
