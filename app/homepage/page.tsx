"use client";

import { useEffect, useState } from "react";
import SensorDisplay from "./components/sensors";

export default function Home() {
    const [sensorData, setSensorData] = useState({
        temperature: [],
        pressure: [],
        humidity: [],
        windSpeed: [],
    });

    useEffect(() => {
        const feeds = [
            { key: "temperature", feed: "temperature-sht45" },
            { key: "pressure", feed: "pressure-dps310" },
            { key: "humidity", feed: "rh-sht45" },
            { key: "windSpeed", feed: "wind-speed" },
        ];

        async function fetchAllData() {
            try {
                const results = await Promise.all(
                    feeds.map(async ({ key, feed }) => {
                        const res = await fetch(`/api/sensors/${feed}`);
                        const json = await res.json();

                        return { key, data: json };
                    })
                );

                setSensorData((prev) => {
                    const updated = { ...prev };

                    results.forEach(({ key, data }) => {
                        updated[key] = data;
                    });

                    return updated;
                });
            } catch (err) {
                console.error("Error fetching sensor data:", err);
            }
        }

        fetchAllData();

        const interval = setInterval(fetchAllData, 10000);

        return () => clearInterval(interval);
    }, []);

    // Get the lastest reading from each sensor
    const latestTemperature = sensorData.temperature.at(-1)?.value ?? null;
    const latestPressure = sensorData.pressure.at(-1)?.value ?? null;
    const latestHumidity = sensorData.humidity.at(-1)?.value ?? null;
    const latestWindSpeed = sensorData.windSpeed.at(-1)?.value ?? null;
    
    return (
    <>
        <div className="Summary">
            <h1>Last Readings</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <h2>Temperature</h2>
                    <p>{latestTemperature !== null ? `${latestTemperature} °C` : "Loading..."}</p>
                </div>

                <div>
                    <h2>Pressure</h2>
                    <p>{latestPressure !== null ? `${latestPressure} hPa` : "Loading..."}</p>
                </div>

                <div>
                    <h2>Humidity</h2>
                    <p>{latestHumidity !== null ? `${latestHumidity} %` : "Loading..."}</p>
                </div>

                <div>
                    <h2>Wind Speed</h2>
                    <p>{latestWindSpeed !== null ? `${latestWindSpeed} m/s` : "Loading..."}</p>
                </div>
            </div>
        </div>
        
        <div className="sensors">
            <SensorDisplay
                title="SHT45 Temperature"
                unit="°C"
                data={sensorData.temperature}
                color="#ff0000"
            />

            <SensorDisplay
                title="DPS310 Pressure"
                unit="hPa"
                data={sensorData.pressure}
                color="#0000ff"
            />
            <SensorDisplay
                title="SHT45 Humidity"
                unit="%"
                data={sensorData.humidity}
                color="#00ff00"
            />
            <SensorDisplay
                title="Wind Speed"
                unit="m/s"
                data={sensorData.windSpeed}
                color="#caf0f8"
            />
        </div>
    </>
  );
}