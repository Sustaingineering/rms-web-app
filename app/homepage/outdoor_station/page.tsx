"use client";

import Sidebar from "../components/sidebar";
import SensorDisplay from "../components/sensors";
import useSensorData from "../components/useSensorData";

export default function OutdoorStation() {
    const sensorData = useSensorData();

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <main className="dashboard-main">
                <h1 className="summary-title">Outdoor Station Graphs</h1>

                <section className="sensors">
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
