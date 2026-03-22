"use client";
import HumidityDisplay from "./components/humidity";
import PressureDisPlay from "./components/pressure";
import TempDisplay from "./components/temperature";

export default function Home() {
  return (
    <div className="sensors">
        <div>
            <TempDisplay></TempDisplay>
        </div>
        <div>
            <PressureDisPlay></PressureDisPlay>
        </div>
        <div>
            <HumidityDisplay></HumidityDisplay>
        </div>
    </div>
    
  );
}
