import { NextResponse } from "next/server";

export async function GET() {
    const ADAFRUIT_KEY = process.env.ADAFRUIT_KEY
    const url = 'https://io.adafruit.com/api/v2/SustaingineeringElec/feeds/rh-sht45/data?limit=1';

    try {
        const res = await fetch(url, {
            headers: {
                "X-AIO-KEY": ADAFRUIT_KEY || ""
            },
            next: { revalidate: 30 }
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch from Adafruit.io' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

