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
        <section className="summary">
            <h1 className="summary-title">Summary</h1>

            <div className="summary-card">
                <h2>Last readings</h2>
                
                <div className="summary-readings">
                    <p>
                        Wind Speed: 
                        <span>{latestWindSpeed !== null ? `${latestWindSpeed} m/s` : "--"}</span>
                    </p>
                    
                    <p>
                        Temperature:
                        <span>{latestTemperature !== null ? `${latestTemperature} °C` : "--"}</span>
                    </p>
                    
                    <p>
                        Humidity:
                        <span>{latestHumidity !== null ? `${latestHumidity} %` : "--"}</span>
                    </p>
                    
                    <p>
                        Pressure:
                        <span>{latestPressure !== null ? `${latestPressure} hPa` : "--"}</span>
                    </p>
                </div>
            </div>
        </section>
        
        <div className="sensors">
            <SensorDisplay
                title="SHT45 Temperature"
                unit="°C"
                data={sensorData.temperature}
                color="#E05252"
            />

            <SensorDisplay
                title="DPS310 Pressure"
                unit="hPa"
                data={sensorData.pressure}
                color="#365FC9"
            />
            <SensorDisplay
                title="SHT45 Humidity"
                unit="%"
                data={sensorData.humidity}
                color="#176B50"
            />
            <SensorDisplay
                title="Wind Speed"
                unit="m/s"
                data={sensorData.windSpeed}
                color="#7651B5"
            />
        </div>
    </>
  );
}