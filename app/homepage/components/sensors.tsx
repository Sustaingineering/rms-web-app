'use client';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

export default function SensorDisplay({ title, unit, data, color}) {
  const currentValue =
    data.length > 0 ? data[data.length - 1].value : null;

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>

      {/* Current value */}
      <p className="text-3xl font-mono mb-4">
        {currentValue !== null ? `${currentValue}${unit}` : 'Loading...'}
      </p>

      {/* Graph */}
      <div style={{ width: '90%', height: 300 }}>
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
  );
}