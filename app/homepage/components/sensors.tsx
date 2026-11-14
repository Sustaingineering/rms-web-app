'use client';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function SensorDisplay({ title, unit, data, color}) {
  return (
    <div className="sensor-card">
        {/* Graph title */}
        <div className='sensor-header'>
            <h2>{title}</h2>
        </div>

      {/* Graph */}
        <div className="sensor-content">
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                        <XAxis dataKey="time" stroke='#ffffff'/>
                        <YAxis domain={['auto', 'auto']} stroke="#ffffff"/>
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