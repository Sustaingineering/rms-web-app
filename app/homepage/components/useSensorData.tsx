
"use client";

import { useEffect, useState } from "react";

export type SensorReading = {
    value: number;
    timestamp: string;
};

export type SensorData = {
    temperature: SensorReading[];
    pressure: SensorReading[];
    humidity: SensorReading[];
    windSpeed: SensorReading[];
    soilMoisture1: SensorReading[];
    soilMoisture2: SensorReading[]
};

export default function useSensorData() {
    const [sensorData, setSensorData] = useState<SensorData>({
        temperature: [],
        pressure: [],
        humidity: [],
        windSpeed: [],
        soilMoisture1: [],
        soilMoisture2: [],
    });

    useEffect(() => {
        const feeds = [
            { key: "temperature", feed: "temperature-sht45" },
            { key: "pressure", feed: "pressure-dps310" },
            { key: "humidity", feed: "rh-sht45" },
            { key: "windSpeed", feed: "wind-speed" },
            { key: "soilMoisture1", feed: "soil-moisture-1" },
            { key: "soilMoisture2", feed: "soil-moisture-2" },
        ] as const;

        async function fetchAllData() {
            try {
                const results = await Promise.all(
                    feeds.map(async ({ key, feed }) => {
                        const res = await fetch(`/api/sensors/${feed}`);

                        if (!res.ok) {
                            throw new Error(`Failed to fetch ${feed}`);
                        }

                        return {
                            key,
                            data: await res.json(),
                        };
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

        const interval = setInterval(fetchAllData, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return sensorData;
}
