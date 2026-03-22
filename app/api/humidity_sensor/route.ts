import { NextResponse } from "next/server";

export async function GET() {
    const ADAFRUIT_KEY = process.env.ADAFRUIT_KEY
    const url = 'https://io.adafruit.com/api/v2/SustaingineeringElec/feeds/rh-sht45/data?limit=20';

    try {
        const res = await fetch(url, {
            headers: {
                "X-AIO-KEY": ADAFRUIT_KEY || ""
            },
            cache: 'no-store' // Disable caching to always get the latest data
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch from Adafruit.io' }, { status: res.status });
        }

        const rawData = await res.json();
        const data = rawData.map((entry: any) => ({
            rh: parseFloat(entry.value),
            time: new Date(entry.created_at).toLocaleTimeString()
        }))
        .reverse(); // Reverse to have oldest first
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

