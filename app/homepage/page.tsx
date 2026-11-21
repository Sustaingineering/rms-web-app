"use client";

import { useEffect, useState } from "react";
import SensorDisplay from "./components/sensors";
import Image from "next/image";

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
        // Fetch data when we first start the browser
        fetchAllData();
        // Fetch data every 1 minute afterwards
        const interval = setInterval(fetchAllData, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    // Get the lastest reading from each sensor
    const latestTemperature = sensorData.temperature.at(-1)?.value ?? null;
    const latestPressure = sensorData.pressure.at(-1)?.value ?? null;
    const latestHumidity = sensorData.humidity.at(-1)?.value ?? null;
    const latestWindSpeed = sensorData.windSpeed.at(-1)?.value ?? null;
    
    return (
    <>
        <div className="dashboard-layout">
            <aside className="sidebar">
                <Image
                src="/RMS_banner.png"
                alt="Remote Monitoring System"
                width={500}
                height={200}
                className="sidebar-image"
                priority
                />
            </aside>

            <main className="dashboard-main">
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
                        title="Temperature (°C)"
                        unit="°C"
                        data={sensorData.temperature}
                        color="#E05252"
                    />

                    <SensorDisplay
                        title="Air Pressure (hPa)"
                        unit="hPa"
                        data={sensorData.pressure}
                        color="#365FC9"
                    />
                    <SensorDisplay
                        title="Humidity (%)"
                        unit="%"
                        data={sensorData.humidity}
                        color="#176B50"
                    />
                    <SensorDisplay
                        title="Wind Speed (m/s)"
                        unit="m/s"
                        data={sensorData.windSpeed}
                        color="#7651B5"
                    />
                </div>
            </main>
        </div>
    </>
  );
}