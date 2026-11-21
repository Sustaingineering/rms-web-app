"use client";

import Sidebar from "./components/sidebar";
import SensorDisplay from "./components/sensors";
import useSensorData from "./components/useSensorData";

export default function Home() {
    const sensorData = useSensorData();

    const latestTemperature = sensorData.temperature.at(-1)?.value ?? null;
    const latestPressure = sensorData.pressure.at(-1)?.value ?? null;
    const latestHumidity = sensorData.humidity.at(-1)?.value ?? null;
    const latestWindSpeed = sensorData.windSpeed.at(-1)?.value ?? null;
    
    return (
        <div className="dashboard-layout">
            <Sidebar />

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

                <section className="sensors sensors-grid">
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
                </section>
            </main>
        </div>
    );
}