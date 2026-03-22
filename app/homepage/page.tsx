"use client";
import SensorDisplay from "./components/sensors";

export default function Home() {
  return (
    <div className="sensors">
        <div>
            <SensorDisplay title="SHT45 Temperature" unit="°C" feed="temperature-sht45" color="#ff0000"></SensorDisplay>
        </div>
        <div>
            <SensorDisplay title="DPS310 Pressure" unit="hPa" feed="pressure-dps310" color="#fff000"></SensorDisplay>
        </div>
        <div>
            <SensorDisplay title="SHT45 Humidity" unit="%" feed="rh-sht45" color="#00ff00"></SensorDisplay>
        </div>
    </div>
    
  );
}